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
    imagen: req.user.imagen,
    lasCategorias,
    losUltimosGastos
  });
};

// Cargar todos los datos para llenar la tabla de gastos
exports.listarPresupuesto = async (req, res, next) => {
  var parametros = req.query;

  var filtro = {};

  if (parametros.categoria !== "0") {
    filtro.categoria = parametros.categoria;
  }

  if (parametros.mes !== "0") {
    filtro.mes = parametros.mes;
  }

  if (parametros.anio !== "0") {
    filtro.anio = parametros.anio;
  }

  filtro.autor = req.user._id;

  const gasto = await Gasto.find(filtro);

  var totalFiltro = 0;
  for (elGasto in gasto) {
    totalFiltro += gasto[elGasto].monto;
  }

  if (!gasto) {
    return next();
  } else {
    //gasto.total = totalFiltro;
    return res.status(200).send({ gasto: gasto, total: totalFiltro });
  }
};

exports.mostrarNosotros = (req, res) => {
  res.render("nosotros");
};
