const { pool } = require("../config/database");

async function criarLivro(titulo, autor, categoria, ano) {
  const query = `
    INSERT INTO livros (titulo, autor, categoria, ano)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(query, [titulo, autor, categoria, ano]);
  return result.rows[0];
}

async function editarLivro(id, titulo, autor, categoria, ano) {
  const query = `
    UPDATE livros
    SET titulo = $1, autor = $2, categoria = $3, ano = $4
    WHERE id = $5
    RETURNING *;
  `;
  const result = await pool.query(query, [titulo, autor, categoria, ano, id]);
  return result.rows[0];
}

async function listarLivros() {
  const query = `SELECT * FROM livros ORDER BY id;`;
  const result = await pool.query(query);
  return result.rows;
}

async function listarPorId(id) {
  const query = `SELECT * FROM livros WHERE id = $1;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

async function listarPorCategoria(categoria) {
  const query = `SELECT * FROM livros WHERE categoria ILIKE $1;`;
  const result = await pool.query(query, [`%${categoria}%`]);
  return result.rows;
}

async function listarPorTitulo(titulo) {
  const query = `SELECT * FROM livros WHERE titulo ILIKE $1;`;
  const result = await pool.query(query, [`%${titulo}%`]);
  return result.rows;
}

async function deletarLivro(id) {
  const query = `DELETE FROM livros WHERE id = $1 RETURNING *;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  criarLivro,
  editarLivro,
  listarLivros,
  listarPorCategoria,
  listarPorTitulo,
  deletarLivro,
};