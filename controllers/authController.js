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
