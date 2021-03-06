const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// Definición del schema
const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: "El nombre de la categoría",
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  estado: {
    type: String,
    default: 1,
    trim: true
  },
  url: {
    type: String,
    lowercase: true
  },
  autor: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuarios",
    required: "El autor es obligatorio"
  }
});
// Middleware
categoriaSchema.pre("save", function(next) {
  // Crear la URL
  const url = slug(this.nombre);
  this.url = `${url}-${shortid.generate()}`;

  next();
});

module.exports = mongoose.model("Categoria", categoriaSchema);
