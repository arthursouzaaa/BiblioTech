module.exports = (app) => {
  const controller = require("../controllers/livrosController");
  const auth = require("../controllers/authController");

  app.post("/api/livro", auth.verificarToken, auth.verificarAdmin, controller.adicionarLivro);
  app.get("/api/livros", auth.verificarToken, controller.listarLivros);
  app.get("/api/livro/categoria/", auth.verificarToken, controller.listarPorCategoria);
  app.get("/api/livro/nome", auth.verificarToken, controller.listarPorTitulo);
  app.put("/api/livro/editar/:id", auth.verificarToken, auth.verificarAdmin, controller.editarLivro);
  app.delete("/api/livro/:id", auth.verificarToken, auth.verificarAdmin, controller.deletarLivro);
};