const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// Chave secreta para assinar os tokens
const secretKey = "suaChaveSecretaAqui";

// Função para gerar um token JWT
function generateToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: "1h" });
}

// Middleware de autenticação
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // Não autorizado

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Proibido
    req.user = user;
    next();
  });
}

// Endpoint protegido
app.get("/confidential-data", authenticateToken, (req, res) => {
  // ... seu código para obter os dados
  const jsonData = service.call(req);
  res.json(jsonData);
});

// Endpoint de login (simplificado para demonstração)
app.post("/login", (req, res) => {
  // Aqui você faria a verificação das credenciais do usuário
  const user = { username: req.body.username };

  const token = generateToken(user);
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
