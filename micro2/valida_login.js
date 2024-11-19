// Função para verificar se a senha possui o tamanho mínimo
function verificaTamanhoSenha(senha, tamanhoMinimo) {
  return senha.length >= tamanhoMinimo;
}

// Função para verificar as credenciais (simulada)
function verificaCredenciais(usuario, senha) {
  // Substitua esta função por uma chamada real ao seu banco de dados ou serviço de autenticação
  // Aqui, estamos simulando um banco de dados simples
  const usuarios = {
    admin: "123",
    user: "456",
  };
  return usuarios[usuario] === senha;
}

// Função principal de validação
function validaLogin(usuario, senha) {
  const tamanhoMinimoSenha = 8; // Define o tamanho mínimo da senha
  const maxTentativas = 3; // Define o número máximo de tentativas

  if (!verificaTamanhoSenha(senha, tamanhoMinimoSenha)) {
    return "Senha deve ter pelo menos " + tamanhoMinimoSenha + " caracteres.";
  }

  if (!verificaCredenciais(usuario, senha)) {
    // Incrementa o contador de tentativas (implementar esta lógica)
    return "Usuário ou senha incorretos.";
  }

  return "Login válido!";
}

// Exemplo de uso
const usuario = "admin";
const senha = "12345678";

const resultado = validaLogin(usuario, senha);
console.log(resultado);
