const validador = require("../validators/livrosValidador");

async function adicionarLivro(req, res) {
  try {
    const { titulo, author, categoria, ano } = req.body;

    const validacao = await validador.validarDados({
      titulo: titulo,
      author: author,
      categoria: categoria,
      ano: ano,
    });

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const livro = await model.criarLivro(
      validacao.dados.titulo,
      validacao.dados.author,
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
    const id = req.params.id;

    const { titulo, author, categoria, ano } = req.body;

    const validacao = await validador.validarDados({
      titulo: titulo,
      author: author,
      categoria: categoria,
      ano: ano,
    });

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const livro = await model.editarLivro(
      id,
      validacao.dados.titulo,
      validacao.dados.author,
      validacao.dados.categoria,
      validacao.dados.ano,
    );

    res.status(200).json({ mensagem: "Livro editado" });
  } catch (error) {
    console.error("Erro ao editar livro", error);

    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

async function listarLivros(req, res) {
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

async function listarPorTitulo(req, res) {
  try {
    const { titulo } = req.query;

    if (!titulo) {
      return res.status(404).json({ erro: "Titulo invalido" });
    }
    if (titulo.length === 0) {
      return res.status(404).json({ erro: "Digite um titulo" });
    }

    const livro = await model.listarPorTitulo(titulo);

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

async function deletarLivro(req, res) {
  try {
    const { id, titulo, author, categoria, ano } = req.query;

    const validacao = await validador.validarDados({
      titulo: titulo,
      author: author,
      categoria: categoria,
      ano: ano,
    });

    if (!validacao.valido) {
      return res.status(404).json(validacao);
    }

    res.status(200).json({ mensagem: "Livro excluido com sucesso!" });
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
