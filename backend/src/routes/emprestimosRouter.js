module.exports = (app) => {
  const controller = require("../controllers/livrosController");
  const auth = require("../controllers/emprestimosController");

  app.post("/emprestimo", auth, verificarToken, controller.adicionarLivro);
  app.get("/emprestimos", auth.verificarToken, controller.listarLivros);
  app.put("/emprestimo/editar/:id", auth.verificarToken, controller.editarLivro);
  app.delete("/emprestimo/:id", auth.verificarToken, controller.deletarLivro);
};
