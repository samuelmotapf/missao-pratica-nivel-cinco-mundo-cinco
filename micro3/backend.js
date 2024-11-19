// Importar biblioteca para gerar e validar JWT
const jwt = require("jsonwebtoken");

// Chave secreta para assinatura do token (nunca exponha em produção!)
const SECRET_KEY = "minha_chave_secreta";
const TOKEN_EXPIRATION = "1h"; // Define o tempo de expiração do token (1 hora)

// Função para fazer login e gerar JWT
function do_Login() {
  const payload = {
    username: "usuario", // Exemplo de payload (adicione mais dados se necessário)
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Tempo de expiração em segundos
  };

  const jwt_token = jwt.sign(payload, SECRET_KEY);
  return jwt_token;
}

// Função para validar token e executar ação
function do_SomeAction(jwt_token) {
  try {
    const decoded = jwt.verify(jwt_token, SECRET_KEY); // Valida o token
    console.log("Token válido! Executando ação...");
    // Continuar com a execução
  } catch (err) {
    console.error("Token inválido ou expirado.");
    throw new Error("Erro genérico ao validar o token.");
  }
}
