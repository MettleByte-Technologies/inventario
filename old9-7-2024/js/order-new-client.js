   console.log ('new  order-new-client.js');

$(document).ready(function() {
   setTableInit();   
   
   function setTableInit()
   {
      table = $('#example1').DataTable( {
            retrieve: true,
            info:     false,
            searching: false,
            language: {
               url: "../config/Spanish.json"
            },
            columns: [
               { title: "Código" },
               { title: "Regional" },
               { title: "RUC" },
               { title: "Zona" },
               { title: "Razón Social" },
               { title: "Dirección" },
               { title: "Propietario" },
               { title: "Cupo" },
               { title: "Teléfono" },
               { title: "Forma de Pago" },
               { title: "Localidad" }
            ],
            dom: 'Bfrtip',
            select: true,
            buttons: [
                  {
                     text: '<b>Crear</b>',
                     action: function ( e, dt, node, config ) {
                        console.log ('New Order.js');           
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
               { title: "Código" },
               { title: "Regional" },
               { title: "RUC" },
               { title: "Zona" },
               { title: "Razón Social" },
               { title: "Dirección" },
               { title: "Propietario" },
               { title: "Cupo" },
               { title: "Teléfono" },
               { title: "Forma de Pago" },
               { title: "Localidad" }
            ],
            dom: 'Bfrtip',
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

   $('input[id=client]').blur(function(){
      cadena = "../modules/client_list_order.php";

      $("#client-id").val("null");
      $("#next-head").attr('disabled', true);
      $("#next-footer").attr('disabled', true);

      $.ajax({
            url:cadena,
            type:'POST',
            data: {vend_codigo:$("input[name='id_vendedor']").val(),
                     vend_empresa:$("input[name='id_empresa']").val(),
                     client:$('input[id=client]').val()},
            success: function(resulSet) {
               console.log(resulSet);
               var objResulSet = $.parseJSON(resulSet);
               switch (objResulSet["error"])
               {
                     case 0:
                        objResulSet = JsonToArray(objResulSet["data"]);
                        for(var i in objResulSet){                            
                           objResulSet [i] = rowJsonToArray(objResulSet [i]);
                        }

                        var dataSet = objResulSet;                 

                        setTable(dataSet);                        
                        break;
                     default:
                        $("#message").html(objResulSet["data"]);
                        alertMsg("#message");
                        break;

               }

            }
      });      

     console.log ('buscando ' + $('input[id=client]').val());       

   });

   function create_order(clientId){
      console.log ('codigo ==> ' + clientId);
       cadena = "../business/order-save.php";

      $.ajax({
         url:cadena,
         type:'POST',
         data: {vend_codigo:$("input[name='id_vendedor']").val(),
                vend_empresa:$("input[name='id_empresa']").val(),
                client:clientId},
         success: function(resulSet) {
            var objResulSet = $.parseJSON(resulSet);
            //console.log(objResulSet["data"][0]["nOrder"]);
            var nOrder = objResulSet["data"][0]["nOrder"]

            switch (objResulSet["error"])
            {
                case 0:
                     form_order(nOrder, clientId);                                  
                    break;
                default:
                    $("#message").html(objResulSet["data"]);
                    alertMsg("#message");
                    break;
            }            
         }
      });   
   }

   function form_order(order_id, clientId){
      console.log("order #"+ order_id);
      console.log("vend_codigo " + $("input[name='id_vendedor']").val());
      console.log("vend_empresa" + $("input[name='id_empresa']").val());
      console.log("clientId "+ clientId);
       cadena = "../modules/order-new.php";

      $.ajax({
         url:cadena,
         type:'POST',
         data: {vend_codigo:$("input[name='id_vendedor']").val(),
                vend_empresa:$("input[name='id_empresa']").val(),
                client:clientId,
                order:order_id},//$("#next-footer").val()},
         success: function(resulSet) {
            //console.log(resulSet);
            $("#title-content").html("</br>");  
            $("#content").html(resulSet);  

            ///var objResulSet = $.parseJSON(resulSet);
            //console.log(objResulSet["data"][0]["nOrder"]);
            //var nOrder = objResulSet["data"][0]["nOrder"]

            /*switch (objResulSet["error"])
            {
                  case 0:
                     $("#title-content").html("</br>");  
                     $("#content").html(resp);  
                     break;
                  default:
                     $("#message").html(objResulSet["data"]);
                     alertMsg("#message");
                     break;
            }*/            
         }
      });   
   }



});

/*$(document).ready(function() {
    $('#findclient').DataTable( {
        "ordering": false,
        "info":     false,
        "searching": false,
        "language": {
            "url": "//localhost/language/Spanish.json"
        }   
    } );

    
   console.log ('datatables format language');
} );*/

