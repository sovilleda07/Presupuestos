const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

// Defición del schema
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
    required: true,
    trim: true
  },
  url: {
    type: String,
    lowercase: true
  },
  token: String,
  expira: Date
});

// Middleware para crear url
usuarioSchema.pre("save", function(next) {
  // Crear la URL
  const url = slug(this.nombre);
  this.url = `${url}-${shortid.generate()}`;
  //console.log(this.url);

  next();
});

// Middleware para hash + salt password
usuarioSchema.pre("save", function(next) {
  const user = this;

  // Si el password ya fue modificado (ya hasheado)
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
      //console.log(user.password);

      next();
    });
  });
});

// Hooks para poder pasar los errores de MongoDB hacia express validator
usuarioSchema.post("save", function(error, doc, next) {
  // Verificar que es un error de MongoDB
  if (error.name === "MongoError" && error.code === 11000) {
    next(
      "Ya existe un usuario con la dirección de correo electrónico ingresada"
    );
  } else {
    next(error);
  }
});

// Realizar un método que automáticamente verifique el password ingresado
// contra el almacenado (hash + salt)
usuarioSchema.methods.compararPassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

usuarioSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  }).catch();
};

module.exports = mongoose.model("Usuario", usuarioSchema);
