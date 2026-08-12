const validador = require("../validators/emprestimosValidador");
const model = require("../models/emprestimosModel");
const livrosModel = require("../models/livrosModel");

async function listarEmprestimos(req, res) {
  try {
    const usuarioLogado = req.usuario;
    let emprestimos;
    if (usuarioLogado.perfil === "administrador") {
      emprestimos = await model.listarEmprestimos();
    } else {
      emprestimos = await model.listarEmprestimos(usuarioLogado.id);
    }

    res.status(200).json(emprestimos);
  } catch (error) {
    console.error("Erro ao listar emprestimos", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

async function adicionarEmprestimo(req, res) {
  try {
    const { livro_id, usuario_id, data_emprestimo, data_devolucao, status } = req.body;

    const validacao = await validador.validarDados({
      livro_id, usuario_id, data_emprestimo, data_devolucao, status,
    });

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    // Verificar se o livro está disponível antes de emprestar
    const livro = await livrosModel.listarPorId(livro_id);
    if (!livro || livro.status !== "Disponível") {
      return res.status(400).json({ erro: "Este livro não está disponível para empréstimo." });
    }

    // Criar o empréstimo
    const emprestimo = await model.criarEmprestimo(
      validacao.dados.livro_id,
      validacao.dados.usuario_id,
      validacao.dados.data_emprestimo,
      validacao.dados.data_devolucao,
      validacao.dados.status,
    );

    // Atualizar status do livro para "Emprestado"
    await livrosModel.atualizarStatusLivro(livro_id, "Emprestado");

    res.status(201).json({ mensagem: "Empréstimo adicionado com sucesso", emprestimo });
  } catch (error) {
    console.error("Erro ao adicionar emprestimo", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

async function editarEmprestimo(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(id) || Number(id) <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const { livro_id, usuario_id, data_emprestimo, data_devolucao, status } = req.body;
    const validacao = await validador.validarDados({
      livro_id, usuario_id, data_emprestimo, data_devolucao, status,
    });
    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const editarEmprestimo = await model.editarEmprestimo(
      id,
      validacao.dados.livro_id,
      validacao.dados.usuario_id,
      validacao.dados.data_emprestimo,
      validacao.dados.data_devolucao,
      validacao.dados.status,
    );

    if (!editarEmprestimo) {
      return res.status(404).json({ erro: "Registro não encontrado" });
    }

    res.status(200).json({ mensagem: "Empréstimo editado" });
  } catch (error) {
    console.error("Erro ao editar emprestimo", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
}

async function deletarEmprestimo(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(id) || Number(id) <= 0) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const emprestimo = await model.listarPorId(id);
    if (!emprestimo) {
      return res.status(404).json({ erro: "Empréstimo não encontrado" });
    }

    // Excluir o empréstimo
    const deletarEmprestimo = await model.deletarEmprestimo(id);
    if (!deletarEmprestimo) {
      return res.status(404).json({ erro: "Registro não encontrado" });
    }

    // Atualizar status do livro para "Disponível"
    await livrosModel.atualizarStatusLivro(emprestimo.livro_id, "Disponível");

    res.status(200).json({ mensagem: "Empréstimo excluído e livro devolvido com sucesso" });
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