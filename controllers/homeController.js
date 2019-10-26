exports.mostrarPaginaPrincipal = (req, res) => {
  res.render("home", {
    nombre: req.user.nombre
  });
};
