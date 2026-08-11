const bcrypt = require("bcrypt");

async function validarDados({ nome, email, senha, perfil }) {
  const erros = [];

  if (!nome || nome.trim() === "") {
    erros.push("Nome é obrigatório");
  }
  if (!email || email.trim() === "") {
    erros.push("E-mail é obrigatório");
  } else if (!email.includes("@") || !email.includes(".")) {
    erros.push("E-mail inválido");
  }
  if (!senha || senha.length < 6) {
    erros.push("Senha deve ter pelo menos 6 caracteres");
  }
  // perfil é opcional, pode ignorar ou validar se fornecido

  if (erros.length > 0) {
    return { valido: false, erros };
  }

  const saltRounds = 10;
  const senhaHash = await bcrypt.hash(senha, saltRounds);

  return {
    valido: true,
    dados: {
      nome: nome.trim(),
      email: email.trim(),
      senha: senhaHash,
      perfil: perfil || "comum",
    },
  };
}

module.exports = { validarDados };
