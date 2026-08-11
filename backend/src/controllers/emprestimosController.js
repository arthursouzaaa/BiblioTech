const validador = require("../validators/emprestimosValidador");
const model = require("../models/emprestimosModel");

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
    const { livro_id, usuario_id, data_emprestimo, data_devolucao, status } =
      req.body;

    const validacao = await validador.validarDados({
      livro_id: livro_id,
      usuario_id: usuario_id,
      data_emprestimo: data_emprestimo,
      data_devolucao: data_devolucao,
      status: status,
    });

    if (!validacao.valido) {
      return res.status(400).json(validacao);
    }

    const livro = await model.criarEmprestimo(
      validacao.dados.livro_id,
      validacao.dados.usuario_id,
      validacao.dados.data_emprestimo,
      validacao.dados.data_devolucao,
      validacao.dados.status,
    );
    res.status(201).json({ mensagem: "Emprestimo adicionado com sucesso" });
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

    const { livro_id, usuario_id, data_emprestimo, data_devolucao, status } =
      req.body;

    const validacao = await validador.validarDados({
      livro_id: livro_id,
      usuario_id: usuario_id,
      data_emprestimo: data_emprestimo,
      data_devolucao: data_devolucao,
      status: status,
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

    res.status(200).json({ mensagem: "Emprestimo editado" });
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

    if (!emprestimo || emprestimo.length === 0) {
      return res.status(404).json({ erro: "Empretimo não encontrado" });
    }

    const deletarEmprestimo = await model.deletarEmprestimo(id);

    if (!deletarEmprestimo) {
      return res.status(404).json({ erro: "Registro não encontrado" });
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
