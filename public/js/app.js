$(document).ready(function() {
  var id_categoria = "";

  // Accedemos a los botones de la lista que contiene
  // todas las categorías existentes
  $("#lista-cat").on("click", "button", function() {
    // Obtenemos el url que trae el botón
    var url = $(this).attr("data-id");
    // Obtenemos cual será la opción a realizar
    var accion = $(this).attr("name");
    id_categoria = url;

    if (accion == "cat-editar") {
      getCategoria();
      getComboCategorias();

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

  // Función para obtener la información de las categorías
  // Y colocarla en el formulario en el modal
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

  // Función para obtener las categorías existentes y cargarlas en un combobox
  function getComboCategorias() {
    let url = "http://localhost:8000/categoria/listar";
    $.ajax({
      url: url,
      success: function(respuesta) {
        //console.log(respuesta);
        $("#cbx_categorias").empty();
        $.each(respuesta, function(i, item) {
          $("#cbx_categorias").append(
            $("<option>", {
              value: item["url"],
              text: item["nombre"]
            })
          );
        });
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      }
    });
  }
});
