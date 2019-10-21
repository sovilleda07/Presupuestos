const mongoose = require("mongoose");
const Gasto = mongoose.model("Gasto");

exports.mostrarGasto = async (req, res, next) => {
  res.render("Gasto");
};

exports.agregarGasto = async (req, res) => {
  const gasto = new Gasto(req.body);

  // console.log(gasto);

  // Almacenar en la base de datos
  const nuevoGasto = await gasto.save();

  // Redireccionar
  res.redirect("/gasto");
};
