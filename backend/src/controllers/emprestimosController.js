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

async function adicionarEmprestimo(req, res) {}

async function editarEmprestimo(req, res) {}

async function deletarEmprestimo(req, res) {}

module.exports = {
  listarEmprestimos,
  adicionarEmprestimo,
  editarEmprestimo,
  deletarEmprestimo,
};
