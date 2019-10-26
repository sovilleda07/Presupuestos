const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const { validationResult } = require("express-validator");

// Carga el formulario para la creación de una cuenta de usuario
exports.formularioNuevaCuenta = (req, res) => {
  res.render("crearCuenta");
};

// Almacena una cuenta de usuario
exports.agregarUsuario = async (req, res, next) => {
  console.log(req.body);

  // Verificar que no existan errores de validación
  const errores = validationResult(req);
  const erroresArray = [];

  // Si hay errores
  if (!errores.isEmpty()) {
    errores.array().map(error => erroresArray.push(error.msg));

    // Enviar los errores de regreso al usuario
    req.flash("error", erroresArray);

    res.render("crearCuenta", {
      messages: req.flash()
    });
    return;
  }

  // Crear el usuario
  const usuario = new Usuario(req.body);

  console.log(usuario);

  // Tratar de almacenar el usuario
  try {
    // Almacenar en la base de datos
    const nuevoUsuario = await usuario.save();
    res.redirect("iniciarSesion");
    //console.log("Se guardó el usuario");
  } catch (error) {
    // Ingresar el error al arreglo de errores
    erroresArray.push(error);
    req.flash("error", erroresArray);

    // Rendizar la página con los errores
    res.render("crearCuenta", {
      messages: req.flash()
    });
  }
};

// Mostrar el formulario de inicio de sesión
exports.formularioIniciarSesion = (req, res) => {
  res.render("iniciarSesion");
};

// Mostrar la página y formulario para editar perfil del usuario
exports.formularioEditarPerfil = (req, res) => {
  res.render("perfil", {
    usuario: req.user,
    nombre: req.user.nombre
  });
};

// Almacena los cambios en el perfil del usuario
exports.editarPerfil = async (req, res) => {
  // Buscar el usuario
  const usuario = await Usuario.findById(req.user._id);

  usuario.nombre = req.body.nombre;
  usuario.email = req.body.email;
  usuario.sueldo = req.body.sueldo;

  // Guardar los cambios
  await usuario.save();

  req.flash("Correcto", ["Cambios almacenados correctamente"]);

  // Redireccionar
  res.redirect("/");
};
