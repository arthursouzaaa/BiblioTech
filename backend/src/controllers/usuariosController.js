const validador = require('../validators/usuarioValidador');
const model = require('../models/usuarioModel'); // Adicionei a importação do model baseada no seu uso
const database = require("../config/database");

async function editarUsuario(req, res) {
  try {
    const id = req.params.id;

    const { nome, email, senha, perfil } = req.body;

    const validacao = await validador.validarDados({
      nome: nome,
      email: email,
      senha: senha,
      perfil: perfil,
    });

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const usuario = await model.editar_usuario(
      id,
      validacao.dados.nome,
      validacao.dados.email,
      validacao.dados.senha,
      validacao.dados.perfil
    );

    res.status(200).json({ mensagem: "Usuário editado" });
  } catch (error) {
    console.error("Erro ao editar usuário", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

async function listarUsuarios(req, res) {
  try {
    const usuarios = await model.listarUsuarios();

    if (!usuarios) {
      return res.status(404).json({ erro: "Erro ao listar usuários" });
    }
    if (usuarios.length === 0) {
      return res.status(404).json({ erro: "Nenhum usuário encontrado" });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao listar usuários", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listarPorEmail(req, res) {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(404).json({ erro: "Email invalido" });
    }
    if (email.length === 0) {
      return res.status(404).json({ erro: "Digite um email" });
    }

    const usuario = await model.listarPorEmail(email);

    if (!usuario || usuario.length === 0) {
      return res.status(404).json({ erro: "Nenhum usuário encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao listar email", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}


async function deletarUsuario(req, res) {
  try {
    const id = req.params.id;

    const usuarioDeletado = await model.deletar_usuario(id);

    if (!usuarioDeletado) {
      return res.status(404).json({ erro: "Usuário não encontrado para deletar" });
    }

    res.status(200).json({ mensagem: "Usuário deletado" });
  } catch (error) {
    console.error("Erro ao deletar usuário", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

module.exports = {
  editarUsuario,
  listarUsuarios,
  listarPorEmail,
  deletarUsuario
};