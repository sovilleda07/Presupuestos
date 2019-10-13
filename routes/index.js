const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const categoriaController = require("../controllers/categoriaController");

module.exports = () => {
  // Página principal
  router.get("/", homeController.mostrarPaginaPrincipal);

  // Categorias
  router.get("/categoria", categoriaController.mostrarCategorias);
  router.get("/categoria/categoria", categoriaController.mostrarCategoria);
  router.get("/categoria/nueva", categoriaController.formularioNuevaCategoria);

  router.post("/categoria/agregar", categoriaController.agregarCategoria);
  router.post("/categoria/editar/:url", categoriaController.editarCategoria);
  router.post("/categoria/eliminar", categoriaController.eliminarCategoria);

  return router;
};
