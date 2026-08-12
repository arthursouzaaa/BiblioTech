// src/controllers/livrosController.js
const validador = require("../validators/livrosValidador");
const model = require("../models/livrosModel");

async function adicionarLivro(req, res) {
  try {
    const { titulo, autor, categoria, ano } = req.body;
    const validacao = await validador.validarDados({
      titulo,
      autor,
      categoria,
      ano,
    });
    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const livro = await model.criarLivro(
      validacao.dados.titulo,
      validacao.dados.autor,
      validacao.dados.categoria,
      validacao.dados.ano,
    );
    res.status(201).json({ mensagem: "Livro criado" });
  } catch (error) {
    console.error("Erro ao criar livro", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function editarLivro(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(id) || Number(id) <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const { titulo, autor, categoria, ano } = req.body;
    const validacao = await validador.validarDados({
      titulo,
      autor,
      categoria,
      ano,
    });
    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const livro = await model.editarLivro(
      id,
      validacao.dados.titulo,
      validacao.dados.autor,
      validacao.dados.categoria,
      validacao.dados.ano,
    );
    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }

    res.status(200).json({ mensagem: "Livro editado" });
  } catch (error) {
    console.error("Erro ao editar livro", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

async function listarLivros(req, res) {
  try {
    const usuarioLogado = req.usuario;
    const apenasDisponiveis = usuarioLogado.perfil !== "administrador";

    const livros = await model.listarLivros(apenasDisponiveis);

    res.status(200).json(livros);
  } catch (error) {
    console.error("Erro ao listar livros", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listarPorCategoria(req, res) {
  try {
    const { categoria } = req.query;
    if (!categoria || categoria.length === 0) {
      return res.status(400).json({ erro: "Categoria inválida" });
    }

    const usuarioLogado = req.usuario;
    const apenasDisponiveis = usuarioLogado.perfil !== "administrador";

    const livro = await model.listarPorCategoria(categoria, apenasDisponiveis);

    res.status(200).json(livro);
  } catch (error) {
    console.error("Erro ao listar categoria", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listarPorTitulo(req, res) {
  try {
    const { titulo } = req.query;
    if (!titulo || titulo.length === 0) {
      return res.status(400).json({ erro: "Título inválido" });
    }

    const usuarioLogado = req.usuario;
    const apenasDisponiveis = usuarioLogado.perfil !== "administrador";

    const livro = await model.listarPorTitulo(titulo, apenasDisponiveis);

    res.status(200).json(livro);
  } catch (error) {
    console.error("Erro ao listar livro", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function deletarLivro(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(id) || Number(id) <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const livro = await model.listarPorId(id);
    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }

    const deletarLivro = await model.deletarLivro(id);
    res.status(200).json({ mensagem: "Livro excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir livro", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

module.exports = {
  adicionarLivro,
  editarLivro,
  listarLivros,
  listarPorCategoria,
  listarPorTitulo,
  deletarLivro,
};
