console.log ('updated order-new.js');
var id_name_obj = "#divCreatePedido";
var id_title_obj = "#titleCreatePedido";
var id_message_obj = "#messageCreatePedido";

$(document).ready(function() {
    $("#register-alert").hide();
    $("#qty-alert").hide();
    $("#stock-alert").hide();
    $("#loading").hide();
    $(id_name_obj).hide();    
    $("input[id='product']").trigger("focus");

    console.log($("#message").attr('class'));

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
                { title: "Observ."}
            ],
            dom: 'Bfrtip',
            select: true,
            buttons: [
                {
                    text: '<b>Guardar</b>',
                    action: function ( e, dt, node, config ) {
                        console.log ('Guardar pedido new');           

                        // $noOrder, $empresa_id, $vendedor_id, $client, $product, $qty, $valor, $dscto

                        /****** Actualizar pedido ******/
                        let notaVenta = ($("input[name='notaventa']").prop("checked") == true ? '1' : '0');
                        let rowsI = dt.$('input[name="items"]').serialize().split('&');
                        let rowsO = dt.$('input[name="observs"]').serialize().split('&');

                        
                        let rows1 = dt.rows().data();
                        let order_det = "[";
    
                        var validD = false;
                        var validI = false;

                        console.log(rowsI);
                        console.log(rowsO);
                        $.each(rows1, function( index, value ) {
                            var validD = (rowsO[index].split('=')[1].match(/^[0-9.]+\.\d{1,2}$/));  
                            var validI = (rowsO[index].split('=')[1].match(/^d+$/));  
                            let newPerc = rowsO[index].split('=')[1];
                            let newQty = rowsI[index].split('=')[1];
                            if (order_det.length > 1) order_det = order_det + ','                            
                            //setItem(value, data[index].split('=')[1]);
                            //$.each(value, function( index1, value1 ) {
                            //});
                            console.log(value);
                            console.log("Decimal" + validD);
                            console.log("Entero" + validI);
                            //if (validD || validI) order_det = order_det + '{"product":'+value[0]+', "newqty" : '+newQty+', "newporc":'+newPerc+'}';  
                            
                            //order_det = order_det + '{"product":'+product+', "newporc":'+newPerc+'}';                          
                        });
                        
                        /*********** Guardar Observaciones ************************** */
                        //let rowsT = $("#tableOrder>tbody");
                        //let order_det = "[";

                        //console.log(rowsT);

                        /*
                        rowsT.children().each(function(e){
                            if (order_det.length > 1) order_det = order_det + ','
                            console.log($(this).html());

                            var newporc = $(this).find('#txt-observ').val();

                            var product = $(this).children()[0].innerText;


                            //console.log(qty);
                            //console.log(dscto);
                            //console.log(total);

                            order_det = order_det + '{"product":'+product+', "newporc":'+newporc+'}';

                            //console.log(order_det);

                        })*/
                        
                        order_det += "]";

                        //console.log('orden: ' + $("#nOrder").val());
                        //console.log($('vendedor: ' + "input[name='id_vendedor']").val());
                        //console.log($('empresa' + "input[name='id_empresa']").val());
                        //console.log('cliente: ' + $("#client-id").val());

                        /************************************ */                         

                        console.log(order_det);
                        console.log(notaVenta);                        

                        cadena = "../business/order-save-detail.php";

                        $.ajax({
                            url:cadena,
                            type:'POST',
                            data:{   
                                nOrder:$("#nOrder").val(),
                                vend_codigo:0,//$("input[name='id_vendedor']").val(),
                                vend_empresa:0,//$("input[name='id_empresa']").val(),
                                client:$("#client-id").val(),
                                order: order_det,
                                orderh: null,
                                action: "update-order",
                                observ: "",//$("input[name='pedi-observ']").val(),
                                notaventa: ($("input[name='notaventa']").prop("checked") == true ? '1' : '0')
                            },
                            success: function(resp) {
                                console.log(resp);
                                $.ajax({
                                    url:'../modules/order_list.php',
                                    type:'POST',
                                    data: {
                                        vend_codigo:$("input[name='id_vendedor']").val(),
                                        vend_empresa:$("input[name='id_empresa']").val(),
                                        estado: '%'
                                    },
                                    success: function(resp) {
                                        if(resp == "../"){
                                            window.location.href= resp;
                                        } 
                                        else{
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

                        /*console.log($("input[name='id_vendedor']").val());
                        console.log($("input[name='id_empresa']").val());
                        console.log(itemsListCode);
                        console.log($("#nOrder").val());*/

                        $.ajax({
                            url:'../business/order.php',
                            type:'POST',
                            data: {
                                action:"delete-item",
                                vend_codigo:$("input[name='id_vendedor']").val(),
                                vend_empresa:$("input[name='id_empresa']").val(),
                                delorders: itemsListCode,
                                nOrder:$("#nOrder").val(),
                                tot_qty: parseFloat(total_items),
                                total_dscto: total_dscto,
                                total_pagar: total_pagar
                            },
                            success: function(resulSet) {
                                console.log(resulSet);
                                var objResulSet = $.parseJSON(resulSet);
                                switch (objResulSet["error"])
                                {
                                    case 0:
                                        var nitems = itemsList.split(',').length;

                                        if (nitems > 1)
                                            //$("#message").html("Items " + itemsList + " fueron actualizados");
                                            alertMsg(id_name_obj, id_title_obj, id_message_obj, "Item eliminado", "Items " + itemsList + " fueron actualizados");
                                        else
                                            //$("#message").html("Item " + itemsList + " fue actualizado");
                                            alertMsg(id_name_obj, id_title_obj, id_message_obj, "Item eliminado", "Item " + itemsList + " fue actualizado");

                                        //alertMsg("#message");                                                        

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
                                        //$("#message").html(objResulSet["data"]);
                                        //alertMsg("#message");
                                        alertMsg(id_name_obj, id_title_obj, id_message_obj, "Eliminar Item", html(objResulSet["data"]));                                        
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
    
    $('input[id=product]').blur(function(){
        //e.preventDefault();
        console.log ('buscando producto ' + $("input[id=product]").val());       
        //if (($('input[id=product]').val()).length > 0) 
        if (1==1)
        {
            cadena = "../modules/product_list.php";

            //cadena = "../modules/product_list.php";
            $("#product-list").html('');
            $("#loading").show();

            $.ajax({
                url:cadena,
                type:'POST',
                data: {
                    product:$('input[id=product]').val(),
                    vend_codigo:$("input[id='id_vendedor']").val(),
                    vend_empresa:$("input[name='id_empresa']").val(),
                    client:$("input[name=client-id]").val()
                },
                success: function(resulSet) {
                    //console.log(resulSet);
                    //alertMsg(id_name_obj, id_title_obj, id_message_obj, "Data not found", "No se encontro el producto "+ $('input[id=product]').val());
                    try {
                        if (parseInt(resulSet) == 409 || parseInt(resulSet) == 204){
                            if (parseInt(resulSet) == 204)
                                alertMsg(id_name_obj, id_title_obj, id_message_obj, "Data not found", "No se encontro el producto "+ $('input[id=product]').val());
                            /*switch (resulSet)
                            {
                                case 409:
                                    alertMsg(id_name_obj, id_title_obj, id_message_obj, "Error", "Existe problemas en la busqueda del producto " + $('input[id=product]').val());
                                    break;
                                case 204:
                                    alertMsg(id_name_obj, id_title_obj, id_message_obj, "Data not found", "No se encontro el producto "+ $('input[id=product]').val());
                                    break;
                            } */
                        }
                        else{                                           
                            $("#product-list").html(resulSet);

                            $('input[id=_cantidad]').focus(function() {
                                $( this ).select();
                            });
                            $('input[id=_qty]').focus(function() {
                                $( this ).select();
                            });                            
                            //$("input[id='_cantidad']").trigger("focus");
                        }

                    } catch (error) {
                        //$("#product-list").html(resulSet);                                                                
                    }

                    $("#loading").hide();


                    /*var objResulSet = resulSet;//$.parseJSON(resulSet);
                    console.log(resulSet["error"]);
                    switch (objResulSet["error"])
                    {
                        case 200:
                            $("#product-list").html(objResulSet["data"]);                                                      
                            break;
                        default:
                            $("#message").html(objResulSet["data"]);
                            alertMsg("#message");
                            break;

                    }*/
                }
            });
        }
        //  cadena = "../modules/product_list_porcentaje.php";
        //else      
        else{
            //$("#message").html("Debe ingresar un valor a buscar.");
            //alertMsg("#message");
            alertMsg(id_name_obj, id_title_obj, id_message_obj, "Busqueda de productos", "Debe ingresar un valor a buscar.");
        }
    });

    $('input[id=productinv]').blur(function(){
        //e.preventDefault();
       cadena = "../modules/product_list_inv_1.php";
       console.log($('input[id=productinv]').val());
       console.log($("input[id='id_vendedor']").val());
       console.log($("input[name='id_empresa']").val());

       $("#product-list").html('');

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
 
 
       console.log ('buscando ' + $('input[id=productinv]').val());       
 
    });

   $("#save-items_").click(function(e){
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
                    data: {
                        vend_codigo:$("input[name='id_vendedor']").val(),
                        vend_empresa:$("input[name='id_empresa']").val()
                    },
                    success: function(resp) {
                        if(resp == "../"){
                            window.location.href= resp;
                        } 
                        else{
                            $("#title-content").html("<h2>Pedidos</h2>");  
                            $("#content").html(resp);  
                        }
                    }
                });
            }
        });
    });


});
