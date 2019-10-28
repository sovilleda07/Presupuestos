/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/app.js":
/*!**************************!*\
  !*** ./public/js/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(document).ready(function () {\n  var id_categoria = \"\";\n  var id_gasto = \"\"; //alertify.success(\"hola\");\n  // Llamar a la función para cargar las tablas de los gastos\n\n  cargarTablaGastos(); //cargarTablaPresupuesto();\n  // Accedemos a los botones de la lista que contiene\n  // todas las categorías existentes\n\n  $(\"#lista-cat\").on(\"click\", \"button\", function () {\n    // Obtenemos el url que trae el botón\n    var url = $(this).attr(\"data-id\"); // Obtenemos cual será la opción a realizar\n\n    var accion = $(this).attr(\"name\");\n    id_categoria = url;\n\n    if (accion == \"cat-editar\") {\n      getCategoria();\n      var form_url = \"/categoria/editar/\" + id_categoria;\n      $(\"#form-editar\").attr(\"action\", form_url);\n      $(\"#modal-editar-categoria\").modal();\n    } else if (accion == \"cat-eliminar\") {\n      $(\"#contenedor-id\").val(url);\n      $(\"#modal-delete-categoria\").modal();\n    }\n  }); // LLamos a la acción click del botón de agregar categoría\n\n  $(\"#btn-agregar-cat\").click(function () {\n    // Obtenemos cual será la opción a realizar\n    var accion = $(this).attr(\"name\"); // Dependiendo del botón al que se le hace click\n    // se realizará una acción transmitida por el atributo name\n    // En este caso es la acción de agregar, por lo tanto se desplegará el modal correspondiente\n\n    if (accion == \"cat-agregar\") {\n      // Desplegamos el modal\n      $(\"#modal-agregar-categoria\").modal();\n    }\n  }); // $(\"btn-guardar-cat\").click(function() {\n  //   let url = \"/categoria/editar/\" + id_categoria;\n  //   $(\"#form-editar\").attr(\"action\", url);\n  // });\n  // Función para obtener la información de las categorías\n  // Y colocarla en el formulario en el modal\n\n  function getCategoria() {\n    var url = \"http://localhost:8000/categoria/categoria?url=\" + id_categoria;\n    $.ajax({\n      url: url,\n      success: function success(respuesta) {\n        //console.log(respuesta);\n        $(\"#txt-nombre\").val(respuesta.nombre);\n        $(\"#txt-descripcion\").val(respuesta.descripcion);\n      },\n      error: function error() {\n        console.log(\"No se ha podido obtener la información\");\n      }\n    });\n  } // Función para cargar la tabla con los datos de los gastos generales\n\n\n  function cargarTablaGastos() {\n    var url = \"\".concat(location.origin, \"/gasto/listar\");\n    $.ajax({\n      url: url,\n      success: function success(respuesta) {\n        var columns = [{\n          mDataProp: \"nombre\",\n          className: \"text-center\"\n        }, {\n          mDataProp: \"descripcion\",\n          className: \"text-center\"\n        }, {\n          mDataProp: \"categoria\",\n          className: \"text-center\"\n        }, {\n          mDataProp: \"monto\",\n          className: \"text-center\"\n        }, {\n          mDataProp: \"mes\",\n          className: \"text-center\"\n        }, {\n          mDataProp: \"anio\",\n          className: \"text-center\"\n        }, {\n          className: \"text-center\",\n          render: function render(data, types, full, meta) {\n            var editar = '<span data-id=\"' + full.url + '\" name=\"gasto-editar\" class=\"table-action\" data-toggle=\"tooltip\" data-original-title=\"Editar gasto\">' + '<i class=\"fas fa-edit\"></i></span>';\n            var eliminar = '<span data-id=\"' + full.url + '\" name=\"gasto-eliminar\" class=\"table-action\" data-toggle=\"tooltip\" data-original-title=\"Eliminar gasto\">' + '<i class=\"fas fa-trash\"></i></span>';\n            return editar + eliminar;\n          }\n        }];\n        CargarDataTable(\"#tablaGastos\", respuesta, columns);\n      },\n      error: function error() {\n        console.log(\"No se ha podido obtener la información\");\n      }\n    });\n  } // Función para obtener las categorías existentes y cargarlas en un combobox\n\n\n  function getComboCategorias() {\n    var url = \"\".concat(location.origin, \"/categoria/listar\");\n    $.ajax({\n      url: url,\n      success: function success(respuesta) {\n        //console.log(respuesta);\n        $(\"#cbx_categorias\").empty();\n        $.each(respuesta, function (i, item) {\n          $(\"#cbx_categorias\").append($(\"<option>\", {\n            value: item[\"nombre\"],\n            text: item[\"nombre\"]\n          }));\n        });\n      },\n      error: function error() {\n        console.log(\"No se ha podido obtener la información\");\n      }\n    });\n  } // ------------------------------------------------------- GASTOS -------------------------------------------------------\n  // LLamos a todos los botones que hay en el container\n\n\n  $(\"#gastos\").on(\"click\", \"button\", function () {\n    // Obtenemos cual será la opción a realizar\n    var accion = $(this).attr(\"name\"); // Dependiendo del botón al que se le hace click\n    // se realizará una acción transmitida por el atributo name\n    // En este caso es la acción de agregar, por lo tanto se desplegará el modal correspondiente\n\n    if (accion == \"gasto-agregar\") {\n      // Cargamos las categorías correspondientes\n      getComboCategorias(); // Desplegamos el modal\n\n      $(\"#modal-agregar-gasto\").modal();\n    }\n  }); // Acciones de los botones en la tabla de gastos\n\n  $(\"#tablaGastos\").on(\"click\", \"span\", function () {\n    // Obtenemos el url que trae el botón\n    var url = $(this).attr(\"data-id\"); // Obtenemos cual será la opción a realizar\n\n    var accion = $(this).attr(\"name\");\n    id_gasto = url; // Dependiendo del botón al que se le hace click\n    // se realizará una acción transmitida por el atributo name\n\n    if (accion == \"gasto-editar\") {\n      // Llamos a la función que hace la petición\n      getGasto(); // Creamos una variable para poder modificar el action del formulario\n      // con la url del gasto seleccionado\n\n      var form_url = \"/gasto/editar/\" + id_gasto;\n      $(\"#form-editar-gasto\").attr(\"action\", form_url); // Desplegar el modal\n\n      $(\"#modal-editar-gasto\").modal();\n    } else if (accion == \"gasto-eliminar\") {\n      //alert(url);\n      $(\"contenedor-id-gasto\").val(url);\n      $(\"#modal-delete-gasto\").modal();\n    }\n  }); // Función para obtener la información de un gasto\n  // Y colocarla en el formulario en el modal\n\n  function getGasto() {\n    var url = \"\".concat(location.origin, \"/gasto/listarGasto?url=\").concat(id_gasto);\n    $.ajax({\n      url: url,\n      success: function success(respuesta) {\n        console.log(respuesta); // Enviar a función el nombre de la categoría para seleccionarla\n\n        getComboCategoriaGasto(respuesta.categoria);\n        $(\"#txt-gasto-nombre\").val(respuesta.nombre);\n        $(\"#txt-descripcion-gasto\").val(respuesta.descripcion);\n        $(\"#txt-monto-gasto\").val(respuesta.monto);\n        $(\"#cbx_mes-gasto\").val(respuesta.mes);\n        $(\"#cbx_anio-gasto\").val(respuesta.anio);\n      },\n      error: function error() {\n        console.log(\"No se ha podido obtener la información\");\n      }\n    });\n  } // $(\"#cbx_mes-gasto\").change(function() {\n  //   alert($(\"#cbx_mes-gasto\").val());\n  // });\n  // Función para obtener las categorías existentes y\n  // seleccionar la que trae el registro del gasto\n\n\n  function getComboCategoriaGasto(categoriaSeleccionada) {\n    var url = \"\".concat(location.origin, \"/categoria/listar\");\n    $.ajax({\n      url: url,\n      success: function success(respuesta) {\n        //console.log(respuesta);\n        $(\"#cbx_categorias-gasto\").empty();\n        $.each(respuesta, function (i, item) {\n          if (categoriaSeleccionada === item.nombre) {\n            $(\"#cbx_categorias-gasto\").append($(\"<option>\", {\n              value: item[\"nombre\"],\n              text: item[\"nombre\"],\n              selected: true\n            }));\n          } else {\n            $(\"#cbx_categorias-gasto\").append($(\"<option>\", {\n              value: item[\"nombre\"],\n              text: item[\"nombre\"]\n            }));\n          }\n        });\n      },\n      error: function error() {\n        console.log(\"No se ha podido obtener la información\");\n      }\n    });\n  } // Acción del boton eliminar para realizar la petición\n\n\n  $(\"#btn-gasto-eliminar\").click(function () {\n    var url = \"http://localhost:8000/gasto/eliminar/\" + id_gasto;\n    $.ajax({\n      url: url,\n      // indicamos el tipo de petición\n      type: \"DELETE\",\n      success: function success(respuesta) {\n        alertify.success(\"Se eliminó el gasto correctamente.\"); // Recargamos la tabla de los gastos\n\n        cargarTablaGastos();\n      },\n      error: function error(request, msg, _error) {\n        alertify.success(\"No se pudo eliminar el gasto.\");\n      }\n    });\n  }); // Evento click para filtrar y mostrar los presupuestos\n\n  $(\"#btnFiltrar\").click(function () {\n    var categoria = $(\"#cbx_categoria\").val();\n    var mes = $(\"#cbx_mes\").val();\n    var anio = $(\"#cbx_anio\").val();\n    var url = \"\".concat(location.origin, \"/presupuesto/listar?categoria=\").concat(categoria, \"&mes=\").concat(mes, \"&anio=\").concat(anio);\n    $.ajax({\n      url: url,\n      success: function success(respuesta) {\n        var columns = [{\n          mDataProp: \"nombre\",\n          className: \"text-center\"\n        }, {\n          mDataProp: \"descripcion\",\n          className: \"text-center\"\n        }, {\n          mDataProp: \"categoria\",\n          className: \"text-center\"\n        }, {\n          mDataProp: \"monto\",\n          className: \"text-center\"\n        }, {\n          mDataProp: \"mes\",\n          className: \"text-center\"\n        }, {\n          mDataProp: \"anio\",\n          className: \"text-center\"\n        }]; //CargarDataTable(\"#tablaPresupuesto\", respuesta, columns);\n        // Ahora hay que enviar respuesta.gasto porque es un JSON de dos valores,\n        // 1. gasto: es un array\n        // 2. total: que es un numero\n\n        CargarDataTable(\"#tablaPresupuesto\", respuesta.gasto, columns); //alert(respuesta.total);\n\n        $(\"#total-gastos\").text(\"L. \" + respuesta.total.toFixed(2));\n        var sueldo = parseFloat($(\"#txt_sueldo\").text().replace(\"L.\", \"\"));\n        var restante = sueldo - respuesta.total;\n        $(\"#total_restante\").text(\"L. \" + restante.toFixed(2));\n        var analisis = \"\";\n        var porcentil = restante / sueldo * 100;\n\n        if (restante > 0) {\n          analisis = '<span id=\"porcentaje\" class=\"text-green mr-2\"><i class=\"fa fa-arrow-up\"></i> ' + porcentil + \" %</span>\" + '<span class=\"text-nowrap text-light\">del sueldo</span>';\n        } else {\n          analisis = '<span id=\"porcentaje\" class=\"text-red mr-2\"><i class=\"fa fa-arrow-down\"></i> ' + porcentil + \" %</span>\" + '<span class=\"text-nowrap text-light\">del sueldo</span>';\n        }\n\n        $(\"#analisis\").html(analisis);\n      }\n    });\n  }); // Función del plugin para cargar los datos\n\n  function CargarDataTable(tableID, data, columns) {\n    $(tableID).dataTable().fnClearTable();\n    $(tableID).dataTable().fnDestroy();\n    params = {\n      aaData: data,\n      aoColumns: columns\n    };\n    $(tableID).DataTable(params);\n  }\n});\n\n//# sourceURL=webpack:///./public/js/app.js?");

/***/ })

/******/ });