$(document).ready(function() {
  var id_categoria = "";

  // $("#tablaGastos").DataTable();

  cargarTablaGastos();

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
      // getComboCategorias();

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

  function cargarTablaGastos() {
    let url = "http://localhost:8000/categoria/listar";
    $.ajax({
      url: url,
      success: function(respuesta) {
        //console.log(respuesta);
        // $("#txt-nombre").val(respuesta.nombre);
        // $("#txt-descripcion").val(respuesta.descripcion);
        var columns = [
          {
            mDataProp: "nombre",
            className: "text-center"
          },
          {
            mDataProp: "descripcion",
            className: "text-center"
          },
          {
            className: "text-center",
            render: function(data, types, full, meta) {
              var editar =
                '<span data-id="' +
                full.url +
                '" name="gasto-editar" class="table-action" data-toggle="tooltip" data-original-title="Editar gasto">' +
                '<i class="fas fa-edit"></i></span>';
              var eliminar =
                '<span data-id="' +
                full.url +
                '" name="gasto-eliminar" class="table-action" data-toggle="tooltip" data-original-title="Eliminar gasto">' +
                '<i class="fas fa-trash"></i></span>';

              return editar + eliminar;
            }
          }
        ];

        CargarDataTable("#tablaCategorias", respuesta, columns);
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
              value: item["nombre"],
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

  // GASTOS
  // LLamos a todos los botones que pertenecen a card
  $("#gastos").on("click", "button", function() {
    // Obtenemos el url que trae el botón
    var url = $(this).attr("data-id");
    // Obtenemos cual será la opción a realizar
    var accion = $(this).attr("name");
    id_categoria = url;

    // Dependiendo del botón al que se le hace click
    // se realizará una acción transmitida por el atributo name
    if (accion == "gasto-agregar") {
      getComboCategorias();
      $("#modal-agregar-gasto").modal();
    } else if (accion == "gasto-editar") {
      $("#modal-editar-gasto").modal();
    } else if (accion == "gasto-eliminar") {
      $("contenedor-id-gasto").val(url);
      $("#modal-delete-gasto").modal();
    }

    // if (accion == "cat-editar") {
    //   getCategoria();
    //   getComboCategorias();

    //   let form_url = "/categoria/editar/" + id_categoria;

    //   $("#form-editar").attr("action", form_url);
    //   $("#modal-editar-categoria").modal();
    // }
  });

  $("#tablaCategorias").on("click", "span", function() {
    // Obtenemos el url que trae el botón
    var url = $(this).attr("data-id");
    // Obtenemos cual será la opción a realizar
    var accion = $(this).attr("name");
    id_categoria = url;

    // Dependiendo del botón al que se le hace click
    // se realizará una acción transmitida por el atributo name
    if (accion == "gasto-editar") {
      $("#modal-editar-gasto").modal();
      alert(accion + url);
    } else if (accion == "gasto-eliminar") {
      alert(accion + url);
      $("contenedor-id-gasto").val(url);
      $("#modal-delete-gasto").modal();
    }

    // if (accion == "cat-editar") {
    //   getCategoria();
    //   getComboCategorias();

    //   let form_url = "/categoria/editar/" + id_categoria;

    //   $("#form-editar").attr("action", form_url);
    //   $("#modal-editar-categoria").modal();
    // }
  });

  function CargarDataTable(tableID, data, columns) {
    $(tableID)
      .dataTable()
      .fnClearTable();
    $(tableID)
      .dataTable()
      .fnDestroy();

    params = {
      aaData: data,
      aoColumns: columns
    };

    $(tableID).DataTable(params);
  }
});
