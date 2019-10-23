const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const categoriaController = require("../controllers/categoriaController");
const gastoController = require("../controllers/gastoController");

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
  router.post("/gasto/agregar", gastoController.agregarGasto);
  router.get("/gasto/listar", gastoController.listarGastos);
  router.get("/gasto/listarGasto", gastoController.mostrarGasto);

  return router;
};
