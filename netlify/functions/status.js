// Criar uma variável global fora do handler
let tasks = [];

exports.handler = async (event, context) => {
  console.log("Recebido evento:", event.body);

  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body || '{}');

      const tarefa_nome = body.tarefa_nome || 'Sem título';
      const status = body.status || 'Sem status';
      const responsavel = body.responsavel || 'Sem responsável';
      const data_prevista = body.data_prevista || new Date().toISOString();
      const empresa = body.empresa || 'Sem empresa';
      const contato = body.contato || 'Sem contato';
      const cargo_contato = body.cargo_contato || 'Sem cargo';
      const valor_oportunidade = body.valor_oportunidade || '0.00';
      const email_responsavel = body.email_responsavel || 'Sem email';
      const telefone_responsavel = body.telefone_responsavel || 'Sem telefone';
      const celular_responsavel = body.celular_responsavel || 'Sem celular';

      const newTask = {
        tarefa_nome,
        status,
        responsavel,
        data_prevista,
        empresa,
        contato,
        cargo_contato,
        valor_oportunidade,
        email_responsavel,
        telefone_responsavel,
        celular_responsavel,
      };

      // Adiciona nova tarefa na lista
      tasks.push(newTask);

      console.log("Nova tarefa adicionada. Total de tarefas:", tasks.length);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Tarefa recebida com sucesso!",
          data: newTask,
        }),
      };

    } catch (error) {
      console.error("Erro no try-catch:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Erro interno do servidor", error: error.message }),
      };
    }
  } else if (event.httpMethod === "GET") {
    // Retornar todas as tarefas que temos na memória
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Tarefas atuais",
        data: tasks
      }),
    };
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Método não permitido" }),
    };
  }
};

