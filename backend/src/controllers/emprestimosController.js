const validador = require("../validators/livrosValidador");
const model = require("");

async function listarEmprestimos(req, res) {
  try {
    const emprestimo = await model.listarEmprestimos();

    const validacao = await validador.listarEmprestimos(emprestimo);

    if (!validacao.valido) {
      return res.status(404).json(validacao);
    }

    res.status(200).json(validacao.emprestimos);
  } catch (error) {
    console.error("Erro ao listar emprestimos", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

async function adicionarEmprestimo(req, res) {
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

    const livro = await model.adicionarEmprestimo(
      id,
      validacao.dados.titulo,
      validacao.dados.author,
      validacao.dados.categoria,
      validacao.dados.ano,
    );
  } catch (error) {
    console.error("Erro ao adicionar emprestimo", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

async function editarEmprestimo(req, res) {
  try {
    const { id } = req.query;

    const editarEmprestimo = await model.editarEmprestimo(id);

    res.status(200).json({ mensagem: "Emprestimo editado" });
  } catch (error) {
    console.error("Erro ao editar emprestimo", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

async function deletarEmprestimo(req, res) {
  try {
    const { id } = req.query;

    const emprestimo = await model.listarPorId(id);

    if (!emprestimo || emprestimo.length === 0) {
      return res.status(404).json({ erro: "Empretimo não encontrado" });
    }

    res.status(200).json({ mensagem: "Emprestimo excluido com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar emprestimo", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

module.exports = {
  listarEmprestimos,
  adicionarEmprestimo,
  editarEmprestimo,
  deletarEmprestimo,
};
