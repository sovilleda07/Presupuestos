const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");

// Carga el formulario para la creación de una cuenta de usuario
exports.formularioNuevaCuenta = (req, res) => {
  res.render("crearCuenta");
};

// Registrar el nuevo Usuario
exports.agregarUsuario = async (req, res, next) => {
  // Crear el usuario
  const usuario = new Usuario(req.body);

  await usuario.save();

  res.redirect("/crearCuenta");
};
