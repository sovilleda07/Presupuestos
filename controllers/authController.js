const passport = require("passport");
const mongoose = require("mongoose");
const Gasto = mongoose.model("Gasto");
const Categoria = mongoose.model("Categoria");

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciarSesion",
  failureFlash: true,
  badRequestMessage: ["Debes ingresar ambos campos"]
});

// Cerrar sesión del usuario actual
exports.cerrarSesion = (req, res) => {
  // Cierra la sesión actual
  req.logout();

  req.flash("correcto", [
    "Has cerrado tu sesión correctamente. ¡Vuelve pronto!"
  ]);

  return res.redirect("/iniciarSesion");
};

// Verificar si el usuario se encuentra autenticado
exports.verificarUsuario = (req, res, next) => {
  // Retorna true si el usuario ya realizó la autenticación
  if (req.isAuthenticated()) {
    return next();
  }

  // Si no se autenticó, redireccionarlo al inicio de sesión
  res.redirect("/iniciarSesion");
};
