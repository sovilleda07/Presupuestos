const express = require("express");
const exphbs = require("express-handlebars");
const router = require("./routes/index");

const app = express();

// Habiliar Handlebars como Template Engine
app.engine(
  "handlebar",
  exphbs({
    defaultlayout: "layout"
  })
);

app.set("view engine", "handlebars");

app.use("/", router());

app.listen(8000);
