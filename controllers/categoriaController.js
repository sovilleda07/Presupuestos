const mongoose = require("mongoose");
const Categoria = mongoose.model("Categoria");

exports.mostrarCategorias = async (req, res, next) => {
  const categoria = await Categoria.find({ estado: "1" });
  //console.log(categoria);

  // Si no hay resultados
  if (!categoria) return next();

  res.render("Categoria", {
    categoria
  });
};

exports.mostrarCategoria = async (req, res, next) => {
  const categoria = await Categoria.findOne({ url: req.query.url });
  //console.log(req.query);

  // Si no hay resultados
  if (!categoria) {
    return next();
  } else {
    return res.status(200).send(categoria);
  }
};

exports.formularioNuevaCategoria = (req, res) => {
  res.render("nuevaCategoria");
};

exports.agregarCategoria = async (req, res) => {
  const categoria = new Categoria(req.body);

  //console.log(categoria);

  // Almacenar en la base de datos
  const nuevaCategoria = await categoria.save();

  // Redireccionar
  res.redirect("/categoria");
};

exports.eliminarCategoria = async (req, res) => {
  const categoriaEditada = req.body;
  //console.log(categoriaEditada);

  // Cambiar el estado de la categoría
  const categoria = await Categoria.update(
    { url: req.body.url },
    { estado: "0" }
  );

  res.redirect("/categoria");

  return res.status(200).send({ resultado: "Exito" });
};

exports.editarCategoria = async (req, res) => {
  const categoriaEditada = req.body;
  //console.log(categoriaEditada);

  // Cambiar la categoría
  const categoria = await Categoria.findOneAndUpdate(
    { url: req.params.url },
    categoriaEditada,
    {
      new: true,
      runValidators: true
    }
  );

  res.redirect("/categoria");
};
