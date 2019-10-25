module.exports = {
  mostrarAlertas: (errors = {}, alerts) => {
    const categoria = Object.keys(errors);

    let html = "";
    if (categoria.length) {
      errors[categoria].forEach(error => {
        html +=
          `<span class="alert-text"><strong>¡ERROR!</strong> ${error}</span>` +
          `<button type="button" class="close" data-dismiss="alert" aria-label="Close">` +
          `<span aria-hidden="true">&times;</span>`;
      });
    }
    return (alerts.fn().html = html);
  }
};
