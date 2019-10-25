const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const homeController = require("../controllers/homeController");
const categoriaController = require("../controllers/categoriaController");
const gastoController = require("../controllers/gastoController");
const usuarioController = require("../controllers/usuarioController");

module.exports = () => {
  // Página principal
  router.get("/", homeController.mostrarPaginaPrincipal);

  // Categorias
  router.get("/categoria", categoriaController.mostrarCategorias);
  router.get("/categoria/listar", categoriaController.listarCategorias);
  router.get("/categoria/categoria", categoriaController.mostrarCategoria);
  router.get("/categoria/nueva", categoriaController.formularioNuevaCategoria);

  router.post("/categoria/agregar", categoriaController.agregarCategoria);
  router.post("/categoria/editar/:url", categoriaController.editarCategoria);
  router.post("/categoria/eliminar", categoriaController.eliminarCategoria);

  // Gastos
  router.get("/gasto", gastoController.mostrarGastos);
  router.get("/gasto/listar", gastoController.listarGastos);
  router.get("/gasto/listarGasto", gastoController.mostrarGasto);

  router.post("/gasto/agregar", gastoController.agregarGasto);
  router.post("/gasto/editar/:url", gastoController.editarGasto);

  router.delete("/gasto/eliminar/:url", gastoController.eliminarGasto);

  // Usuario
  router.get("/crearCuenta", usuarioController.formularioNuevaCuenta);
  router.post(
    "/crearCuenta/nuevaCuenta",
    [
      // Verificamos los atributos del formulario
      check("nombre", "El nombre de usuario es requerido.")
        .not()
        .isEmpty()
        .escape(),
      check("email", "El correo electrónico es requerido.")
        .not()
        .isEmpty(),
      check("email", "El correo electrónico no es válido.")
        .isEmail()
        .normalizeEmail()
    ],
    usuarioController.agregarUsuario
  );

  return router;
};
