const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'tasks.json');

exports.handler = async (event, context) => {
  console.log("Recebido evento:", event.body); // 👈 LOG PARA VER O QUE CHEGOU

  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body || '{}');

      // Log para ver o body já como objeto
      console.log("Body parseado:", body);

      // Aqui agora capturamos mesmo se vier faltando campos
      const tarefa_nome = body.tarefa_nome || 'Sem título';
      const status = body.status || 'Sem status';
      const responsavel = body.responsavel || 'Sem responsável';
      const data_prevista = body.data_prevista || new Date().toISOString();

      let tasks = [];
      if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath);
        tasks = JSON.parse(fileData.toString());
      }

      const newTask = { tarefa_nome, status, responsavel, data_prevista };
      tasks.push(newTask);

      fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Status recebido e salvo com sucesso!",
          data: newTask,
        }),
      };

    } catch (error) {
      console.error("Erro no try-catch:", error); // 👈 loga o erro
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Erro interno do servidor", error: error.message }),
      };
    }
  } else if (event.httpMethod === "GET") {
    try {
      if (!fs.existsSync(dataFilePath)) {
        return {
          statusCode: 200,
          body: JSON.stringify([]),
        };
      }

      const fileData = fs.readFileSync(dataFilePath);
      const tasks = JSON.parse(fileData.toString());

      return {
        statusCode: 200,
        body: JSON.stringify(tasks),
      };

    } catch (error) {
      console.error("Erro ao ler tarefas:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Erro interno ao ler tarefas" }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Método não permitido" }),
    };
  }
};
