$(document).ready(function() {
  var id_categoria = "";

  $("#lista-cat").on("click", "button", function() {
    var url = $(this).attr("data-id");
    var accion = $(this).attr("name");
    id_categoria = url;

    if (accion == "cat-editar") {
      getCategoria();

      let form_url = "/categoria/editar/" + id_categoria;

      $("#form-editar").attr("action", form_url);
      $("#modal-editar-categoria").modal();
    } else if (accion == "cat-eliminar") {
      $("#contenedor-id").val(url);
      $("#modal-delete-categoria").modal();
    }
  });

  $("btn-guardar-cat").click(function() {
    let url = "/categoria/editar/" + id_categoria;
    $("#form-editar").attr("action", url);
  });

  function getCategoria() {
    let url = "http://localhost:8000/categoria/categoria?url=" + id_categoria;
    $.ajax({
      url: url,
      success: function(respuesta) {
        //console.log(respuesta);
        $("#txt-nombre").val(respuesta.nombre);
        $("#txt-descripcion").val(respuesta.descripcion);
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      }
    });
  }
});
