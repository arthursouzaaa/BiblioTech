const validador = require('../validators/checkoutValidador')
const database = require("../config/database");

async function adicionarLivro(req, res) {
  try {
    const { titulo, author, ano, categoria } = req.body;

    const validacao = await validador.validarDados({
      titulo: titulo,
      author: author,
      ano: ano,
      categoria: categoria,
    });

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const livro = await model.criar_livro(
      validacao.dados.titulo,
      validacao.dados.author,
      validacao.dados.ano,
      validacao.dados.categoria,
    );

    res.status(201).json({ mensagem: "Livro criado" });
  } catch (error) {
    console.error("Erro ao criar livro", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function editarLivro(req, res) {
  try {
    const id = req.params.id;

    const { titulo, author, ano, categoria } = req.body;

    const validacao = await validador.validarDados({
      titulo: titulo,
      author: author,
      ano: ano,
      categoria: categoria,
    });

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const livro = await model.criar_livro(
      id,
      validacao.dados.titulo,
      validacao.dados.author,
      validacao.dados.ano,
      validacao.dados.categoria,
    );

    res.status(200).json({ mensagem: "Livro editado" });
  } catch (error) {
    console.error("Erro ao editar livro", error);

    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

async function listarLivros(res) {
  try {
    const livros = await model.listarLivros();

    if (!livros) {
      return res.status(404).json({ erro: "Erro ao listar livros" });
    }
    if (livros.length === 0) {
      return res.status(404).json({ erro: "Nenhum livro encontrado" });
    }

    res.status(200).json(livros);
  } catch (error) {
    console.error("Erro ao listar livros", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listarPorCategoria(req, res) {
  try {
    const { categoria } = req.query;

    if (!categoria) {
      return res.status(404).json({ erro: "Categoria invalida" });
    }
    if (categoria.length === 0) {
      return res.status(404).json({ erro: "Digite uma categoria" });
    }

    const livro = await model.listarPorCategoria(categoria);

    if (!livro || livro.length === 0) {
      return res.status(404).json({ erro: "Nenhum livro encontrado" });
    }

    res.status(200).json(livro);
  } catch (error) {
    console.error("Erro ao listar categoria", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

async function listarPorNome(req, res) {
  try {
    const { nome } = req.query;

    if (!nome) {
      return res.status(404).json({ erro: "Nome invalido" });
    }
    if (nome.length === 0) {
      return res.status(404).json({ erro: "Digite um nome" });
    }

    const livro = await model.listarPorNome(nome);

    if (!livro) {
      return res.status(404).json({ erro: "Livro indefinido" });
    }

    if (livro.length === 0) {
      return res.status(404).json({ erro: "Nenhum livro encontrado" });
    }

    res.status(200).json(livro);
  } catch (error) {
    console.error("Erro ao listar livro", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
}

module.exports = {
  adicionarLivro,
  editarLivro,
  listarLivros,
  listarPorCategoria,
  listarPorNome,
};
