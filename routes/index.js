const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const homeController = require("../controllers/homeController");
const categoriaController = require("../controllers/categoriaController");
const gastoController = require("../controllers/gastoController");
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");

module.exports = () => {
  // ---------------------------DASHBOARD---------------------------
  router.get(
    "/",
    authController.verificarUsuario,
    homeController.mostrarPaginaPrincipal
  );

  // Cargar tabla con todos los gatos
  router.get(
    "/presupuesto/listar",
    authController.verificarUsuario,
    homeController.listarPresupuesto
  );

  // -----------------------------CATEGORÍAS------------------------
  // Mostrar información de todas las categorias
  router.get(
    "/categoria",
    authController.verificarUsuario,
    categoriaController.mostrarCategorias
  );
  // Listar categorías para llenar combobox
  router.get(
    "/categoria/listar",
    authController.verificarUsuario,
    categoriaController.listarCategorias
  );
  // Mostrar información de una categoría
  router.get(
    "/categoria/categoria",
    authController.verificarUsuario,
    categoriaController.mostrarCategoria
  );

  // Agregar una categoría
  router.post(
    "/categoria/agregar",
    authController.verificarUsuario,
    categoriaController.agregarCategoria
  );
  // Editar una categoria
  router.post(
    "/categoria/editar/:url",
    authController.verificarUsuario,
    categoriaController.editarCategoria
  );
  // Eliminar o inhabilitar una categoría
  router.post(
    "/categoria/eliminar",
    authController.verificarUsuario,
    categoriaController.eliminarCategoria
  );

  // ----------------------------------GASTOS----------------------------
  // Mostar todos la vista de los gastos
  router.get(
    "/gasto",
    authController.verificarUsuario,
    gastoController.mostrarGastos
  );
  // Cargar tabla con todos los gatos
  router.get(
    "/gasto/listar",
    authController.verificarUsuario,
    gastoController.listarGastos
  );
  // Cargar información de un gasto para editarlo
  router.get(
    "/gasto/listarGasto",
    authController.verificarUsuario,
    gastoController.mostrarGasto
  );

  // Agregar un gasto
  router.post(
    "/gasto/agregar",
    authController.verificarUsuario,
    gastoController.agregarGasto
  );
  // Editar un gasto
  router.post(
    "/gasto/editar/:url",
    authController.verificarUsuario,
    gastoController.editarGasto
  );
  // Eliminar un gasto
  router.delete("/gasto/eliminar/:url", gastoController.eliminarGasto);

  // Usuario
  // Crear usuario
  router.get("/crearCuenta", usuarioController.formularioNuevaCuenta);
  router.post(
    "/crearCuenta",
    [
      // Verficar los atributos del formulario
      check("nombre", "El nombre de usuario es requerido.")
        .not()
        .isEmpty()
        .escape(),
      check("email", "El correo electrónico es requerido.")
        .not()
        .isEmpty(),
      check("email", "El correo electrónico no es válido.")
        .isEmail()
        .normalizeEmail(),
      check("password", "La contraseña es requerida.")
        .not()
        .isEmpty(),
      check(
        "confirmpassword",
        "Debe ingresar la confirmación de tu contraseña."
      )
        .not()
        .isEmpty(),
      check(
        "confirmpassword",
        "La confirmación de la contraseña no coincide con tu contraseña."
      ).custom((value, { req }) => value === req.body.password),
      check("sueldo", "El sueldo del usuaro es requerido.")
        .not()
        .isEmpty()
    ],
    usuarioController.agregarUsuario
  );

  // Iniciar sesión
  router.get("/iniciarSesion", usuarioController.formularioIniciarSesion);
  router.post("/iniciarSesion", authController.autenticarUsuario);

  // Cerrar sesión
  router.get("/cerrarSesion", authController.cerrarSesion);

  // Perfil usuario
  // Mostrar vista
  router.get(
    "/editarPerfil",
    authController.verificarUsuario,
    usuarioController.formularioEditarPerfil
  );
  // Editar perfil del usuario
  router.post(
    "/editarPerfilUsuario",
    authController.verificarUsuario,
    usuarioController.editarPerfil
  );

  return router;
};
