console.log ('updated order-view.js');

$(document).ready(function() {
   //$(".alert").alert('close');
   $("#register-alert").hide();
   $("#qty-alert").hide();
   $("#stock-alert").hide();

    /*$('#tableProduct').DataTable( {
        "paging":   false,
        "ordering": false,
        "info":     false,
        "searching": false,
        "language": {
            "url": "//localhost/language/Spanish.json"
        }
    } );*/

    setTableInit();   
   
    function setTableInit()
    {
       table = $('#tableOrder').DataTable( {
             retrieve: true,
             paging:   false,
             info:     false,
             searching: false,
             language: {
                url: "../config/Spanish.json"
             },
             columns: [
               { title: "Producto" },
               { title: "Descripción" },
               { title: "Stock" },
               { title: "Precio" },
               { title: "Cantidad" },
               { title: "Dscto" },
               { title: "Total" },
               { title: "Fecha" },
               { title: "Observ." }
            ],
             dom: 'Bfrtip',
             select: true,
             buttons: [
                   {
                      text: '<b>Guardar</b>',
                      action: function ( e, dt, node, config ) {
                         console.log ('Guardar pedido');           

                         cadena = "../business/order-save-detail.php";

                         // $noOrder, $empresa_id, $vendedor_id, $client, $product, $qty, $valor, $dscto
                   
                         $.ajax({
                            url:cadena,
                            type:'POST',
                            data: {nOrder:$("#nOrder").text(),
                                   vend_codigo:$("input[name='id_vendedor']").val(),
                                   vend_empresa:$("input[name='id_empresa']").val(),
                                   client:$("#client-id").text(),
                                   order: null,
                                   orderh: null,
                                   action: "update-order"
                               },
                            success: function(resp) {
                                $.ajax({
                                   url:'../modules/order_list.php',
                                   type:'POST',
                                   data: {vend_codigo:$("input[name='id_vendedor']").val(),
                                       vend_empresa:$("input[name='id_empresa']").val()},
                                   success: function(resp) {  
                                      if(resp == "../") 
                                      {
                                      window.location.href= resp;
                                      } 
                                      else 
                                      {
                                      $("#title-content").html("<h2>Pedidos</h2>");  
                                      $("#content").html(resp);  
                   
                                      }
                                   }
                              });                                                    
                            }
                         });                         

                     },                     
                      enabled: true,
                      className: 'feather-trash-2'
                   }                   
             ]               
        });
 
        table.on( 'select deselect', function () {
            var selectedRows = table.rows( { selected: true } ).count();
     
            //table.button( 0 ).enable( true );
            table.button( 1 ).enable( selectedRows > 0 );
            //table.button( 0 ).enable( selectedRows === 1 );
            //table.button( 3 ).enable( selectedRows > 0 );
 
        });
        //table.cells( null, 7 ).edit();        

        //console.log(json_var);
        var objResulSet = json_var;//$.parseJSON(json_var);
        //console.log(objResulSet);
        switch (objResulSet["error"])
        {
            case 0:
                $("#message").html("Productos añadidos a la canasta.");

                var row = objResulSet["data"];
                //console.log(row[0]);
                var list_code = $("#product-list-selected").val();
                
                $.each( row, function( key, value ) {
                  console.log( value );
                  if (list_code.length > 0) list_code =  list_code + "," + value["DEPE_CODIGO_PRODUCTO"];
                  else list_code =  value["DEPE_CODIGO_PRODUCTO"];

                  var rowNode = table
                     .row.add( [ value["DEPE_CODIGO_PRODUCTO"], value["DESCRIPCION"], 0, parseFloat(value["DEPE_PRECIO"]).toFixed(2), value["DEPE_CANTIDAD"], parseFloat(value["DEPE_COSTO"]).toFixed(2), parseFloat(value["DEPE_PRECIO_LISTA"]).toFixed(2), value["DEPE_FECHA_ENTREGA"], '<input type="text"/>'])
                     .draw()
                     .node();
               });           

               $("#product-list-selected").val(list_code);                  

                  
                break;
            default:
                $("#message").html(objResulSet["data"]);
                break;

        }                                       
        alertMsg("#message");
        //console.log(objResulSet);

   }
 
    function setTable(dataSet)
    {
       $('#example1').DataTable().destroy();
 
       table = $('#example1').DataTable( {
             retrieve: true,
             info:     false,
             searching: false,
             language: {
                url: "../config/Spanish.json"
             },
             data: dataSet,
             columns: [
                { title: "Producto" },
                { title: "Descripción" },
                { title: "Cantidad" },
                { title: "Precio" },
                { title: "Stock" },
                { title: "Imagen" }
             ],
             //dom: 'Bfrtip',
             select: true,
             buttons: [
                   {
                      text: '<b>Crear</b>',
                      action: function ( e, dt, node, config ) {
                         console.log ('New Order.js');
                         $row = dt.row( { selected: true } ).data()
 
                         create_order($row[0]);
                      },
                      enabled: false,
                      className: 'feather-shopping-cart'
                   }
             ]                
        });
 
        table.on( 'select deselect', function () {
            var selectedRows = table.rows( { selected: true } ).count();
     
            //table.button( 0 ).enable( true );
            //table.button( 0 ).enable( selectedRows > 0 );
            table.button( 0 ).enable( selectedRows === 1 );
            //table.button( 3 ).enable( selectedRows > 0 );
 
        } );        
        table.draw();
    }    
    
   $('input[id=product]').blur(function(){
       //e.preventDefault();
      console.log ('buscando product ' + $("input[id=product]").val());       
      if (($('input[id=product]').val()).length > 0) 
        cadena = "../modules/product_list_porcentaje.php";
      else      
        cadena = "../modules/product_list.php";

      //cadena = "../modules/product_list.php";
      $.ajax({
         url:cadena,
         type:'POST',
         data: {product:$('input[id=product]').val(),
                vend_codigo:$("input[id='id_vendedor']").val(),
                vend_empresa:$("input[name='id_empresa']").val(),
                client:$("input[name=client-id]").val()},
         success: function(resulSet) {
            //console.log(resulSet);
            $("#product-list").html(resulSet);                                        
         }
      });      



   });


   $('input[id=productinv]').blur(function(){
       //e.preventDefault();
      cadena = "../modules/product_list_inv_1.php";
      $.ajax({
         url:cadena,
         type:'POST',
         data: {product:$('input[id=productinv]').val(),
                vend_codigo:$("input[id='id_vendedor']").val(),
                vend_empresa:$("input[name='id_empresa']").val(),
                client:'0'},
         success: function(resp) {
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
         }
      });      


      console.log ('buscando ' + $('input[id=product]').val());       

   });

   $("#productfind").click(function(e){
       e.preventDefault();

      console.log ('buscando ' + $('input[id=product]').val());
      cadena = "../business/product.php";

      $.ajax({
         url:cadena,
         type:'POST',
         data: {product:$('input[id=product]').val()},
         success: function(resp) {
            //console.clear();
            //console.log(resp);

            $("#product-list").html(resp);  
         }
      });      
    });


   $("#save-items").click(function(e){
       e.preventDefault();

       console.log('click');

       //console.log($("#table-pedido>tbody"));

       let rows = $("#table-pedido>tbody");
       let order_det = "[";

       console.log(rows);

        rows.children().each(function(e){
            if (order_det.length > 1) order_det = order_det + ','
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

            order_det = order_det + '{"product":'+product+', "qty":'+qty+', "valor":'+total+', "dscto":'+dscto+',"price":'+price+'}';

        })

       order_det = order_det + "]";

       let order_head = '[{"tot_qty":'+$("#total-items").text()+', "tot_dscto":'+$("#total-dscto").text()+', "total":'+$("#total-pagar").text()+'}]';

            console.log(order_head);

      cadena = "../business/order-save-detail.php";

      // $noOrder, $empresa_id, $vendedor_id, $client, $product, $qty, $valor, $dscto

      $.ajax({
         url:cadena,
         type:'POST',
         data: {nOrder:$("#nOrder").text(),
                vend_codigo:$("input[name='id_vendedor']").val(),
                vend_empresa:$("input[name='id_empresa']").val(),
                client:$("#client-id").text(),
                order: order_det,
                orderh: order_head
            },
         success: function(resp) {
             $.ajax({
                url:'../modules/order_list.php',
                type:'POST',
                data: {vend_codigo:$("input[name='id_vendedor']").val(),
                    vend_empresa:$("input[name='id_empresa']").val()},
                success: function(resp) {
                   if(resp == "../") 
                   {
                   window.location.href= resp;
                   } 
                   else 
                   {
                   $("#title-content").html("<h2>Pedidos</h2>");  
                   $("#content").html(resp);  

                   }
                }
             });



         }
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

});
