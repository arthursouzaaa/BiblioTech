// src/routes/usuariosRouter.js
module.exports = (app) => {
  const controller = require("../controllers/usuariosController");
  const auth = require("../controllers/authController");

  app.post(
    "/api/usuario",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.adicionarUsuario,
  );
  app.get(
    "/api/usuarios",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.listarUsuarios,
  );
  app.get(
    "/api/usuario/email/",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.listarPorEmail,
  );
  app.put(
    "/api/usuario/editar/:id",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.editarUsuario,
  );
  app.delete(
    "/api/usuario/:id",
    auth.verificarToken,
    auth.verificarAdmin,
    controller.deletarUsuario,
  );
};