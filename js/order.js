console.log ('Order List');

$(document).ready(function() {
    //$("#message").hide();


    $('#tableMonthly').show();
    $('#tableOld').hide();    
    estado_btn = ($("#rol_id").val() == "2" && $("input[name='data-estado']").val() == "A");
    
    getOrderList(false);

    function setTable(dataSet)
    {
        if (estado_btn) // es rol 2 - vendedor
            table = $('#example1').DataTable( {
                retrieve: true,
                info:     false,
                searching: false,
                //paging:   true,
                "pagingType": "full_numbers",
                language: {
                    url: "../config/Spanish.json"
                },
                data: dataSet,
                order: [[ 1, 'desc' ]], 
                columns: [
                    { title: "Empresa" },
                    { title: "Pedido" },
                    { title: "Codigo Vend." },
                    { title: "Vendedor" },
                    { title: "Codigo Clie." },
                    { title: "Cliente" },
                    { title: "Fecha Registro" },
                    { title: "Estado" },
					{ title: "Exportada" }
                ],
				'columnDefs': [
					{
						"targets": 8, // your case first column
						"className": "text-center"
				   }
				 ],
                //order: [[7, 'desc']],
                dom: 'Bfrtip',
                select: true,
                buttons: [
                    {
                        text: '<b>Nuevo</b>',
                        action: function ( e, dt, node, config ) {
                            console.log ('New Order.js');
                            cadena = "../modules/order-new-client.php";
                    
                        $.ajax({
                            url:cadena,
                            type:'POST',
                            data: null,
                            success: function(resp) {
                                if(resp == "../") 
                                {
                                    window.location.href= resp;
                                } 
                                else 
                                {
                                $("#title-content").html("<h2>Seleccionar Cliente</h2>");  
                                $("#content").html(resp);  

                                $("input[id='client']").trigger("focus");

                                }
                            }
                        });                 
                        },
                        enabled: true,
                        className: 'feather-shopping-cart'
                    }             
                ]                
            });
        else
            table = $('#example1').DataTable( {
                retrieve: true,
                info:     false,
                searching: false,
                //paging:   true,
                "pagingType": "full_numbers",
                language: {
                    url: "../config/Spanish.json"
                },
                data: dataSet,
                order: [[ 1, 'desc' ]], 
                columns: [
                    { title: "Empresa" },
                    { title: "Pedido" },
                    { title: "Codigo Vend." },
                    { title: "Vendedor" },
                    { title: "Codigo Clie." },
                    { title: "Cliente" },
                    { title: "Fecha Registro" },
                    { title: "Estado" },
					{ title: "Exportada" }
                ],
				'columnDefs': [
					{
						"targets": 8, // your case first column
						"className": "text-center"
				   }
				 ],
                //order: [[7, 'desc']],
                dom: 'Bfrtip',
                select: true,
                buttons: [
                    {
                        text: '<b>Nuevo</b>',
                        action: function ( e, dt, node, config ) {
                            console.log ('New Order.js');
                            cadena = "../modules/order-new-client.php";
                    
                        $.ajax({
                            url:cadena,
                            type:'POST',
                            data: null,
                            success: function(resp) {
                                if(resp == "../") 
                                {
                                    window.location.href= resp;
                                } 
                                else 
                                {
                                $("#title-content").html("<h2>Seleccionar Cliente</h2>");  
                                $("#content").html(resp);  

                                $("input[id='client']").trigger("focus");
    
                                }
                            }
                        });                 
                        },
                        enabled: true,
                        className: 'feather-shopping-cart'
                    },
                    {
                        text: '<b>Enviar</b>',
                        action: function ( e, dt, node, config ) {
                            /*alert(
                                'Row data: '+
                                JSON.stringify( dt.row( { selected: true } ).data() )
                            );*/
                            rows = dt.rows( { selected: true } ).data()

                            var itemsList = "";

                            for (let i = 0; i < rows.length; i++) {
                                if (itemsList.length > 0) itemsList += ",";
                                itemsList += rows[i][1];                        
                            }                   
                            
                            console.log(itemsList);

                            $.ajax({
                                url:'../business/order.php',
                                type:'POST',
                                data: {action:"sent-order",
                                    vend_codigo:$("input[name='id_vendedor']").val(),
                                    vend_empresa:$("input[name='id_empresa']").val(),
                                    sentorders: itemsList
                                },
                                success: function(resulSet) {
                                    var objResulSet = $.parseJSON(resulSet);
                                    switch (objResulSet["error"])
                                    {
                                        case 0:
                                            var nitems = itemsList.split(',').length;

                                            if (nitems > 1)
                                                $("#message").html("Pedidos " + itemsList + " fueron actualizados");
                                            else
                                                $("#message").html("Pedido " + itemsList + " fue actualizado");

                                            alertMsg("#message");                                                        
                                            
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
                                            
                                            //$("#content").html('');
                                            //getOrderList();

                                            break;
                                        default:
                                            $("#message").html(objResulSet["data"]);
                                            alertMsg("#message");
                                            break;
                    
                                    }
                                }
                            });


                            if (rows.length > 1)
                                $("#message").html("Pedidos fueron enviados");
                            else
                                $("#message").html("Pedido fue enviado");

                            //alertMsg("#message");                                                        


                        },
                        enabled: false,
                        className: 'feather-upload-cloud'
                    },
                    {
                        text: '<b>Editar</b>',
                        action: function ( e, dt, node, config ) {
                            /*alert(
                                'Row data: '+
                                JSON.stringify( dt.row( { selected: true } ).data() )
                            );*/
                            $row = dt.row( { selected: true } ).data()
                            form_order($row[1], $row[0], $row[2], $row[4], 1);

                        },
                        enabled: false,
                        className: 'feather-edit-2'
                    },
                    {
                        text: '<b>Eliminar</b>',
                        action: function ( e, dt, node, config ) {
                            console.log ('Delete Order');
                                            
                            var rows = dt.rows( { selected: true } ).data();
                            var itemsList = "";

                            for (let i = 0; i < rows.length; i++) {
                                if (itemsList.length > 0) itemsList += ",";
                                itemsList += rows[i][1];                        
                            }                 

                            $.ajax({
                                url:'../business/order.php',
                                type:'POST',
                                data: {action:"delete-order",
                                    vend_codigo:$("input[name='id_vendedor']").val(),
                                    vend_empresa:$("input[name='id_empresa']").val(),
                                    delorders: itemsList},
                                success: function(resulSet) {
                                    var objResulSet = $.parseJSON(resulSet);
                                    switch (objResulSet["error"])
                                    {
                                        case 0:
                                            var nitems = itemsList.split(',').length;

                                            if (nitems > 1)
                                                $("#message").html("Pedidos " + itemsList + " fueron actualizados");
                                            else
                                                $("#message").html("Pedido " + itemsList + " fue actualizado");

                                            alertMsg("#message");                                                        
                                            
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
                        className: 'feather-trash-2'
                    },
                    {
                        text: '<b>Ver Orden</b>',
                        action: function ( e, dt, node, config ) {
                            /*alert(
                                'Row data: '+
                                JSON.stringify( dt.row( { selected: true } ).data() )
                            );*/
                            $row = dt.row( { selected: true } ).data()
                            form_order($row[1], $row[0], $row[2], $row[4], 2);

                        },
                        enabled: false,
                        className: 'feather-edit-2'
                    }                
                ]                
            });

        table.on( 'select deselect', function () {
            var selectedRows = table.rows( { selected: true } ).count();
     
            //table.button( 0 ).enable( true );
            table.button( 1 ).enable( selectedRows > 0 );           
            table.button( 2 ).enable( selectedRows === 1 );
            table.button( 3 ).enable( selectedRows > 0 );
            table.button( 4 ).enable( selectedRows === 1 );  

        } );        

        table.draw();
    }

    function setTableOld(dataSet)
    {
        tableOld = $('#example2').DataTable( {
            retrieve: true,
            info:     false,
            searching: false,
            //paging:   true,
            "pagingType": "full_numbers",
            language: {
                url: "../config/Spanish.json"
            },
            data: dataSet,
            order: [[ 1, 'desc' ]], 
            columns: [
                { title: "Empresa" },
                { title: "Pedido" },
                { title: "Codigo Vend." },
                { title: "Vendedor" },
                { title: "Codigo Clie." },
                { title: "Cliente" },
                { title: "Fecha Registro" },
                { title: "Estado" },
				{ title: "Exportada" }
            ],
            //order: [[7, 'desc']],
            dom: 'Bfrtip',
            select: true,
            buttons: [
                {
                    text: '<b>Nuevo</b>',
                    action: function ( e, dt, node, config ) {
                        console.log ('New Order.js');
                        cadena = "../modules/order-new-client.php";
                 
                       $.ajax({
                          url:cadena,
                          type:'POST',
                          data: null,
                          success: function(resp) {
                             if(resp == "../") 
                             {
                                window.location.href= resp;
                             } 
                             else 
                             {
                             $("#title-content").html("<h2>Seleccionar Cliente</h2>");  
                             $("#content").html(resp);  

                             $("input[id='client']").trigger("focus");
   
                             }
                          }
                       });                 
                    },
                    enabled: true,
                    className: 'feather-shopping-cart'
                },
                {
                    text: '<b>Enviar</b>',
                    action: function ( e, dt, node, config ) {
                        /*alert(
                            'Row data: '+
                            JSON.stringify( dt.row( { selected: true } ).data() )
                        );*/
                        rows = dt.rows( { selected: true } ).data()

                        var itemsList = "";

                        for (let i = 0; i < rows.length; i++) {
                            if (itemsList.length > 0) itemsList += ",";
                            itemsList += rows[i][1];                        
                        }                   
                        
                        console.log(itemsList);

                        $.ajax({
                            url:'../business/order.php',
                            type:'POST',
                            data: {action:"sent-order",
                                vend_codigo:$("input[name='id_vendedor']").val(),
                                vend_empresa:$("input[name='id_empresa']").val(),
                                sentorders: itemsList
                            },
                            success: function(resulSet) {
                                var objResulSet = $.parseJSON(resulSet);
                                switch (objResulSet["error"])
                                {
                                    case 0:
                                        var nitems = itemsList.split(',').length;

                                        if (nitems > 1)
                                            $("#message").html("Pedidos " + itemsList + " fueron actualizados");
                                        else
                                            $("#message").html("Pedido " + itemsList + " fue actualizado");

                                        alertMsg("#message");                                                        
                                        
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
                                         
                                         //$("#content").html('');
                                         //getOrderList();

                                        break;
                                    default:
                                        $("#message").html(objResulSet["data"]);
                                        alertMsg("#message");
                                        break;
                
                                }
                            }
                        });


                        if (rows.length > 1)
                            $("#message").html("Pedidos fueron enviados");
                        else
                            $("#message").html("Pedido fue enviado");

                        //alertMsg("#message");                                                        


                    },
                    enabled: false,
                    className: 'feather-upload-cloud'
                },
                {
                    text: '<b>Editar</b>',
                    action: function ( e, dt, node, config ) {
                        /*alert(
                            'Row data: '+
                            JSON.stringify( dt.row( { selected: true } ).data() )
                        );*/
                        $row = dt.row( { selected: true } ).data()
                        form_order($row[1], $row[0], $row[2], $row[4], 1);

                    },
                    enabled: false,
                    className: 'feather-edit-2'
                },
                {
                    text: '<b>Eliminar</b>',
                    action: function ( e, dt, node, config ) {
                        console.log ('Delete Order');
                                         
                        var rows = dt.rows( { selected: true } ).data();
                        var itemsList = "";

                        for (let i = 0; i < rows.length; i++) {
                            if (itemsList.length > 0) itemsList += ",";
                            itemsList += rows[i][1];                        
                        }                 

                        $.ajax({
                            url:'../business/order.php',
                            type:'POST',
                            data: {action:"delete-order",
                                vend_codigo:$("input[name='id_vendedor']").val(),
                                vend_empresa:$("input[name='id_empresa']").val(),
                                delorders: itemsList},
                            success: function(resulSet) {
                                var objResulSet = $.parseJSON(resulSet);
                                switch (objResulSet["error"])
                                {
                                    case 0:
                                        var nitems = itemsList.split(',').length;

                                        if (nitems > 1)
                                            $("#message").html("Pedidos " + itemsList + " fueron actualizados");
                                        else
                                            $("#message").html("Pedido " + itemsList + " fue actualizado");

                                        alertMsg("#message");                                                        
                                        
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
                    className: 'feather-trash-2'
                },
                {
                    text: '<b>Ver Orden</b>',
                    action: function ( e, dt, node, config ) {
                        /*alert(
                            'Row data: '+
                            JSON.stringify( dt.row( { selected: true } ).data() )
                        );*/
                        $row = dt.row( { selected: true } ).data()
                        form_order($row[1], $row[0], $row[2], $row[4], 2);

                    },
                    enabled: false,
                    className: 'feather-edit-2'
                }                
            ]                
        });

        tableOld.on( 'select deselect', function () {
            var selectedRows = tableOld.rows( { selected: true } ).count();
     
            //table.button( 0 ).enable( true );
            tableOld.button( 1 ).enable( selectedRows > 0 );
            tableOld.button( 2 ).enable( selectedRows === 1 );
            tableOld.button( 3 ).enable( selectedRows > 0 );
            tableOld.button( 4 ).enable( selectedRows === 1 );

        } );        

        table.draw();
    }

    function setTableInit(tablename)
    {
        table = $(tablename).DataTable( {
            retrieve: true,
            info:     false,
            searching: false,
            //paging:   true,
            language: {
                url: "../config/Spanish.json"
            },
            columns: [
                { title: "Empresa" },
                { title: "Pedido" },
                { title: "Codigo" },
                { title: "Vendedor" },
                { title: "Codigo" },
                { title: "Cliente" },
                { title: "Fecha Registro" },
                { title: "Estado" }
            ],
            dom: 'Bfrtip',
            select: true,
            buttons: [
                {
                    text: '<b>Nuevo</b>',
                    action: function ( e, dt, node, config ) {
                        console.log ('New Order.js');
                        cadena = "../modules/order-new-client.php";
                 
                       $.ajax({
                          url:cadena,
                          type:'POST',
                          data: null,
                          success: function(resp) {
                             if(resp == "../") 
                             {
                                window.location.href= resp;
                             } 
                             else 
                             {
                             $("#title-content").html("<h2>Seleccionar Cliente</h2>");  
                             $("#content").html(resp);  
                 
                             }
                          }
                       });                 
                    },
                    enabled: true,
                    className: 'feather-shopping-cart'
                },
                {
                    text: '<b>Enviar</b>',
                    action: function ( e, dt, node, config ) {
                        alert(
                            'Row data: '+
                            JSON.stringify( dt.row( { selected: true } ).data() )
                        );
                    },
                    enabled: false,
                    className: 'feather-upload-cloud'
                },
                {
                    text: '<b>Editar</b>',
                    action: function ( e, dt, node, config ) {
                        alert(
                            'Row data: '+
                            JSON.stringify( dt.row( { selected: true } ).data() )
                        );
                    },
                    enabled: false,
                    className: 'feather-edit-2'
                },
                {
                    text: '<b>Eliminar</b>',
                    action: function ( e, dt, node, config ) {
                        console.log ('Delete Order');                                        
                    },
                    enabled: false,
                    className: 'feather-trash-2'
                }
            ]                
        });

        table.on( 'select deselect', function () {
            var selectedRows = table.rows( { selected: true } ).count();
     
            //table.button( 0 ).enable( true );
            table.button( 1 ).enable( selectedRows > 0 );
            table.button( 2 ).enable( selectedRows === 1 );
            table.button( 3 ).enable( selectedRows > 0 );
            table.button( 4 ).enable( selectedRows === 1 );

        } );        

    }
    

    
    function getOrderList(getAll){
        cadena = "../business/order.php";    
        console.log($("input[name='data-estado']").val());

        action = "selectArray";        

        $.ajax({
            url:cadena,
            type:'POST',
            data: { action: action,
                    vend_codigo:$("input[name='id_vendedor']").val(),
                    vend_empresa:$("input[name='id_empresa']").val(),
                    estado: $("input[name='data-estado']").val()},
            success: function(resulSet) {
                //console.log(resulSet);
                var objResulSet = $.parseJSON(resulSet);
                switch (objResulSet["error"])
                {
                    case 0:
                        objResulSet = JsonToArray(objResulSet["data"]);
                        for(var i in objResulSet){                            
                            objResulSet [i] = rowJsonToArray(objResulSet [i]);
                        }
                        
                        var dataSet = objResulSet;

                        //console.log(dataSet);
                        
                        //if (getAll == false) {
                            //console.log('1 mes');
                            setTable(dataSet);   
                            //setTableInit('#example2');
                        /*}                        
                        else  
                        {
                            console.log('anteriores');
                            setTableOld(dataSet);   
                            setTableInit('#example1');                        
                        }*/
                                             
                        break;
                    case 1000:
                        setTableInit('#example1');
                        break;
                    default:
                        $("#message").html(objResulSet["data"]);
                        alertMsg("#message");
                        break;
    
                }
    
            }
        })   

        action = "selectArrayOld";

        $.ajax({
            url:cadena,
            type:'POST',
            data: { action: action,
                    vend_codigo:$("input[name='id_vendedor']").val(),
                    vend_empresa:$("input[name='id_empresa']").val(),
                    estado: $("input[name='data-estado']").val()},
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

                        //console.log(dataSet);                        
                            console.log('anteriores');
                            setTableOld(dataSet);   
                                             
                        break;
                    case 1000:
                        setTableInit('#example1');
                        break;
                    default:
                        $("#message").html(objResulSet["data"]);
                        alertMsg("#message");
                        break;
    
                }
    
            }
        })           
    }

    function form_order(order_id, empresaId, vendedorId, clientId, type_form){
        console.log("order #"+ order_id);
        console.log("vend_codigo " + vendedorId);//$("input[name='id_vendedor']").val());
        console.log("vend_empresa" + empresaId);//$("input[name='id_empresa']").val());
        console.log("clientId "+ clientId);
        if (type_form == 1) 
            cadena = "../modules/order-edit.php";
        else 
            cadena = "../modules/order-view.php";
  
  
        $.ajax({
           url:cadena,
           type:'POST',
           data: {vend_codigo:vendedorId,//$("input[name='id_vendedor']").val(),
                  vend_empresa:empresaId,//$("input[name='id_empresa']").val(),
                  client:clientId,
                  order:order_id,
                  estado: $("input[name='data-estado']").val()},//$("#next-footer").val()},
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

    /*--- edit Order with discount ---*/
    $(".csdiscount").click(function(e){
        e.preventDefault();
        var row = ($(this).parent()).parent();
        console.log (row.children()[3].innerText);

        cadena = "../modules/order-edit-discount.php";

        $.ajax({
            url:cadena,
            type:'POST',
            data: {vend_codigo:$("input[name='id_vendedor']").val(),
                    vend_empresa:$("input[name='id_empresa']").val(),
                    nOrder:row.children()[3].innerText,
                    client:row.children()[4].innerText
                },
            success: function(resp) {
                if(resp == "../") 
                {
                    window.location.href= resp;
                } 
                else 
                {
                $("#title-content").html("<h2>Ver Pedido</h2>");  
                $("#content").html(resp);  

                }
            }
        });
    });

   /*--- edit Order ---*/
   $(".csEdit").click(function(e){
       e.preventDefault();
       var row = ($(this).parent()).parent().parent();
       console.log (row.children()[3].innerText);

       cadena = "../modules/order-edit.php";

      $.ajax({
         url:cadena,
         type:'POST',
         data: {vend_codigo:$("input[name='id_vendedor']").val(),
                vend_empresa:$("input[name='id_empresa']").val(),
                nOrder:row.children()[3].innerText,
                client:row.children()[4].innerText
            },
         success: function(resp) {
            if(resp == "../") 
            {
               window.location.href= resp;
            } 
            else 
            {
            $("#title-content").html("<h2>Ver Pedido</h2>");  
            $("#content").html(resp);  

            }
         }
      });
    });
    
   $("#delO").click(function(e){
       console.log ('delete order');
       e.preventDefault();

       var itemsList = "";

        $.each($('tbody input'),function(idx,item){
            if(item.checked == true){
                var row = item.parentNode.parentNode.parentNode.children[3].innerText;
                item.parentNode.parentNode.parentNode.remove();

                if (itemsList.length > 0) itemsList += ",";
                itemsList += row;
            }
        })

        $.ajax({
            url:'../business/order.php',
            type:'POST',
            data: {action:"delete-order",
                   vend_codigo:$("input[name='id_vendedor']").val(),
                   vend_empresa:$("input[name='id_empresa']").val(),
                   delorders: itemsList},
            success: function(resulSet) {
                var objResulSet = $.parseJSON(resulSet);
                switch (objResulSet["error"])
                {
                    case 0:
                        objResulSet = JsonToArray(objResulSet["data"]);
                        for(var i in objResulSet){                            
                            objResulSet [i] = rowJsonToArray(objResulSet [i]);
                        }
                        
                        var dataSet = objResulSet;
                        
                        instaceTableOrderList(dataSet);
                        $("#message").html("Pedidos " + itemsList + " fuer(on) actualizado(s)");
                        alertMsg("#message");
        
                        break;
                    default:
                        $("#message").html(objResulSet["data"]);
                        alertMsg("#message");
                        break;

                }
            }
         }); 

    });

  $(":checkbox").click(function(){
        var id = $(this).attr('id');
        var isChecked = $(this).prop('checked');
        //$.post("index.php", { id: id, isChecked: isChecked });
       //console.log ("all-order: " + isChecked);

       if (id == "all-order"){
            $('.send-orderi').each(function () {
                var id = $(this).attr('id');
                $(this).prop('checked',isChecked);
                /*if ($('#' + id).prop('checked')) {
                    alert($('#' + id).val() + ' is checked');
                }*/
            });
       }
       else{
            $.each($('tbody input'),function(idx,item){
                if(item.checked == false){
                    isChecked = false;
                }
            })        
            $('input:checkbox[name=send-order]').prop('checked',isChecked);
       }

    }); 

    $('input:checkbox').change( function() {
        var id = $(this).attr('id');
        var isChecked = true;// = $(this).prop('checked');

        /*if (!(isChecked)) $('input:checkbox[name=send-order]').prop('checked',false);
        else{
            var isCheckedAll = true; 
            $('.send-orderi').each(function () {
                var id = $(this).attr('id');
                //$(this).prop('checked',isChecked);
                if (!($('#' + id).prop('checked'))) {
                    //alert($('#' + id).val() + ' is checked');
                    isCheckedAll = false;
                }
                console.log("review: " + this.name + " checked = " + isChecked );
            });
            $('input:checkbox[name=send-order]').prop('checked',isCheckedAll);
        }*/

        /*if (id != "all-order")
        {
            $.each($('tbody input'),function(idx,item){
                if(item.checked == false){
                    isChecked = false;
                }
            })        
            $('input:checkbox[name=send-order]').prop('checked',isChecked);
        }

        console.log("here i am: " + this.name + " checked = " + isChecked );*/
    });

    $('input:checkbox[name=flexCheckDefault]').change( function() {
        var id = $(this).attr('id');
        var isChecked = $(this).prop('checked');

        if (isChecked)
        {
            $('#tableMonthly').hide();
            $('#tableOld').show();
        }
        else
        {
            $('#tableMonthly').show();
            $('#tableOld').hide();
        }

    });

    

} );


 


 


