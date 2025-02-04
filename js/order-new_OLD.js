console.log ('updated order-new.js');

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
                         console.log ('Guardar pedido new');           

                         cadena = "../business/order-save-detail.php";

                         // $noOrder, $empresa_id, $vendedor_id, $client, $product, $qty, $valor, $dscto

/*********** Guardar Observaciones ************************** */
let rowsT = $("#tableOrder>tbody");
let order_det = "[";

//console.log(rowsT);

 rowsT.children().each(function(e){
     if (order_det.length > 1) order_det = order_det + ','
     console.log($(this).html());

     var newporc = $(this).find('#txt-observ').val();
     //console.log(valorporc);

     //let row = $(this);


     //console.log(row.children()[1]);


     var product = $(this).children()[0].innerText;
     //var valorporc = row.children()[1].innerText;
     /*var price = parseFloat(row.children()[4].innerText);
     var qty = parseFloat(row.children()[5].innerText);
     var dscto = parseFloat(row.children()[6].innerText);
     var total = parseFloat(row.children()[7].innerText);*/

     //console.log(qty);
     //console.log(dscto);
     //console.log(total);

     order_det = order_det + '{"product":'+product+', "newporc":'+newporc+'}';

     //console.log(order_det);

 })
 order_det += "]";
 console.log(order_det);

 //console.log('orden: ' + $("#nOrder").val());
 //console.log($('vendedor: ' + "input[name='id_vendedor']").val());
 //console.log($('empresa' + "input[name='id_empresa']").val());
 //console.log('cliente: ' + $("#client-id").val());
 
 /************************************ */                         

                         $.ajax({
                            url:cadena,
                            type:'POST',
                            data: {nOrder:$("#nOrder").val(),
                                   vend_codigo:0,//$("input[name='id_vendedor']").val(),
                                   vend_empresa:0,//$("input[name='id_empresa']").val(),
                                   client:$("#client-id").val(),
                                   order: order_det,
                                   orderh: null,
                                   action: "update-order",
                                   observ: $("input[name='pedi-observ']").val(),
                                   notaventa: ($("input[name='notaventa']").prop("checked") == true ? '1' : '0')
                               },
                            success: function(resp) {
                                console.log(resp);
                                $.ajax({
                                   url:'../modules/order_list.php',
                                   type:'POST',
                                   data: {vend_codigo:$("input[name='id_vendedor']").val(),
                                       vend_empresa:$("input[name='id_empresa']").val(),
                                       estado: '%'},
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
                   },
                   {
                     text: '<b>Eliminar</b>',
                     action: function ( e, dt, node, config ) {
                         /*alert(
                             'Row data: '+
                             JSON.stringify( dt.row( { selected: true } ).data() )
                         );*/
                         console.log ('Delete Item');
                                         
                         var rows = dt.rows( { selected: true } ).data();
                         var itemsList = "";
                         var itemsListCode = "";

                         total_items = parseInt($("#total-items").text());
                         total_dscto = parseFloat($("#total-dscto").text());
                         total_pagar = parseFloat($("#total-pagar").text());

                         for (let i = 0; i < rows.length; i++) {
                             if (itemsList.length > 0) {
                                 itemsList += ",";
                                 itemsListCode += ",";
                             }
                             itemsList += rows[i][1];                                                     
                             itemsListCode += rows[i][0];                        

                             total_items = parseInt(total_items) - parseInt(rows[i][4]);
                             total_dscto = parseFloat(total_dscto) - parseFloat(rows[i][5]);
                             total_pagar = parseFloat(total_pagar) - parseFloat(rows[i][6]);
                        }                 
 
                         $.ajax({
                             url:'../business/order.php',
                             type:'POST',
                             data: {action:"delete-item",
                                 vend_codigo:$("input[name='id_vendedor']").val(),
                                 vend_empresa:$("input[name='id_empresa']").val(),
                                 delorders: itemsListCode,
                                 nOrder:$("#nOrder").text()
                              },
                             success: function(resulSet) {
                                 var objResulSet = $.parseJSON(resulSet);
                                 switch (objResulSet["error"])
                                 {
                                     case 0:
                                         var nitems = itemsList.split(',').length;
 
                                         if (nitems > 1)
                                             $("#message").html("Items " + itemsList + " fueron actualizados");
                                         else
                                             $("#message").html("Item " + itemsList + " fue actualizado");
 
                                         alertMsg("#message");                                                        

                                         dt.rows( { selected: true } ).remove();

                                         table.draw();

                                         $("#total-items").text(parseFloat(total_items));     
                                         $("#total-dscto").text(parseFloat(total_dscto).toFixed(2));     
                                         $("#total-pagar").text(parseFloat(total_pagar).toFixed(2));     
                                              
                                         //rowsDel.remove( );                                         


                                         /*$.ajax({
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
                                          });*/                                        
 
                                         break;
                                     default:
                                         $("#message").html(objResulSet["data"]);
                                         alertMsg("#message");
                                         break;
                 
                                 }
                             }
                         });


                     },
                     enabled: false,
                     className: 'feather-upload-cloud'
                 },
 
             ]               
        });
 
        table.on( 'select deselect', function () {
            var selectedRows = table.rows( { selected: true } ).count();
     
            //table.button( 0 ).enable( true );
            table.button( 1 ).enable( selectedRows > 0 );
            //table.button( 0 ).enable( selectedRows === 1 );
            //table.button( 3 ).enable( selectedRows > 0 );
 
        } );        
        //table.draw();
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
