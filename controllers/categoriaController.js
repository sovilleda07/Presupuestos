const mongoose = require("mongoose");
const Categoria = mongoose.model("Categoria");

// Mostrar la vista de las categorías disponibles del usuario
exports.mostrarCategorias = async (req, res, next) => {
  const categoria = await Categoria.find({ estado: "1", autor: req.user._id });
  //console.log(categoria);

  // Si no hay resultados
  if (!categoria) return next();

  res.render("categoria", {
    categoria,
    nombre: req.user.nombre,
    imagen: req.user.imagen
  });
};

// Listar categorías para llenar combobox
exports.listarCategorias = async (req, res, next) => {
  const categoria = await Categoria.find({ estado: "1", autor: req.user._id });
  //console.log(categoria);

  // Si no hay resultados

  if (!categoria) {
    return next();
  } else {
    return res.status(200).send(categoria);
  }
};

// Mostrar información de una categoría individual
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

// Agregar una categoría
exports.agregarCategoria = async (req, res) => {
  const categoria = new Categoria(req.body);

  //console.log(categoria);

  // Agregando el usuario que crea la categoría
  categoria.autor = req.user._id;

  // Almacenar en la base de datos
  const nuevaCategoria = await categoria.save();

  // Redireccionar
  res.redirect("/categoria");
};

// Eliminar una categoría
exports.eliminarCategoria = async (req, res) => {
  const categoriaEditada = req.body;
  //console.log(categoriaEditada);

  // Cambiar el estado de la categoría
  const categoria = await Categoria.update(
    { url: req.body.url },
    { estado: "0" }
  );

  res.redirect("/categoria");

  //return res.status(200).send({ resultado: "Exito" });
};

// Editar una categoría
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
