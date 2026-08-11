const { pool } = require("../config/database");

async function criarUsuario({ nome, email, senha_hash, perfil }) {
  const query = `
    INSERT INTO usuarios (nome, email, senha_hash, perfil)
    VALUES ($1, $2, $3, $4)
    RETURNING id, nome, email, perfil;
  `;
  const result = await pool.query(query, [nome, email, senha_hash, perfil]);
  return result.rows[0];
}

async function buscarUsuarioPorEmail(email) {
  const query = `SELECT * FROM usuarios WHERE email = $1;`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
}

async function listarUsuarios() {
  const query = `SELECT id, nome, email FROM usuarios ORDER BY id;`;
  const result = await pool.query(query);
  return result.rows;
}

async function listarPorEmail(email) {
  const query = `SELECT id, nome, email FROM usuarios WHERE email ILIKE $1;`;
  const result = await pool.query(query, [`%${email}%`]);
  return result.rows;
}

async function editarUsuario(id, nome, email, senha, perfil) {
  const query = `
    UPDATE usuarios
    SET nome = $1, email = $2, senha_hash = $3, perfil = $4
    WHERE id = $5
    RETURNING id, nome, email, perfil;
  `;
  const result = await pool.query(query, [nome, email, senha, perfil, id]);
  return result.rows[0];
}

async function deletarUsuario(id) {
  const query = `DELETE FROM usuarios WHERE id = $1 RETURNING id;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

module.exports = {
  criarUsuario,
  buscarUsuarioPorEmail,
  listarUsuarios,
  listarPorEmail,
  editarUsuario,
  deletarUsuario,
};