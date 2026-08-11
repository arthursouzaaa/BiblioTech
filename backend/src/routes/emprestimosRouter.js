module.exports = (app) => {
  const controller = require("../controllers/emprestimosController");
  const auth = require("../controllers/authController");

  app.post(
    "/emprestimo",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.adicionarEmprestimo,
  );
  app.get("/emprestimos", auth.verificarToken, controller.listarEmprestimos);
  app.put(
    "/emprestimo/editar/:id",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.editarEmprestimo,
  );
  app.delete(
    "/emprestimo/:id",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.deletarEmprestimo,
  );
};
