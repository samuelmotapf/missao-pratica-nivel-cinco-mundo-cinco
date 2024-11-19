const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken"); // Importação do JWT

const app = express();

app.use(bodyParser.json());

// Porta do servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Mock de dados de usuários
const users = [
  {
    username: "user",
    password: "123456",
    id: 123,
    email: "user@dominio.com",
    perfil: "user",
  },
  {
    username: "admin",
    password: "123456789",
    id: 124,
    email: "admin@dominio.com",
    perfil: "admin",
  },
  {
    username: "colab",
    password: "123",
    id: 125,
    email: "colab@dominio.com",
    perfil: "user",
  },
];

// Chave secreta para o JWT (use uma variável de ambiente em produção)
const JWT_SECRET = "chave-secreta-muito-forte";

// Função de login para validar credenciais
function doLogin(credentials) {
  return users.find(
    (user) =>
      user.username === credentials.username &&
      user.password === credentials.password
  );
}

// Middleware para autenticar o token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido!" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado!" });
    }
    req.user = user; // Adiciona os dados do usuário ao request
    next();
  });
}

// Endpoint para login do usuário
app.post("/api/auth/login", (req, res) => {
  const credentials = req.body;
  const userData = doLogin(credentials);

  if (!userData) {
    return res.status(401).json({ message: "Credenciais inválidas!" });
  }

  // Dados do payload do token
  const payload = {
    id: userData.id,
    perfil: userData.perfil,
  };

  // Gera o token JWT com expiração de 1 hora
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ token });
});

// Teste o middleware com um endpoint protegido
app.get("/api/protected", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Acesso permitido!",
    user: req.user, // Dados extraídos do token
  });
});
