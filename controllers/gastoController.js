const mongoose = require("mongoose");
const Gasto = mongoose.model("Gasto");

// Mostrar la página de gastos
exports.mostrarGastos = async (req, res, next) => {
  res.render("gasto", {
    nombre: req.user.nombre,
    imagen: req.user.imagen
  });
};

// Agregar un nuevo gasto
exports.agregarGasto = async (req, res) => {
  const gasto = new Gasto(req.body);

  // console.log(gasto);

  // Agregando el usuario que crea el gasto
  gasto.autor = req.user._id;

  // Almacenar en la base de datos
  const nuevoGasto = await gasto.save();

  // Redireccionar
  res.redirect("/gasto");
};

// Cargar todos los datos para llenar la tabla de gastos
exports.listarGastos = async (req, res, next) => {
  const gasto = await Gasto.find({ autor: req.user._id });

  if (!gasto) {
    return next();
  } else {
    return res.status(200).send(gasto);
  }
};

// Mostrar la información de un gasto en específico
exports.mostrarGasto = async (req, res, next) => {
  const gasto = await Gasto.findOne({ url: req.query.url });

  //console.log(gasto);

  // Si no hay resultados
  if (!gasto) {
    return next();
  } else {
    return res.status(200).send(gasto);
  }
};

// Editar el gasto
exports.editarGasto = async (req, res) => {
  const gastoEditado = req.body;
  //console.log(gastoEditado);

  // Cambiar el gasto
  const gasto = await Gasto.findOneAndUpdate(
    { url: req.params.url },
    gastoEditado,
    {
      new: true,
      runValidators: true
    }
  );

  res.redirect("/gasto");
};

// Eliminar el gasto
exports.eliminarGasto = async (req, res) => {
  // Obtener el id del gasto
  const id = req.params.url;
  //console.log(req.body);
  const gasto = await Gasto.findOneAndDelete({ url: id });

  return res.status(200).send({ resultado: "Exito" });
};
