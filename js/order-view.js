console.log("updated order-view.js");

$(document).ready(function () {
  //$(".alert").alert('close');
  $("#select-bodega").attr("disabled", "disabled");
  $("#register-alert").hide();
  $("#qty-alert").hide();
  $("#stock-alert").hide();

if($('#sessrolid').val() != 2){
  setTableInit(!($("input[name='data-estado']").val() == "V"), !(($("input[name='data-estado']").val() == "A" && $("input[name='data-exportada']").val() == "Y")));
}else{
  setOrderTableInit(false, false);
}

  //$(".txt-observ").editable("save.php");

  function setTableInit(estado, estadoA) {
    table = $("#tableOrder").DataTable({
      retrieve: true,
      paging: false,
      info: false,
      searching: false,
      language: {
        url: "../config/Spanish.json",
      },
      columns: [
        { title: "Producto" },
        { title: "Descripción" },
        //{ title: "Stock" },
        { title: "Precio" },
        { title: "Cantidad" },
        { title: "Dscto" },
        { title: "Cod. Linea" },
        { title: "Dscto. Linea" },
        { title: "Cod. Marca" },
        { title: "Dscto. Marca" },
        { title: "Total" },
        { title: "Fecha" },
        { title: "Observ." },
      ],
      /*"columnDefs": [ {
               "targets": 11,
               "data": null,
               defaultContent: '<input type="text" name="txt-observ" id="txt-observ" CssClass="txt-observ"/>'
           } ] ,  */
      /*columnDefs: [
               {
                   "targets": [ 10 ],
                   "visible": false,
                   "searchable": false
               }
           ],            */
      dom: "Bfrtip",
      select: true,
      buttons: [
        {
          text: "<b>Guardar</b>",
          action: function (e, dt, node, config) {
            console.log("Guardar pedido");

            var rows = dt.rows().data();
            var itemsList = "";

            /*********** Guardar Observaciones ************************** */
            /****** Actualizar pedido ******/
            let notaVenta =
              $("input[name='notaventa']").prop("checked") == true ? "1" : "0";
            let rowsO = dt.$('input[name="observs"]').serialize().split("&");

            let rows1 = dt.rows().data();
            let order_det = "[";

            console.log(rowsO);
            $.each(rows1, function (index, value) {
              let newPerc = rowsO[index].split("=")[1];
              if (newPerc.length > 0) {
                if (order_det.length > 1) order_det = order_det + ",";

                console.log(value);
                //if (newPerc.length == 0) newPerc = "";

                order_det =
                  order_det +
                  '{"newperc":"' +
                  newPerc +
                  '", "product":"' +
                  value[0] +
                  '"}';
                console.log(
                  '{"newperc":"' + newPerc + '", "product":"' + value[0] + '"}'
                );
              }
            });

            order_det += "]";

            /************************************ */

            cadena = "../business/order-save-detail.php";

            //console.log($("input[name='pedi-observ']").val());
            // $noOrder, $empresa_id, $vendedor_id, $client, $product, $qty, $valor, $dscto
            console.log(
              "Bodega " + document.getElementById("select-bodega").value
            );

            $.ajax({
              url: cadena,
              type: "POST",
              data: {
                nOrder: $("#nOrder").val(),
                vend_codigo: $("input[name='id_vendedor']").val(),
                vend_empresa: $("input[name='id_empresa']").val(),
                client: $("#client-id").text(),
                order: order_det,
                orderh: null,
                action: "update-order-aprove",
                observ: $("input[name='pedi-observ']").val(),
                notaventa:
                  $("input[name='notaventa']").prop("checked") == true
                    ? "1"
                    : "0",
                estado: "N", //($("input[name='notaventa']").prop("checked") == true ? '1' : '0')
                bodega: document.getElementById("select-bodega").value,
              },
              success: function (resp) {
                console.log(resp);
                $.ajax({
                  url: "../modules/order_list.php",
                  type: "POST",
                  data: {
                    vend_codigo: $("input[name='id_vendedor']").val(),
                    vend_empresa: $("input[name='id_empresa']").val(),
                    estado: "%",
                  },

                  success: function (resp) {
                    //console.log(resp);
                    if (resp == "../") {
                      window.location.href = resp;
                    } else {
                      $("#title-content").html("<h2>Pedidos</h2>");
                      $("#content").html(resp);
                    }
                  },
                });
              },
            });
          },

          enabled: true,
          className: "feather-trash-2",
        },
        {
          text: "<b>Negar</b>",
          action: function (e, dt, node, config) {
            console.log("negar pedido");

            $.ajax({
              url: "../business/order.php",
              type: "POST",
              data: {
                action: "reprove-order",
                vend_codigo: $("input[name='id_vendedor']").val(),
                vend_empresa: $("input[name='id_empresa']").val(),
                nOrder: $("input[name='nOrder']").val(),
                observ: $("input[name='pedi-observ']").val(),
                deuda:
                  $("input[name='deuda']").prop("checked") == true ? "F" : "D",
              },
              success: function (resulSet) {
                console.log("negar pedido");
                console.log(resulSet);
                var objResulSet = $.parseJSON(resulSet);
                switch (objResulSet["error"]) {
                  case 0:
                    $.ajax({
                      url: "../modules/order_list.php",
                      type: "POST",
                      data: {
                        vend_codigo: $("input[name='id_vendedor']").val(),
                        vend_empresa: $("input[name='id_empresa']").val(),
                        estado: "%",
                      },
                      success: function (resp) {
                        if (resp == "../") {
                          window.location.href = resp;
                        } else {
                          $("#title-content").html("<h2>Pedidos</h2>");
                          $("#content").html(resp);
                        }
                      },
                    });

                    break;
                  default:
                    $("#message").html(objResulSet["data"]);
                    alertMsg("#message");
                    break;
                }
              },
            });
          },

          enabled: true,
          className: "feather-download",
        },
        {
          text: "<b>Export (Aprobar)</b>",
          action: function (e, dt, node, config) {
              console.log("export pedido");
      
              $.ajax({
                  url: "../business/order.php",
                  type: "POST",
                  data: {
                      action: "export-file-orders1",
                      vend_codigo: $("input[name='vend-id']").val(),
                      vend_empresa: $("input[name='id_empresa']").val(),
                      nOrder: $("input[name='nOrder']").val(),
                  },
                  success: function (resulSet) {
                      console.log("export to file pedido");
                      let objResulSet = $.parseJSON(resulSet);  // Parse the response

                      function formatDateToMMDDYYYY_UTC(dateString) {
                        if (!dateString) return ""; 
                        let date = new Date(dateString);
                        let mm = String(date.getUTCMonth() + 1).padStart(2, "0"); 
                        let dd = String(date.getUTCDate()).padStart(2, "0");
                        let yyyy = date.getUTCFullYear();
                        return `${mm}/${dd}/${yyyy}`;
                    }
                    

                      if (objResulSet["error"] === 0) {
                          var rows = objResulSet["data"];
                          
                          // Order Details Data
                          let orderDetails = [
                            [
                                "PEDI_CODIGO_EMPRESA", "PEDI_TIPO", "PEDI_TIPO_CLIENTE", "PEDI_CODIGO_PEDIDO", 
                                "PEDI_ORDEN_COMPRA", "PEDI_CODIGO_CLIENTE", "PEDI_NOMBRE_CLIENTE", "PEDI_DIRECCION", 
                                "PEDI_TELEFONO", "PEDI_CEDULA_RUC", "PEDI_CODIGO_BODEGA", "PEDI_CODIGO_VENDEDOR", 
                                "PEDI_COMISION", "PEDI_PRECIO_VTA", "PEDI_FECHA", "PEDI_FECHA_ENTREGA", 
                                "PEDI_FECHA_ULTIMO_DESP", "PEDI_TIPO_MONEDA", "PEDI_TIPO_CAMBIO", "PEDI_VALOR_PEDIDO", 
                                "PEDI_FORMA_PAGO", "PEDI_CODIGO_DSCTO", "PEDI_DESCUENTO_TOTAL", "PEDI_IVA", 
                                "PEDI_VALOR_IVA", "PEDI_FECHA_POSTERGA_VCTO", "PEDI_FECHA_COBRO", "PEDI_VALOR_DESCUENTO", 
                                "PEDI_FECHA_ANULACION", "PEDI_ESTADO", "PEDI_USUARIO", "PEDI_TERMINAL", "PEDI_FECHA_SISTEMA", 
                                "PEDI_OBSERVACION", "PEDI_ALFA", "PEDI_TOTAL_ICE"
                            ],
                            [
                                rows[0].PEDI_CODIGO_EMPRESA, 
                                1, 
                                1, 
                                rows[0].PEDI_CODIGO_PEDIDO,
                                "", 
                                rows[0].PEDI_CODIGO_CLIENTE, 
                                rows[0].PEDI_NOMBRE_CLIENTE, 
                                "N",
                                "N", 
                                "N", 
                                7, 
                                rows[0].PEDI_CODIGO_VENDEDOR,
                                "", 
                                "", 
                                formatDateToMMDDYYYY_UTC(rows[0].PEDI_FECHA), 
                                formatDateToMMDDYYYY_UTC(rows[0].PEDI_FECHA_ENTREGA),
                                "", 
                                2, 
                                0, 
                                "",
                                5, 
                                "", 
                                "", 
                                15,
                                "", 
                                "", 
                                "", 
                                "",
                                "", 
                                "E", 
                                rows[0].PEDI_USUARIO, 
                                rows[0].PEDI_TERMINAL, 
                                formatDateToMMDDYYYY_UTC(rows[0].PEDI_FECHA_SISTEMA),
                                rows[0].PEDI_OBSERVACION, 
                                "N", 
                                0
                            ]
                          ];
                        

                          // Create Workbook for Order Details
                          var wb1 = XLSX.utils.book_new();
                          var ws1 = XLSX.utils.aoa_to_sheet(orderDetails);
                          XLSX.utils.book_append_sheet(wb1, ws1, "Order_Details");
                          var wbout1 = XLSX.write(wb1, { bookType: "xlsx", type: "binary" });
                          saveAs(new Blob([s2ab(wbout1)], { type: "application/octet-stream" }), "fa_Pedido_"+ rows[0].PEDI_CODIGO_PEDIDO + ".xlsx");

                          let orderDetails1 = [
                            [
                                "DEPE_CODIGO_EMPRESA", "DEPE_CODIGO_BODEGA", "DEPE_CODIGO_PEDIDO", "DEPE_CODIGO_PRODUCTO", 
                                "DEPE_CANTIDAD", "DEPE_PRECIO", "DEPE_PAGO_IVA", "DEPE_COSTO", "DEPE_CANT_DSCTO1", 
                                "DEPE_PORC_DSCTO1", "DEPE_CODIGO_DSCTO1", "DEPE_CANT_DSCTO2", "DEPE_PORC_DSCTO2", 
                                "DEPE_CODIGO_DSCTO2", "DEPE_CANT_DSCTO3", "DEPE_PORC_DSCTO3", "DEPE_CODIGO_DSCTO3", 
                                "DEPE_CANT_DSCTO4", "DEPE_PORC_DSCTO4", "DEPE_CODIGO_DSCTO4", "DEPE_CANT_DSCTO5", 
                                "DEPE_PORC_DSCTO5", "DEPE_CODIGO_DSCTO5", "DEPE_FECHA_ENTREGA", "DEPE_PRECIO_LISTA", 
                                "DEPE_CANTIDAD_PEDIDO", "DEPE_CANTIDAD_OBS", "DEPE_EXTRA", "DEPE_PRECIO_G", "DEPE_NUMERO", 
                                "DEPE_NUMERO2", "DEPE_CARACTER", "DEPE_CARACTER2", "DEPE_BACKORDER", "DEPE_ENVIO_MAIL", 
                                "DEPE_VALOR_ICE"
                            ]
                        ];
                        // Loop through all rows and add each row's data to the array
                        for (let i = 0; i < rows.length; i++) {
                            orderDetails1.push([
                                rows[i].DEPE_CODIGO_EMPRESA, 
                                7, 
                                rows[i].DEPE_CODIGO_PEDIDO, 
                                rows[i].DEPE_CODIGO_PRODUCTO,
                                rows[i].DEPE_CANTIDAD, 
                                0, 
                                "S", 
                                0, 
                                "",
                                "", 
                                "", 
                                "", 
                                "",
                                "", 
                                "", 
                                "", 
                                "",
                                "", 
                                "", 
                                "", 
                                "",
                                "", 
                                "", 
                                formatDateToMMDDYYYY_UTC(rows[0].DEPE_FECHA_ENTREGA), 
                                0,
                                rows[i].DEPE_CANTIDAD_PEDIDO, 
                                "", 
                                0, 
                                0, 
                                "", 
                                "", 
                                "", 
                                "", 
                                "", 
                                "", 
                                0
                            ]);
                        }
                        
                        // Create the Excel file and download
                        var wb2 = XLSX.utils.book_new();
                        var ws2 = XLSX.utils.aoa_to_sheet(orderDetails1);
                        XLSX.utils.book_append_sheet(wb2, ws2, "Product_Data");
                        var wbout2 = XLSX.write(wb2, { bookType: "xlsx", type: "binary" });
                        var filename = "fa_detalle_pedido_"+rows[0].DEPE_CODIGO_PEDIDO +".xlsx";                       
                        saveAs(new Blob([s2ab(wbout2)], { type: "application/octet-stream" }), filename);
                        
                          

                          console.log($("input[name='nOrder']").val());
      
                          $.ajax({
                              url: "../business/order.php",
                              type: "POST",
                              data: {
                                  action: "export-order",
                                  vend_codigo: $("input[name='vend-id']").val(),
                                  vend_empresa: $("input[name='id_empresa']").val(),
                                  nOrder: $("input[name='nOrder']").val(),
                              },
                              success: function (resulSet) {
                                  console.log("aprobar pedido");
                                  console.log(resulSet);
                                  var objResulSet = $.parseJSON(resulSet);
                                  if (objResulSet["error"] === 0) {
                                      $.ajax({
                                          url: "../modules/order_list.php",
                                          type: "POST",
                                          data: {
                                              vend_codigo: $("input[name='id_vendedor']").val(),
                                              vend_empresa: $("input[name='id_empresa']").val(),
                                              estado: "%",
                                          },
                                          success: function (resp) {
                                              if (resp == "../") {
                                                  window.location.href = resp;
                                              } else {
                                                  $("#title-content").html("<h2>Pedidos</h2>");
                                                  $("#content").html(resp);
                                              }
                                          },
                                      });
                                  } else {
                                      $("#message").html(objResulSet["data"]);
                                      alertMsg("#message");
                                  }
                              },
                          });
      
                      } else {
                          $("#message").html(objResulSet["data"]);
                          alertMsg("#message");
                      }
                  },
              });
          },
      
          enabled: estadoA,
          className: "feather-download",
      },
      
        {
          text: "<b>Revisar descuentos</b>",
          action: function (e, dt, node, config) {
            console.log("export oracle pedido");

            let vbody = $("#tableOrder>tbody");
            let vrows = vbody.children();

            let fieldExport = [
              ["vendedor", parseInt($("input[name='vend-id']").val())],
              [
                "Cliente",
                parseInt($("#client-id").val()),
                $("#client-name").val(),
              ],
              ["Bodega", parseInt("7")],
              ["", ""],
              ["PRODUCTO", "CANTIDAD"],
            ];
            let oracledExport =
              "INSERT INTO FA_PEDIDO(PEDI_CODIGO_CLIENTE, PEDI_CODIGO_VENDEDOR) VALUES(" +
              parseInt($("input[name='vend-id']").val()) +
              ', "' +
              $("#client-name").val() +
              '"); \n';
            //[['vendedor', parseInt($("input[name='vend-id']").val())], ['Cliente', parseInt($("#client-id").val()), $("#client-name").val()], ['',''], ['PRODUCTO','CANTIDAD']]

            var rows = dt.rows().data();
            var itemsList = "";

            for (let i = 0; i < rows.length; i++) {
              console.log(rows[i]);
              //prod = parseInt(rows[i][0]);
              prod = ("'" + rows[i][0]).toString();
              qty = rows[i][3];
              fieldExport.push([prod, qty]);
              oracledExport =
                oracledExport +
                "INSERT INTO FA_DETALLE_PEDIDO(DEPE_CODIGO_PRODUCTO, DEPE_CANTIDAD) VALUES(" +
                prod +
                ', "' +
                qty +
                '"); \n';
            }

            //console.log(fieldExport);

            console.log($("input[name='nOrder']").val());

            $.ajax({
              url: "../business/order.php",
              type: "POST",
              data: {
                action: "export-order-review",
                vend_codigo: $("input[name='vend-id']").val(),
                vend_empresa: $("input[name='id_empresa']").val(),
                nOrder: $("input[name='nOrder']").val(),
              },
              success: function (resulSet) {
                console.log("revisar pedido");
                console.log(resulSet);
                var objResulSet = $.parseJSON(resulSet);
                switch (objResulSet["error"]) {
                  case 0:
                    //ExportToExcel(fieldExport, $("#nOrder").text(),false);
                    guardarArchivoDeTexto(
                      oracledExport,
                      $("input[name='nOrder']").val() + ".txt"
                    );

                    $.ajax({
                      url: "../modules/order_list.php",
                      type: "POST",
                      data: {
                        vend_codigo: $("input[name='id_vendedor']").val(),
                        vend_empresa: $("input[name='id_empresa']").val(),
                        estado: "%",
                      },
                      success: function (resp) {
                        if (resp == "../") {
                          window.location.href = resp;
                        } else {
                          $("#title-content").html("<h2>Pedidos</h2>");
                          $("#content").html(resp);
                        }
                      },
                    });

                    break;
                  default:
                    $("#message").html(objResulSet["data"]);
                    alertMsg("#message");
                    break;
                }
              },
            });
          },

          enabled: estado,
          className: "feather-download",
        },
        /*{
                  text: '<b>Export (PDF)</b>',
                  action: function ( e, dt, node, config ) {
                     console.log ('export PDF');         
                     
                     var doc = new jsPDF();
                     var elementHTML = $('#content-products').html();
                     var specialElementHandlers = {
                         '#elementH': function (element, renderer) {
                             return true;
                         }
                     };
                     doc.fromHTML(elementHTML, 8, 8, {
                         'elementHandlers': specialElementHandlers
                     });
                     
                     // Save the PDF
                     doc.save('sample-document.pdf');                                                                            

                 },        
                              
                  enabled: true,
                  className: 'feather-download'
               },*/

        /* {
                     extend: 'excelHtml5',
                     exportOptions: {
                        columns: [ 10, 3]
                     }
                 }, */
        "csv",
        "pdf",
        "print",
      ],
    });

    table.on("select deselect", function () {
      var selectedRows = table.rows({ selected: true }).count();

      //table.button( 0 ).enable( true );
      //table.button( 1 ).enable( selectedRows > 0 );
      //table.button( 0 ).enable( selectedRows === 1 );
      //table.button( 3 ).enable( selectedRows > 0 );
    });
    /*row( ':eq(0)' ).edit({
         title: 'Edit first row'
        });*/

    //table.cells( null, 7 ).edit();

    //console.log(json_var);
    var objResulSet = json_var; //$.parseJSON(json_var);
    if (dataNotaVenta == "1")
      $("input[name='notaventa']").prop("checked", true);
    else $("input[name='notaventa']").prop("checked", false);

    /*console.log(dataNotaVenta);
        if (dataNotaVenta == '1')   $("#notaventa-alert").show();
        else  $("#notaventa-alert").hide();*/

    $("#notaventa-alert").hide();

    //console.log(objResulSet);
    switch (objResulSet["error"]) {
      case 0:
        $("#message").html("Productos añadidos a la canasta.");

        var row = objResulSet["data"];
        //console.log(row[0]);
        var list_code = $("#product-list-selected").val();

        var total_items = 0;
        var total_dscto = 0.0;
        var total_pagar = 0.0;

        var input = document.createElement("input");
        input.type = "text";
        input.name = "txt-observ";
        input.className = "css-class-name"; // set the CSS class
        //container.appendChild(input); // put it into the DOM

        $.each(row, function (key, value) {
          console.log(value);
          /*if (list_code.length > 0) list_code =  list_code + "," + value["DEPE_CODIGO_PRODUCTO"];
                  else list_code =  value["DEPE_CODIGO_PRODUCTO"];
                  */

          if (list_code.length > 0) {
            list_code = list_code + "," + value["DEPE_CODIGO_PRODUCTO"];
          } else {
            list_code = value["DEPE_CODIGO_PRODUCTO"];
          }

          total_items = total_items + value["DEPE_CANTIDAD"];
          total_dscto = total_dscto + parseFloat(value["DEPE_COSTO"]);
          total_pagar = total_pagar + parseFloat(value["DEPE_PRECIO_LISTA"]);

          var rowNode = table.row //.row.add( [ value["DEPE_CODIGO_PRODUCTO"], value["DESCRIPCION"], parseFloat(value["DEPE_PRECIO"]).toFixed(2), value["DEPE_CANTIDAD"], parseFloat(value["DEPE_COSTO"]).toFixed(2), parseInt(value["COD_LINEA"]), parseFloat(value["DSCTO_LINEA"]).toFixed(2), parseFloat(value["COD_MARCA"]), parseFloat(value["DSCTO_MARCA"]).toFixed(2), parseFloat(value["DEPE_PRECIO_LISTA"]).toFixed(2), value["DEPE_FECHA_ENTREGA"], '<input type="text" id="txt-observ" name="txt-observ" CssClass="txt-observ"/>']) //.row.add( [ value["DEPE_CODIGO_PRODUCTO"], value["DESCRIPCION"], 0, parseFloat(value["DEPE_PRECIO"]).toFixed(2), value["DEPE_CANTIDAD"], parseFloat(value["DEPE_COSTO"]).toFixed(2), parseFloat(value["DEPE_PRECIO_LISTA"]).toFixed(2), value["DEPE_FECHA_ENTREGA"], '<input type="text"/>'])
            .add([
              value["DEPE_CODIGO_PRODUCTO"],
              value["DESCRIPCION"],
              parseFloat(value["DEPE_PRECIO"]).toFixed(2),
              value["DEPE_CANTIDAD"],
              parseFloat(value["DEPE_COSTO"]).toFixed(2),
              parseInt(value["COD_LINEA"]),
              parseFloat(value["DSCTO_LINEA"]).toFixed(2),
              parseFloat(value["COD_MARCA"]),
              parseFloat(value["DSCTO_MARCA"]).toFixed(2),
              parseFloat(value["DEPE_PRECIO_LISTA"]).toFixed(2),
              value["DEPE_FECHA_ENTREGA"],
              '<input type="text" name="observs" id="txt-observ" CssClass="txt-observ" value="' +
                value["DEPE_CARACTER"] +
                '"/>',
            ])
            .draw()
            .node();
        });

        $("#total-items").text(parseFloat(total_items));
        $("#total-dscto").text(parseFloat(total_dscto).toFixed(2));
        $("#total-pagar").text(parseFloat(total_pagar).toFixed(2));

        $("#product-list-selected").val(list_code);

        break;
      default:
        $("#message").html(objResulSet["data"]);
        break;
    }
    alertMsg("#message");
    //console.log(objResulSet);
  }
  
  function setOrderTableInit(estado) {
    table = $("#tableOrder").DataTable({
      retrieve: true,
      paging: false,
      info: false,
      searching: false,
      language: {
        url: "../config/Spanish.json",
      },
      columns: [
        { title: "Producto" },
        { title: "Descripción" },
        //{ title: "Stock" },
        { title: "Precio" },
        { title: "Cantidad" },
        { title: "Dscto" },
        { title: "Cod. Linea" },
        { title: "Dscto. Linea" },
        { title: "Cod. Marca" },
        { title: "Dscto. Marca" },
        { title: "Total" },
        { title: "Fecha" },
        { title: "Observ." },
      ],
      /*"columnDefs": [ {
               "targets": 11,
               "data": null,
               defaultContent: '<input type="text" name="txt-observ" id="txt-observ" CssClass="txt-observ"/>'
           } ] ,  */
      /*columnDefs: [
               {
                   "targets": [ 10 ],
                   "visible": false,
                   "searchable": false
               }
           ],            */
      dom: "Bfrtip",
      select: true,
      buttons: [
        {
          text: "<b>Guardar</b>",
          action: function (e, dt, node, config) {
            console.log("Guardar pedido");

            var rows = dt.rows().data();
            var itemsList = "";

            /*********** Guardar Observaciones ************************** */
            /****** Actualizar pedido ******/
            let notaVenta =
              $("input[name='notaventa']").prop("checked") == true ? "1" : "0";
            let rowsO = dt.$('input[name="observs"]').serialize().split("&");

            let rows1 = dt.rows().data();
            let order_det = "[";

            console.log(rowsO);
            $.each(rows1, function (index, value) {
              let newPerc = rowsO[index].split("=")[1];
              if (newPerc.length > 0) {
                if (order_det.length > 1) order_det = order_det + ",";

                console.log(value);
                //if (newPerc.length == 0) newPerc = "";

                order_det =
                  order_det +
                  '{"newperc":"' +
                  newPerc +
                  '", "product":"' +
                  value[0] +
                  '"}';
                console.log(
                  '{"newperc":"' + newPerc + '", "product":"' + value[0] + '"}'
                );
              }
            });

            order_det += "]";

            /************************************ */

            cadena = "../business/order-save-detail.php";

            //console.log($("input[name='pedi-observ']").val());
            // $noOrder, $empresa_id, $vendedor_id, $client, $product, $qty, $valor, $dscto
            console.log(
              "Bodega " + document.getElementById("select-bodega").value
            );

            $.ajax({
              url: cadena,
              type: "POST",
              data: {
                nOrder: $("#nOrder").val(),
                vend_codigo: $("input[name='id_vendedor']").val(),
                vend_empresa: $("input[name='id_empresa']").val(),
                client: $("#client-id").text(),
                order: order_det,
                orderh: null,
                action: "update-order-aprove",
                observ: $("input[name='pedi-observ']").val(),
                notaventa:
                  $("input[name='notaventa']").prop("checked") == true
                    ? "1"
                    : "0",
                estado: "N", //($("input[name='notaventa']").prop("checked") == true ? '1' : '0')
                bodega: document.getElementById("select-bodega").value,
              },
              success: function (resp) {
                console.log(resp);
                $.ajax({
                  url: "../modules/order_list.php",
                  type: "POST",
                  data: {
                    vend_codigo: $("input[name='id_vendedor']").val(),
                    vend_empresa: $("input[name='id_empresa']").val(),
                    estado: "%",
                  },

                  success: function (resp) {
                    //console.log(resp);
                    if (resp == "../") {
                      window.location.href = resp;
                    } else {
                      $("#title-content").html("<h2>Pedidos</h2>");
                      $("#content").html(resp);
                    }
                  },
                });
              },
            });
          },

          enabled: true,
          className: "feather-trash-2",
        },
        /*{
                  text: '<b>Export (PDF)</b>',
                  action: function ( e, dt, node, config ) {
                     console.log ('export PDF');         
                     
                     var doc = new jsPDF();
                     var elementHTML = $('#content-products').html();
                     var specialElementHandlers = {
                         '#elementH': function (element, renderer) {
                             return true;
                         }
                     };
                     doc.fromHTML(elementHTML, 8, 8, {
                         'elementHandlers': specialElementHandlers
                     });
                     
                     // Save the PDF
                     doc.save('sample-document.pdf');                                                                            

                 },        
                              
                  enabled: true,
                  className: 'feather-download'
               },*/

        /* {
                     extend: 'excelHtml5',
                     exportOptions: {
                        columns: [ 10, 3]
                     }
                 }, */
        "csv",
        "pdf",
        "print",
      ],
    });

    table.on("select deselect", function () {
      var selectedRows = table.rows({ selected: true }).count();

      //table.button( 0 ).enable( true );
      //table.button( 1 ).enable( selectedRows > 0 );
      //table.button( 0 ).enable( selectedRows === 1 );
      //table.button( 3 ).enable( selectedRows > 0 );
    });
    /*row( ':eq(0)' ).edit({
         title: 'Edit first row'
        });*/

    //table.cells( null, 7 ).edit();

    //console.log(json_var);
    var objResulSet = json_var; //$.parseJSON(json_var);
    if (dataNotaVenta == "1")
      $("input[name='notaventa']").prop("checked", true);
    else $("input[name='notaventa']").prop("checked", false);

    /*console.log(dataNotaVenta);
        if (dataNotaVenta == '1')   $("#notaventa-alert").show();
        else  $("#notaventa-alert").hide();*/

    $("#notaventa-alert").hide();

    //console.log(objResulSet);
    switch (objResulSet["error"]) {
      case 0:
        $("#message").html("Productos añadidos a la canasta.");

        var row = objResulSet["data"];
        //console.log(row[0]);
        var list_code = $("#product-list-selected").val();

        var total_items = 0;
        var total_dscto = 0.0;
        var total_pagar = 0.0;

        var input = document.createElement("input");
        input.type = "text";
        input.name = "txt-observ";
        input.className = "css-class-name"; // set the CSS class
        //container.appendChild(input); // put it into the DOM

        $.each(row, function (key, value) {
          console.log(value);
          /*if (list_code.length > 0) list_code =  list_code + "," + value["DEPE_CODIGO_PRODUCTO"];
                  else list_code =  value["DEPE_CODIGO_PRODUCTO"];
                  */

          if (list_code.length > 0) {
            list_code = list_code + "," + value["DEPE_CODIGO_PRODUCTO"];
          } else {
            list_code = value["DEPE_CODIGO_PRODUCTO"];
          }

          total_items = total_items + value["DEPE_CANTIDAD"];
          total_dscto = total_dscto + parseFloat(value["DEPE_COSTO"]);
          total_pagar = total_pagar + parseFloat(value["DEPE_PRECIO_LISTA"]);

          var rowNode = table.row //.row.add( [ value["DEPE_CODIGO_PRODUCTO"], value["DESCRIPCION"], parseFloat(value["DEPE_PRECIO"]).toFixed(2), value["DEPE_CANTIDAD"], parseFloat(value["DEPE_COSTO"]).toFixed(2), parseInt(value["COD_LINEA"]), parseFloat(value["DSCTO_LINEA"]).toFixed(2), parseFloat(value["COD_MARCA"]), parseFloat(value["DSCTO_MARCA"]).toFixed(2), parseFloat(value["DEPE_PRECIO_LISTA"]).toFixed(2), value["DEPE_FECHA_ENTREGA"], '<input type="text" id="txt-observ" name="txt-observ" CssClass="txt-observ"/>']) //.row.add( [ value["DEPE_CODIGO_PRODUCTO"], value["DESCRIPCION"], 0, parseFloat(value["DEPE_PRECIO"]).toFixed(2), value["DEPE_CANTIDAD"], parseFloat(value["DEPE_COSTO"]).toFixed(2), parseFloat(value["DEPE_PRECIO_LISTA"]).toFixed(2), value["DEPE_FECHA_ENTREGA"], '<input type="text"/>'])
            .add([
              value["DEPE_CODIGO_PRODUCTO"],
              value["DESCRIPCION"],
              parseFloat(value["DEPE_PRECIO"]).toFixed(2),
              value["DEPE_CANTIDAD"],
              parseFloat(value["DEPE_COSTO"]).toFixed(2),
              parseInt(value["COD_LINEA"]),
              parseFloat(value["DSCTO_LINEA"]).toFixed(2),
              parseFloat(value["COD_MARCA"]),
              parseFloat(value["DSCTO_MARCA"]).toFixed(2),
              parseFloat(value["DEPE_PRECIO_LISTA"]).toFixed(2),
              value["DEPE_FECHA_ENTREGA"],
              '<input type="text" name="observs" id="txt-observ" CssClass="txt-observ" value="' +
                value["DEPE_CARACTER"] +
                '"/>',
            ])
            .draw()
            .node();
        });

        $("#total-items").text(parseFloat(total_items));
        $("#total-dscto").text(parseFloat(total_dscto).toFixed(2));
        $("#total-pagar").text(parseFloat(total_pagar).toFixed(2));

        $("#product-list-selected").val(list_code);

        break;
      default:
        $("#message").html(objResulSet["data"]);
        break;
    }
    alertMsg("#message");
    //console.log(objResulSet);
  }

  function setTable(dataSet) {
    $("#example1").DataTable().destroy();

    table = $("#example1").DataTable({
      retrieve: true,
      info: false,
      searching: false,
      language: {
        url: "../config/Spanish.json",
      },
      data: dataSet,
      columns: [
        { title: "Producto" },
        { title: "Descripción" },
        { title: "Cantidad" },
        { title: "Precio" },
        { title: "Stock" },
        { title: "Imagen" },
      ],
      //dom: 'Bfrtip',
      select: true,
      buttons: [
        {
          text: "<b>Crear</b>",
          action: function (e, dt, node, config) {
            console.log("New Order.js");
            $row = dt.row({ selected: true }).data();

            create_order($row[0]);
          },
          enabled: false,
          className: "feather-shopping-cart",
        },
      ],
    });

    table.on("select deselect", function () {
      var selectedRows = table.rows({ selected: true }).count();

      //table.button( 0 ).enable( true );
      //table.button( 0 ).enable( selectedRows > 0 );
      //table.button( 0 ).enable( selectedRows === 1 );
      //table.button( 3 ).enable( selectedRows > 0 );
    });
    table.draw();

    var objResulSet = json_var; //$.parseJSON(json_var);
  }

  $("input[id=product]").blur(function () {
    //e.preventDefault();
    console.log("buscando product " + $("input[id=product]").val());
    if ($("input[id=product]").val().length > 0)
      cadena = "../modules/product_list_porcentaje.php";
    else cadena = "../modules/product_list.php";

    //cadena = "../modules/product_list.php";
    $.ajax({
      url: cadena,
      type: "POST",
      data: {
        product: $("input[id=product]").val(),
        vend_codigo: $("input[id='id_vendedor']").val(),
        vend_empresa: $("input[name='id_empresa']").val(),
        client: $("input[name=client-id]").val(),
      },
      success: function (resulSet) {
        //console.log(resulSet);
        $("#product-list").html(resulSet);
      },
    });
  });

  $("input[id=productinv]").blur(function () {
    //e.preventDefault();
    cadena = "../modules/product_list_inv_1.php";
    $.ajax({
      url: cadena,
      type: "POST",
      data: {
        product: $("input[id=productinv]").val(),
        vend_codigo: $("input[id='id_vendedor']").val(),
        vend_empresa: $("input[name='id_empresa']").val(),
        client: "0",
      },
      success: function (resp) {
        //console.clear();
        //console.log(resp);

        $("#product-list").html(resp);

        /*if(resp == "No existen datos") 
            {
               console.log("empty");
            } 
            else 
            {
               tabla = resp;

               //$("#title-content").html("<h2>Nuevo Pedido</h2>");  
               //$("#product-list").html(resp);  
               console.log(resp);
         
            }*/
      },
    });

    console.log("buscando " + $("input[id=product]").val());
  });

  $("#productfind").click(function (e) {
    e.preventDefault();

    console.log("buscando " + $("input[id=product]").val());
    cadena = "../business/product.php";

    $.ajax({
      url: cadena,
      type: "POST",
      data: { product: $("input[id=product]").val() },
      success: function (resp) {
        //console.clear();
        //console.log(resp);

        $("#product-list").html(resp);
      },
    });
  });

  $("#save-items").click(function (e) {
    e.preventDefault();

    console.log("click");

    //console.log($("#table-pedido>tbody"));

    let notaVenta =
      $("input[name='notaventa']").prop("checked") == true ? "1" : "0";
    let rows = $("#table-pedido>tbody");
    let order_det = "[";

    console.log(rows);

    rows.children().each(function (e) {
      if (order_det.length > 1) order_det = order_det + ",";
      //console.log($(this).html());

      let row = $(this);
      //console.log(row.children()[1]);

      var product = row.children()[1].innerText;
      var price = parseFloat(row.children()[4].innerText);
      var qty = parseFloat(row.children()[5].innerText);
      var dscto = parseFloat(row.children()[6].innerText);
      var total = parseFloat(row.children()[7].innerText);

      //console.log(qty);
      //console.log(dscto);
      //console.log(total);

      order_det =
        order_det +
        '{"product":' +
        product +
        ', "qty":' +
        qty +
        ', "valor":' +
        total +
        ', "dscto":' +
        dscto +
        ',"price":' +
        price +
        "}";
    });

    order_det = order_det + "]";

    let order_head =
      '[{"tot_qty":' +
      $("#total-items").text() +
      ', "tot_dscto":' +
      $("#total-dscto").text() +
      ', "total":' +
      $("#total-pagar").text() +
      ', "observ": "' +
      $("input[name='pedi-observ']").val() +
      '", "notaventa": "' +
      ($("input[name='notaventa']").prop("checked") == true ? "1" : "0") +
      '"}]';

    console.log(order_head);

    cadena = "../business/order-save-detail.php";

    // $noOrder, $empresa_id, $vendedor_id, $client, $product, $qty, $valor, $dscto

    $.ajax({
      url: cadena,
      type: "POST",
      data: {
        nOrder: $("#nOrder").text(),
        vend_codigo: $("input[name='id_vendedor']").val(),
        vend_empresa: $("input[name='id_empresa']").val(),
        client: $("#client-id").text(),
        order: order_det,
        orderh: null,
        action: "update-order-aprove",
        observ: $("input[name='pedi-observ']").val(),
        notaventa:
          $("input[name='notaventa']").prop("checked") == true ? "1" : "0",
        estado: "N", //($("input[name='notaventa']").prop("checked") == true ? '1' : '0')
      },
      success: function (resp) {
        $.ajax({
          url: "../modules/order_list.php",
          type: "POST",
          data: {
            vend_codigo: $("input[name='id_vendedor']").val(),
            vend_empresa: $("input[name='id_empresa']").val(),
          },
          success: function (resp) {
            if (resp == "../") {
              window.location.href = resp;
            } else {
              $("#title-content").html("<h2>Pedidos</h2>");
              $("#content").html(resp);
            }
          },
        });
      },
    });
  });

  /*$("#save-order").click(function(e){
       e.preventDefault();

      console.log ('guardando');
      cadena = "../business/order-save.php";

      $.ajax({
         url:cadena,
         type:'POST',
         data: null,//{product:$('input[id=product]').val()},
         success: function(resp) {
            //console.clear();
            console.log(resp);

            //$("#product-list").html(resp);  
         }
      });
    });*/

  function ExportToExcel(ws_data, fn, dl) {
    //var elt = document.getElementById('tbl_exporttable_to_xls');
    //var wb = XLSX.utils.table_to_book(elt, { sheet: "PEDIDO" });
    var wb = XLSX.utils.book_new();
    wb.SheetNames.push("PEDIDOS");
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["PEDIDOS"] = ws;

    var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      "pedido.xlsx"
    );

    console.log("data export: ", ws_data);
    /*var wb = XLSX.utils.json_to_sheet(data, { sheet: "PEDIDO" });
      return dl ?
        XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'base64' }):
        XLSX.writeFile(wb, fn || ('_order.' + 'xlsx'));*/
  }

  const guardarArchivoDeTexto = (contenido, nombre) => {
    const a = document.createElement("a");
    const archivo = new Blob([contenido], { type: "text/plain" });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
  };

  function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf); //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff; //convert to octet
    return buf;
  }

  function getTagHtmlFromString(str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  }

  /*
   function editRow ( oTable, nRow )
   {
       var aData = oTable.fnGetData(nRow);
       var jqTds = $('>td', nRow);
       jqTds[0].innerHTML = '<input type="text" value="'+aData[0]+'">';
       jqTds[1].innerHTML = '<input type="text" value="'+aData[1]+'">';
       jqTds[2].innerHTML = '<input type="text" value="'+aData[2]+'">';
       jqTds[3].innerHTML = '<input type="text" value="'+aData[3]+'">';
       jqTds[4].innerHTML = '<input type="text" value="'+aData[4]+'">';
       jqTds[5].innerHTML = '[Save]()';
   }

   function saveRow ( oTable, nRow )
   {
       var jqInputs = $('input', nRow);
       oTable.fnUpdate( jqInputs[0].value, nRow, 0, false );
       oTable.fnUpdate( jqInputs[1].value, nRow, 1, false );
       oTable.fnUpdate( jqInputs[2].value, nRow, 2, false );
       oTable.fnUpdate( jqInputs[3].value, nRow, 3, false );
       oTable.fnUpdate( jqInputs[4].value, nRow, 4, false );
       oTable.fnUpdate( '[Edit]()', nRow, 5, false );
       oTable.fnDraw();
   }   
   */
});
