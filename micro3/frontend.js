// Função para realizar login
function login() {
  const username = "usuario"; // Substituir com os dados reais do usuário
  const password = "senha"; // Substituir com os dados reais do usuário

  let _data = {
    username: username,
    password: password,
  };

  fetch("https://dominio.com/auth", {
    method: "POST",
    body: JSON.stringify(_data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      localStorage.setItem("token", json.jwt_token);
      localStorage.setItem("token_expiration", json.exp); // Armazena a expiração
    })
    .catch((err) => console.log(err));
}

// Função para validar e usar o token
function doAction() {
  const token = localStorage.getItem("token");
  const token_expiration = localStorage.getItem("token_expiration");

  // Verifica se o token expirou
  if (Date.now() / 1000 > token_expiration) {
    console.log("Token expirado! Redirecionando para login...");
    window.location.href = "/login.html"; // Redireciona para a página de login
    return;
  }

  fetch("https://dominio.com/do_SomeAction", {
    method: "POST",
    body: JSON.stringify(null),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(`response: ${json}`);
    })
    .catch((err) => console.log(err));
}
