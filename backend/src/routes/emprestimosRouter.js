module.exports = (app) => {
  const controller = require("../controllers/emprestimosController");
  const auth = require("../controllers/authController");

  app.post("/api/emprestimo", auth.verificarToken, controller.adicionarEmprestimo);
  app.get("/api/emprestimos", auth.verificarToken, controller.listarEmprestimos);
  app.put("/api/emprestimo/editar/:id", auth.verificarToken, auth.verificarAdmin, controller.editarEmprestimo);
  app.delete("/api/emprestimo/:id", auth.verificarToken, controller.deletarEmprestimo);
};