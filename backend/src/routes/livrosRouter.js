module.exports = (app) => {
  const controller = require("../controllers/livrosController");
  const auth = require("../controllers/authController");

  app.post("/livro", auth, verificarToken, controller.adicionarLivro);
  app.get("/livros", auth.verificarToken, controller.listarLivros);
  app.get(
    "/livro/categoria/",
    auth.verificarToken,
    controller.listarPorCategoria,
  );
  app.get("/livro/nome", auth.verificarToken, controller.listarPorNome);
  app.put("/livro/editar/:id", auth.verificarToken, controller.editarLivro);
  app.delete("/livro/:id", auth.verificarToken, controller);
};
