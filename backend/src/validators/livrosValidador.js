function validarDados({ titulo, autor, categoria, ano }) {
  const erros = [];

  if (!titulo || titulo.trim() === "") {
    erros.push("Título é obrigatório");
  }
  if (!autor || autor.trim() === "") {
    erros.push("Autor é obrigatório");
  }
  if (!categoria || categoria.trim() === "") {
    erros.push("Categoria é obrigatória");
  }
  if (!ano) {
    erros.push("Ano é obrigatório");
  } else if (
    isNaN(ano) ||
    !Number.isInteger(Number(ano)) ||
    Number(ano) < 0 ||
    Number(ano) > new Date().getFullYear()
  ) {
    erros.push("Ano deve ser um número inteiro válido (entre 0 e ano atual)");
  }

  if (erros.length > 0) {
    return { valido: false, erros };
  }

  return {
    valido: true,
    dados: {
      titulo: titulo.trim(),
      autor: autor.trim(),
      categoria: categoria.trim(),
      ano: Number(ano),
    },
  };
}

module.exports = { validarDados };
