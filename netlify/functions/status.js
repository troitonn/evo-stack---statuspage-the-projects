// netlify/functions/status.js

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'tasks.json');

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body || '{}');
      const { tarefa_nome, status, responsavel, data_prevista } = body;

      if (!tarefa_nome || !status || !responsavel || !data_prevista) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: "Campos obrigatórios faltando!" }),
        };
      }

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
      console.error("Erro ao salvar tarefa:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Erro interno do servidor" }),
      };
    }
  } else if (event.httpMethod === "GET") {
    // Retorna a lista de tarefas salvas
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
