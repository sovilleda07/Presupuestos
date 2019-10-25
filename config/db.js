const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

// Configuracioón de Mongoose
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.on("error", error => {
  console.log(error);
});

// Importando los modelos
require("../models/Categoria");
require("../models/Gasto");
require("../models/Usuario");
