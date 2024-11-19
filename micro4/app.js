// Importa a biblioteca mysql2
const mysql = require("mysql2");

// Configura a conexão com o banco de dados
const connection = mysql.createConnection({
  host: "localhost", // Ajuste conforme sua configuração
  user: "root", // Substitua pelo seu usuário do banco de dados
  password: "", // Substitua pela sua senha
  database: "test", // Substitua pelo nome do seu banco de dados
});

// Função segura para realizar consultas no banco
function doDBAction(id) {
  // Define o query utilizando placeholders
  const query = "SELECT * FROM users WHERE userID = ?";

  // Executa a query com o parâmetro id passado de forma segura
  connection.execute(query, [id], (err, results) => {
    if (err) {
      console.error("Erro na execução da query:", err);
      return;
    }
    console.log("Resultados:", results);
  });
}

// Simula uma requisição HTTP com o parâmetro id
const url = "http://example.com/app/userView?id=10";
const id = new URL(url).searchParams.get("id");

// Chama a função com o id da requisição
doDBAction(id);
