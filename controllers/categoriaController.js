const mongoose = require("mongoose");
const Categoria = mongoose.model("Categoria");

exports.mostrarCategorias = async (req, res, next) => {
  const categoria = await Categoria.find();

  // Si no hay resultados
  if (!categoria) return next();

  res.render("Categoria", {
    categoria
  });
};

exports.formularioNuevaCategoria = (req, res) => {
  res.render("nuevaCategoria");
};

exports.agregarCategoria = async (req, res) => {
  const categoria = new Categoria(req.body);

  // Almacenar en la base de datos
  const nuevaCategoria = await categoria.save();

  // Redireccionar
  res.redirect("/categoria");
};
