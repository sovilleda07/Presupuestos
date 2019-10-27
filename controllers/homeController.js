const mongoose = require("mongoose");
const Gasto = mongoose.model("Gasto");
const Categoria = mongoose.model("Categoria");

exports.mostrarPaginaPrincipal = async (req, res, next) => {
  // Cargamos las categorías disponibles
  const lasCategorias = await Categoria.find({
    estado: "1",
    autor: req.user._id
  });

  // Obtenemos los 5 últimos gastos del usuario
  const losUltimosGastos = await Gasto.find({ autor: req.user._id })
    .sort({ $natural: -1 })
    .limit(5);

  res.render("home", {
    nombre: req.user.nombre,
    sueldo: req.user.sueldo,
    lasCategorias,
    losUltimosGastos
  });
};

// Cargar todos los datos para llenar la tabla de gastos
exports.listarPresupuesto = async (req, res, next) => {
  const gasto = await Gasto.find({
    categoria: "Universidad",
    autor: req.user._id
  });

  if (!gasto) {
    return next();
  } else {
    return res.status(200).send(gasto);
  }
};
