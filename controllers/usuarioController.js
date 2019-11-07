const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const { validationResult } = require("express-validator");
const multer = require("multer");
const shortid = require("shortid");

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
    req.flash("danger", erroresArray);

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
    req.flash("danger", erroresArray);

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
    nombre: req.user.nombre,
    sueldo: req.user.sueldo,
    imagen: req.user.imagen
  });
};

// Almacena los cambios en el perfil del usuario
exports.editarPerfil = async (req, res) => {
  // Buscar el usuario
  const usuario = await Usuario.findById(req.user._id);

  usuario.nombre = req.body.nombre;
  usuario.email = req.body.email;
  usuario.sueldo = req.body.sueldo;

  // Verificar si el usuario agrega una imagen
  if (req.file) {
    usuario.imagen = req.file.filename;
  }

  // Guardar los cambios
  await usuario.save();

  req.flash("success", ["Cambios almacenados correctamente"]);

  // Redireccionar
  res.redirect("/");
};

// Subir una imagen al servidor
exports.subirImagen = (req, res, next) => {
  upload(req, res, function(error) {
    if (error) {
      // Errores de multer
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          req.flash("danger", [
            "El tamaño del archivo es demasiado grande. Máximo 200Kb"
          ]);
        } else {
          req.flash("danger", [error.message]);
        }
      } else {
        // Errores del usuario
        req.flash("danger", [error.message]);
      }
      // Redireccionar
      res.redirect("/");
      return;
    } else {
      return next();
    }
  });
};

// Opciones de configuración de Multer
const configuracionMulter = {
  // Tamaño máximo del archivo en bytes
  limits: {
    fileSize: 200000
  },
  // Donde se almacena la imagen
  storage: (fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, __dirname + "../../public/uploads/perfiles");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  })),
  // Verificar que es una imagen válida mediante mimetype
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      // El callback se ejecuta como true o false
      // se retorna true cuando se acepta la imagen
      cb(null, true);
    } else {
      cb(new Error("Formato de archivo no válido. Solo JPEG o PNG."), false);
    }
  }
};

const upload = multer(configuracionMulter).single("imagen");
