module.exports = {
  mostrarAlertas: (errors = {}, alerts) => {
    const categoria = Object.keys(errors);

    let html = "";
    if (categoria.length) {
      errors[categoria].forEach(error => {
        html +=
          `<div class="alert alert-${categoria} alert-dismissible fade show" role="alert"` +
          `<span class="alert-icon"><i class="ni ni-bell-55"></i></span>` +
          `<span class="alert-text"> ${error}</span>` +
          `<button type="button" class="close" data-dismiss="alert" aria-label="Close">` +
          `<span aria-hidden="true">&times;</span>` +
          `</div>`;
      });
    }
    return (alerts.fn().html = html);
  }
};
