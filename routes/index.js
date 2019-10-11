const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const categoriaController = require("../controllers/categoriaController");

module.exports = () => {
  // Página principal
  router.get("/", homeController.mostrarPaginaPrincipal);

  // Categorias
  router.get("/categoria", categoriaController.mostrarCategorias);

  return router;
};
