function validarId(id) {
  const erros = [];

  if (!id || isNaN(id) || id <= 0) {
    erros.push("ID do livro inválido");
  }

  if (erros.length > 0) {
    return { valido: false, erros };
  }

  return {
    valido: true,
    dados: {
      id: Number(id),
    },
  };
}

function validarDados({
  livro_id,
  usuario_id,
  data_emprestimo,
  data_devolucao,
  status,
}) {
  const erros = [];

  if (!livro_id || isNaN(livro_id) || Number(livro_id) <= 0) {
    erros.push("ID do livro inválido");
  }
  if (!usuario_id || isNaN(usuario_id) || Number(usuario_id) <= 0) {
    erros.push("ID do usuário inválido");
  }
  if (!data_emprestimo || isNaN(Date.parse(data_emprestimo))) {
    erros.push("Data de empréstimo inválida");
  }
  if (!data_devolucao || isNaN(Date.parse(data_devolucao))) {
    erros.push("Data de devolução inválida");
  } else if (new Date(data_devolucao) < new Date(data_emprestimo)) {
    erros.push("Data de devolução deve ser posterior à data de empréstimo");
  }
  if (
    status &&
    !["Ativo", "Concluído", "Em atraso", "Cancelado"].includes(status)
  ) {
    erros.push("Status inválido");
  }

  if (erros.length > 0) {
    return { valido: false, erros };
  }

  return {
    valido: true,
    dados: {
      livro_id: Number(livro_id),
      usuario_id: Number(usuario_id),
      data_emprestimo: new Date(data_emprestimo).toISOString().split("T")[0],
      data_devolucao: new Date(data_devolucao).toISOString().split("T")[0],
      status: status || "Ativo",
    },
  };
}

// Validador específico para listagem (apenas verifica se há dados)
function listarEmprestimos(emprestimos) {
  if (!emprestimos || emprestimos.length === 0) {
    return { valido: false, erro: "Nenhum empréstimo encontrado" };
  }
  return { valido: true, emprestimos };
}

module.exports = { validarId, validarDados, listarEmprestimos };
