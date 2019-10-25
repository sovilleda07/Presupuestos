const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// Definición del schema
const gastoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: "Es necesario el nombre del gasto",
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  monto: {
    type: Number,
    required: "Es necesario el monto del gasto"
  },
  categoria: {
    type: String,
    required: "La categoría del gasto es necesaria",
    trim: true
  },
  mes: {
    type: String,
    required: "El mes es necesario",
    trim: true
  },
  anio: {
    type: String,
    required: "El año es necesario",
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

//Middleware
gastoSchema.pre("save", function(next) {
  // Crear la URL
  const url = slug(this.nombre);
  this.url = `${url}-${shortid.generate()}`;

  next();
});

module.exports = mongoose.model("Gasto", gastoSchema);
