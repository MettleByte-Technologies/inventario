//$(document).ready(function() {
    console.log ('marca linea');
    function getProductoMarca(){
        cadena = "../business/product-marca-linea.php";

        $.ajax({
            url:cadena,
            type:'POST',
            data: {action:"marca", vend_empresa:$("input[name='id_empresa']").val()},
            success: function(resulSet) {
                //console.log(resulSet);
                var objResulSet = $.parseJSON(resulSet);
                var aux = $.parseJSON(objResulSet["data"]);
                var data = aux["data"];

                switch (objResulSet["error"])
                {
                    case 200:
                        $("#select-marca").append("<option value=-1>-- Seleccionar Marca --</option>");
                        //$("#select-marca").append("<option value=0>Todas</option>");

                        for (var i = 0; i < data.length; i++) {//Recorremos y almacenamos la data en el select (SltDepartamento)
                            $("#select-marca").append("<option value=" + data[i].COD_MARCA + ">" + data[i].MARCA + "</option>");
                        }

                        break;
                    case 204:
                        //$("#divCreatePedido").html("Producto agregado al pedido.");
                        alertMsg(id_name_obj, id_title_obj, id_message_obj, "Error", "No existen datos depç productos (marca/línea)");
                        //alertMsg("#divCreatePedido", "Nuevo Item", "Producto agregado al pedido.");                            
                        break;
                    default:
                        alertMsg(id_name_obj, id_title_obj, id_message_obj, "Error", objResulSet["data"]);
                        //alertMsg("#divCreatePedido", "Nuevo Item", objResulSet["data"]);
                        //$("#divCreatePedido").html(objResulSet["data"]);
                        break;
    
                }                                       
            }
        });    
    }

    function getProductoLineaxMarca(id_marca, name_marca){
        console.log ('buscando MARCA ' + id_marca);      
        $('#select-linea').empty();
        cadena = "../business/product-marca-linea.php";

        //console.log(id_marca);
        $("#product-list").html('');

        if (id_marca == -1){ //Seleccionar
            $('#select-linea').prop('disabled', true);
            $("#select-linea").append("<option value=0>-- Seleccionar Línea --</option>");
        }
        /*else if (id_marca == 0){// Todas
            $('#select-linea').prop('disabled', true);
            $("#select-linea").append("<option value=0>-- Seleccionar Línea --</option>");
            $("#loading").show();
            getProductosxLinea('%');        
        } */       
        else if (id_marca > 0){//X Marca
            $("#loading").show();
            $('#select-linea').prop('disabled', false);
            
            $.ajax({
                url:cadena,
                type:'POST',
                data: {action:"linea", marca : id_marca, vend_empresa:$("input[name='id_empresa']").val()},
                success: function(resulSet) {
                    //console.log(resulSet);
                    var objResulSet = $.parseJSON(resulSet);
                    var aux = $.parseJSON(objResulSet["data"]);
                    var data = aux["data"];

                    console.log(data);
                    
                    switch (objResulSet["error"])
                    {
                        case 200:
                            $("#select-linea").append("<option value=0>-- Seleccionar Línea --</option>");
        
                            for (var i = 0; i < data.length; i++) {//Recorremos y almacenamos la data en el select (SltDepartamento)
                                $("#select-linea").append("<option value=" + data[i].COD_LINEA + ">" + data[i].LINEA + "</option>");
                            }

                            $("#select-linea").change(function(e){
                                //console.log( $('#select-marca').val());
                                idx_value = $('#select-linea').val();
                                if (idx_value > 0)
                                    getProductosxLinea(id_marca, idx_value);
                        
                            });

                            //getProductosxLinea(idx_value);

/* LOADING PRODUCT */
console.log ('buscando DATOS para MARCA ' + name_marca);      
/*console.log ('vend ' + $("input[id='id_vendedor']").val());      
console.log ('empresa ' + $("input[name='id_empresa']").val());      
console.log ('cliente ' + $("input[name=client-id]").val());    */  

cadena = "../modules/product_list.php";

$("#product-list").html('');

$.ajax({
    url:cadena,
    type:'POST',
    data: {
        productm:id_marca,
        productl:0,
        vend_codigo:$("input[id='id_vendedor']").val(),
        vend_empresa:$("input[name='id_empresa']").val(),
        client:$("input[name=client-id]").val()
    },
    success: function(resulSet) {
        console.log(resulSet);
        //alertMsg(id_name_obj, id_title_obj, id_message_obj, "Data not found", "No se encontro el producto "+ $('input[id=product]').val());
        $("#loading").hide();

        try {
            if (parseInt(resulSet) == 409 || parseInt(resulSet) == 204){
                if (parseInt(resulSet) == 204)
                    alertMsg(id_name_obj, id_title_obj, id_message_obj, "Data not found", "No se encontro el producto "+ $('input[id=product]').val());
            }
            else{                                           
                $("#product-list").html(resulSet);

            }

        } catch (error) {
            //$("#product-list").html(resulSet);                                                                
        }

    }
});
/* END LOADING PRODUCT */
                            
                            //$("#loading").hide();                   
                            break;
                        case 204:
                            //$("#divCreatePedido").html("Producto agregado al pedido.");
                            alertMsg(id_name_obj, id_title_obj, id_message_obj, "Error", "No existen datos de productos (marca/línea)");
                            //alertMsg("#divCreatePedido", "Nuevo Item", "Producto agregado al pedido.");                            
                            break;
                        default:
                            alertMsg(id_name_obj, id_title_obj, id_message_obj, "Error", objResulSet["data"]);
                            //alertMsg("#divCreatePedido", "Nuevo Item", objResulSet["data"]);
                            //$("#divCreatePedido").html(objResulSet["data"]);
                            break;
        
                    }                                       
                }
            });

           
        }
    }
        
    function getProductosxLinea(id_marca, id_linea){
        console.log ('buscando linea test ' + id_linea);      
        $("#dQtyItem").hide(); console.log("item hide"); 
        $("#product").val("");
        name_value = $('#select-marca option:selected').text();
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
                    productm:id_marca,
                    productl:id_linea,
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
                            //$("input[id='qtyItem']").trigger("focus").val("");
                            //$("input[id='qtyItem']").trigger("focus").val("");
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



    }

//});

