module.exports = (app) => {
  const controller = require("../controllers/usuariosController");
  const auth = require("../controllers/authController");

  app.post(
    "/usuario",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.adicionarUsuario,
  );
  app.get(
    "/usuarios",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.listarUsuarios,
  );
  app.get(
    "/usuario/email/",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.listarPorEmail,
  );
  app.put(
    "/usuario/editar/:id",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.editarUsuario,
  );
  app.delete(
    "/usuario/:id",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.deletarUsuario,
  );
};
