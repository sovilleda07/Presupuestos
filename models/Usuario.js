const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

// Definición del schema
const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  sueldo: {
    type: String,
    default: 0,
    required: "El sueldo del usuario es requerido.",
    trim: true
  },
  url: {
    type: String,
    lowercase: true
  },
  token: String,
  expira: Date
});

// Middleware para generar el url
usuarioSchema.pre("save", function(next) {
  // Crear la URL
  const url = slug(this.nombre);
  this.url = `${url}-${shortid.generate()}`;
});

// Hooks (método) para hash + salt password
usuarioSchema.pre("save", function(next) {
  const user = this;

  // Si el password ya fué modificado (ya hasheado)
  if (!user.isModified("password")) {
    return next();
  }

  // Generar el salt y si no hay error, hashear el password
  // Se almacena tanto el hash+salt para evitar ataques
  // de rainbow table.
  bcrypt.genSalt(10, (err, salt) => {
    // Si hay un error no continuar
    if (err) return next(err);

    // Si se produjo el salt, realizar el hash
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("Usuario", usuarioSchema);
