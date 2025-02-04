
var id_name_obj = "#divCreatePedido";
var id_title_obj = "#titleCreatePedido";
var id_message_obj = "#messageCreatePedido";

$(document).ready(function() {
    console.log ('updated order-new.js');    
    $("#register-alert").hide();
    $("#qty-alert").hide();
    $("#stock-alert").hide();
    $("#loading").hide();
    $("#dQtyItem").hide();
    $(id_name_obj).hide();    
    $("input[id='product']").trigger("focus");
    $("#loading").hide();

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
            /*columnDefs: [
                {
                    target: 10,
                    searchable: false,
                    visible: false,
                },
            ], */
            columns: [
                { title: "Producto"},
                { title: "Descripción" },
                { title: "Stock" },
                { title: "Precio" },
                { title: "Cantidad" },
                { title: "Dscto" },
                { title: "Total" },
                { title: "Fecha" },
                { title: "Observ."},
                { title: "% Dscto.", visible : false}
            ]
                         
        });

    }
    
    $('input[id=product]').blur(function(){
        //e.preventDefault();
        $('#select-linea').empty();
        console.log ('buscando producto ' + $("input[id=product]").val());      
        $("#dQtyItem").hide(); console.log("item hide"); 
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
                    $("#loading").hide();

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

                            /*$('input[id=_cantidad]').focus(function() {
                                $( this ).select();
                            });
                            $('input[id=_qty]').focus(function() {
                                $( this ).select();
                            });                            
                            */
                            
                            //$('input[id="_cantidad"]').trigger("focus");
                            /*$('input[id=_cantidad]').focus(function() {
                                $( this ).select();
                            });                            */
                            $("input[id='qtyItem']").trigger("focus").val("");
                            $("input[id='qtyItem']").trigger("focus").val("");
                            //$("#qtyItem").val("");

                        }

                    } catch (error) {
                        //$("#product-list").html(resulSet);                                                                
                    }



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
       $("#loading").show();

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
             $("#loading").hide();
 
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

});
