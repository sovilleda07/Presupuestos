$(document).ready(function() {
  // Creación de variables para manejar los id para las transacciones
  var id_categoria = "";
  var id_gasto = "";

  // Llamar a la función para cargar las tablas de los gastos
  cargarTablaGastos();

  //cargarTablaPresupuesto();

  // Accedemos a los botones de la lista que contiene
  // todas las categorías existentes
  $("#lista-cat").on("click", "button", function() {
    // Obtenemos el url que trae el botón
    var url = $(this).attr("data-id");
    // Obtenemos cual será la opción a realizar
    var accion = $(this).attr("name");
    id_categoria = url;

    // Si la opcion es de editar
    if (accion == "cat-editar") {
      //Cargamos las categorias
      getCategoria();

      // Formatemos la url para realizar la petición dependiendo la categoría a editar
      let form_url = "/categoria/editar/" + id_categoria;

      $("#form-editar").attr("action", form_url);
      // Desplegamos el modal
      $("#modal-editar-categoria").modal();
    } else if (accion == "cat-eliminar") {
      // Obtenemos la url de un input escondido
      $("#contenedor-id").val(url);
      $("#modal-delete-categoria").modal();
    }
  });

  // ------------------------------------------------------- CATEGORÍAS -------------------------------------------------------
  // LLamos a la acción click del botón de agregar categoría
  $("#btn-agregar-cat").click(function() {
    // Obtenemos cual será la opción a realizar
    var accion = $(this).attr("name");

    // Dependiendo del botón al que se le hace click
    // se realizará una acción transmitida por el atributo name
    // En este caso es la acción de agregar, por lo tanto se desplegará el modal correspondiente
    if (accion == "cat-agregar") {
      // Desplegamos el modal
      $("#modal-agregar-categoria").modal();
    }
  });

  // Función para obtener la información de las categorías
  // Y colocarla en el formulario en el modal
  function getCategoria() {
    // Establecmos la url de la petición
    let url = "http://localhost:8000/categoria/categoria?url=" + id_categoria;
    $.ajax({
      url: url,
      success: function(respuesta) {
        // Inyectamos los valores a los inputs correspondientes
        $("#txt-nombre").val(respuesta.nombre);
        $("#txt-descripcion").val(respuesta.descripcion);
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      }
    });
  }

  // Función para cargar la tabla con los datos de los gastos generales
  function cargarTablaGastos() {
    let url = `${location.origin}/gasto/listar`;
    $.ajax({
      url: url,
      success: function(respuesta) {
        // Creación de las columnas que llenaremos
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
            mDataProp: "categoria",
            className: "text-center"
          },
          {
            mDataProp: "monto",
            className: "text-center"
          },
          {
            mDataProp: "mes",
            className: "text-center"
          },
          {
            mDataProp: "anio",
            className: "text-center"
          },
          {
            className: "text-center",
            // Renderizar los botones de editar y eliminar el gasto
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
        // Llamamos a una función para crear la tabla con los siguientes parámetros:
        // #tablaGastos: nombre en la vista
        // respuesta: es el JSON que obtenmos de la petición
        // columns: los encabezados y sus estilos
        CargarDataTable("#tablaGastos", respuesta, columns);
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      }
    });
  }

  // Función para obtener las categorías existentes y cargarlas en un combobox
  function getComboCategorias() {
    let url = `${location.origin}/categoria/listar`;
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

  // ------------------------------------------------------- GASTOS -------------------------------------------------------
  // LLamos a todos los botones que hay en el container
  $("#gastos").on("click", "button", function() {
    // Obtenemos cual será la opción a realizar
    var accion = $(this).attr("name");

    // Dependiendo del botón al que se le hace click
    // se realizará una acción transmitida por el atributo name
    // En este caso es la acción de agregar, por lo tanto se desplegará el modal correspondiente
    if (accion == "gasto-agregar") {
      // Cargamos las categorías correspondientes
      getComboCategorias();
      // Desplegamos el modal
      $("#modal-agregar-gasto").modal();
    }
  });

  // Acciones de los botones en la tabla de gastos
  $("#tablaGastos").on("click", "span", function() {
    // Obtenemos el url que trae el botón
    var url = $(this).attr("data-id");
    // Obtenemos cual será la opción a realizar
    var accion = $(this).attr("name");
    id_gasto = url;

    // Dependiendo del botón al que se le hace click
    // se realizará una acción transmitida por el atributo name
    if (accion == "gasto-editar") {
      // Llamos a la función que hace la petición
      getGasto();

      // Creamos una variable para poder modificar el action del formulario
      // con la url del gasto seleccionado
      let form_url = "/gasto/editar/" + id_gasto;
      $("#form-editar-gasto").attr("action", form_url);

      // Desplegar el modal
      $("#modal-editar-gasto").modal();
    } else if (accion == "gasto-eliminar") {
      //alert(url);
      $("contenedor-id-gasto").val(url);
      $("#modal-delete-gasto").modal();
    }
  });

  // Función para obtener la información de un gasto
  // Y colocarla en el formulario en el modal
  function getGasto() {
    let url = `${location.origin}/gasto/listarGasto?url=${id_gasto}`;

    $.ajax({
      url: url,
      success: function(respuesta) {
        console.log(respuesta);
        // Enviar a función el nombre de la categoría para seleccionarla
        getComboCategoriaGasto(respuesta.categoria);
        $("#txt-gasto-nombre").val(respuesta.nombre);
        $("#txt-descripcion-gasto").val(respuesta.descripcion);
        $("#txt-monto-gasto").val(respuesta.monto);
        $("#cbx_mes-gasto").val(respuesta.mes);
        $("#cbx_anio-gasto").val(respuesta.anio);
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      }
    });
  }

  // Función para obtener las categorías existentes y
  // seleccionar la que trae el registro del gasto
  function getComboCategoriaGasto(categoriaSeleccionada) {
    let url = `${location.origin}/categoria/listar`;
    $.ajax({
      url: url,
      success: function(respuesta) {
        //console.log(respuesta);
        $("#cbx_categorias-gasto").empty();
        $.each(respuesta, function(i, item) {
          if (categoriaSeleccionada === item.nombre) {
            $("#cbx_categorias-gasto").append(
              $("<option>", {
                value: item["nombre"],
                text: item["nombre"],
                selected: true
              })
            );
          } else {
            $("#cbx_categorias-gasto").append(
              $("<option>", {
                value: item["nombre"],
                text: item["nombre"]
              })
            );
          }
        });
      },
      error: function() {
        console.log("No se ha podido obtener la información");
      }
    });
  }

  // Acción del boton eliminar para realizar la petición
  $("#btn-gasto-eliminar").click(function() {
    let url = "http://localhost:8000/gasto/eliminar/" + id_gasto;
    $.ajax({
      url: url,
      // indicamos el tipo de petición
      type: "DELETE",
      success: function(respuesta) {
        alertify.success("Se eliminó el gasto correctamente.");
        // Recargamos la tabla de los gastos
        cargarTablaGastos();
      },
      error: function(request, msg, error) {
        alertify.success("No se pudo eliminar el gasto.");
      }
    });
  });

  // -------------------------------------------------- FILTRO PRESUPUESTO----------------------------------------
  // Evento click para filtrar y mostrar los presupuestos
  $("#btnFiltrar").click(function() {
    // Obtenemos los valores que están en seleccionados en los combobox
    let categoria = $("#cbx_categoria").val();
    let mes = $("#cbx_mes").val();
    let anio = $("#cbx_anio").val();

    // Creamos la url con los parámetros
    let url = `${location.origin}/presupuesto/listar?categoria=${categoria}&mes=${mes}&anio=${anio}`;

    // Realizamos la petición
    $.ajax({
      url: url,
      success: function(respuesta) {
        // Construcción de las tablas
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
            mDataProp: "categoria",
            className: "text-center"
          },
          {
            mDataProp: "monto",
            className: "text-center"
          },
          {
            mDataProp: "mes",
            className: "text-center"
          },
          {
            mDataProp: "anio",
            className: "text-center"
          }
        ];

        // Ahora hay que enviar respuesta.gasto porque es un JSON de dos valores,
        // 1. gasto: es un array
        // 2. total: que es un numero

        CargarDataTable("#tablaPresupuesto", respuesta.gasto, columns);

        //alert(respuesta.total);
        // Formateamos el texto con el total de los gastos filtrados
        $("#total-gastos").text("L. " + respuesta.total.toFixed(2));
        let sueldo = parseFloat(
          $("#txt_sueldo")
            .text()
            .replace("L.", "")
        );

        // Cálculo del balance
        let restante = sueldo - respuesta.total;

        $("#total_restante").text("L. " + restante.toFixed(2));

        // Cálculo del procentaje del sueldo disponible o faltante
        let analisis = "";
        let porcentil = (restante / sueldo) * 100;

        if (restante > 0) {
          analisis =
            '<span id="porcentaje" class="text-green mr-2"><i class="fa fa-arrow-up"></i> ' +
            porcentil +
            " %</span>" +
            '<span class="text-nowrap text-light">del sueldo</span>';
        } else {
          analisis =
            '<span id="porcentaje" class="text-red mr-2"><i class="fa fa-arrow-down"></i> ' +
            porcentil +
            " %</span>" +
            '<span class="text-nowrap text-light">del sueldo</span>';
        }

        $("#analisis").html(analisis);
      }
    });
  });

  // Función del plugin para cargar los datos
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
