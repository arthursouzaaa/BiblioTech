const { pool } = require("../config/database");

async function criarEmprestimo(livro_id, usuario_id, data_emprestimo, data_devolucao, status) {
  const query = `
    INSERT INTO emprestimos (livro_id, usuario_id, data_emprestimo, data_devolucao, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const result = await pool.query(query, [livro_id, usuario_id, data_emprestimo, data_devolucao, status]);
  return result.rows[0];
}

async function listarEmprestimos(usuario_id = null) {
  let query = `
    SELECT e.*, l.titulo as livro_titulo, u.nome as usuario_nome
    FROM emprestimos e
    JOIN livros l ON e.livro_id = l.id
    JOIN usuarios u ON e.usuario_id = u.id
  `;
  const params = [];

  if (usuario_id) {
    query += ` WHERE e.usuario_id = $1`;
    params.push(usuario_id);
  }

  query += ` ORDER BY e.id;`;

  const result = await pool.query(query, params);
  return result.rows;
}

async function editarEmprestimo(id, livro_id, usuario_id, data_emprestimo, data_devolucao, status) {
  const query = `
    UPDATE emprestimos
    SET livro_id = $1, usuario_id = $2, data_emprestimo = $3, data_devolucao = $4, status = $5
    WHERE id = $6
    RETURNING *;
  `;
  const result = await pool.query(query, [livro_id, usuario_id, data_emprestimo, data_devolucao, status, id]);
  return result.rows[0];
}

async function listarPorId(id) {
  const query = `SELECT * FROM emprestimos WHERE id = $1;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

async function deletarEmprestimo(id) {
  const query = `DELETE FROM emprestimos WHERE id = $1 RETURNING *;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  criarEmprestimo,
  listarEmprestimos,
  editarEmprestimo,
  listarPorId,
  deletarEmprestimo,
};