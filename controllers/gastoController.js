const mongoose = require("mongoose");
const Gasto = mongoose.model("Gasto");

// Mostrar la página de gastos
exports.mostrarGastos = async (req, res, next) => {
  res.render("Gasto");
};

// Agregar un nuevo gasto
exports.agregarGasto = async (req, res) => {
  const gasto = new Gasto(req.body);

  // console.log(gasto);

  // Almacenar en la base de datos
  const nuevoGasto = await gasto.save();

  // Redireccionar
  res.redirect("/gasto");
};

// Cargar todos los datos para llenar la tabla de gastos
exports.listarGastos = async (req, res, next) => {
  const gasto = await Gasto.find();

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
