exports.handler = async (event, context) => {
  console.log("Recebido evento:", event.body);

  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body || '{}');

      console.log("Body parseado:", body);

      const tarefa_nome = body.tarefa_nome || 'Sem título';
      const status = body.status || 'Sem status';
      const responsavel = body.responsavel || 'Sem responsável';
      const data_prevista = body.data_prevista || new Date().toISOString();

      const newTask = { tarefa_nome, status, responsavel, data_prevista };

      // Em vez de salvar, só responde
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Status recebido!",
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
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "GET não implementado ainda." }),
    };
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Método não permitido" }),
    };
  }
};
