$(document).ready(function() {
    console.log( "document loaded" );
    //$('input[id="_cantidad"]').focus();   
    /*$('input[id=_cantidad]').focus(function() {
        $( this ).select();
    });*/
    //$("input[id='_cantidad']").trigger("focus");
    //$( "input[name='_cantidad']" )
    
    /*$('input[id=_cantidad]').focus(function() {
        $( this ).next( "span" ).css( "display", "inline" ).fadeOut( 1000 );
    });*/

    //console.log(parseInt($("input[name='sizeofProducts']").val()));

    enableButton =  (parseInt($("input[name='sizeofProducts']").val()) > 1)

    tableP = $("#tableProduct").DataTable( {
        //"paging":   true,
        //"ordering": false,
        "info":     false,
        "searching": false,
        "language": {
            "url": "../config/Spanish.json"
        },
        "lengthMenu": [ [500, 600, 700, -1], [500, 600, 700, "All"] ],      
        dom: 'Bfrtip',
        buttons: [
            {
                text: '<b>Añadir</b>',
                action: function ( e, dt, node, config ) {
                    /*console.log ('Add item(s) to order');
                    $row = dt.row().data()
                    console.log ($row);*/

                    var data = tableP.$('input').serialize().split('&');
                    //alert('The following data would have been submitted to the server: \n\n' + data);
                    //console.log(data);

                    var data1 = dt.rows().data();
                    //alert('The following data would have been submitted to the server: \n\n' + data);
                    //console.log(data1);

                    $.each(data1, function( index, value ) {
                        //alert( index + ": " + value );
                        //console.log( index + ": " + value);
                        console.log( index);
                        console.log( value);
                        //console.log( index + ": " + data[index]);
                        if (parseInt(data[index].split('=')[1]) > 0){
                            setItem(value, data[index].split('=')[1]);
                            /*$.each(value, function( index1, value1 ) {
                                //console.log( index + ": " + data[index]);
                                //console.log( index1 + ": " + value1);
                                //if (index1 == 2) value1 = data[index].split('=')[1];
                            });*/
                        }
                    });

                    //console.log(data1);
                    //return false;

                    /*var list_code = $("#product-list-selected").val();
                    $("#product-list-selected").val("");

                    let tableOrder = $('#tableOrder').DataTable();
                    data = tableOrder.rows();
                    $.each(data, function( index, value ) {
                        console.log("add items " + value);
                        if (list_code.length > 0) list_code = list_code + ",";
                        list_code = list_code + value;
                        //alert( index + ": " + value );
                        //console.log( index + ": " + value);
                        //console.log( index);
                        //console.log( value);
                        //console.log( index + ": " + data[index]);
                    });  */                 
                },
                enabled: enableButton,               
                className: 'feather-shopping-cart'
            }
        ]               
    });

    $('input[name=_qty]').ForceNumericOnly();

    $('input[id="qtyItem_____"]').ForceNumericOnly()
    .blur(function(e){
        e.preventDefault();
        //console.log($(this).val());
        var dataP = tableP.rows().data();

        console.log(dataP[0]);

        console.log("evento qty");
        //let row = ($(this).parent()).parent();
        let row = dataP[0];
        let qty = 0;
        if ($(this).val().trim().length > 0) qty = $(this).val().trim();
        let list_code = $("#product-list-selected").val();

        //console.log("length list_code: " + list_code.length);

        if (parseFloat(qty) > 0.0)
        {
            var aniadir = 0;
            //var stock = parseFloat(row.children()[4].innerText);
            //var stock = parseFloat(row[4].innerText);
            var product = row[0].trim();
            var productName = row[1].trim();

            if (list_code.length > 0)
            {
                var array_list_code = list_code.split(',');
                //console.log(array_list_code);

                //let pos = array_list_code.indexOf(row.children()[0].innerText.trim());
                let pos = array_list_code.indexOf(product);

                //console.log("validar stock: " + stock + " - qty: " + $(this).val());
                if (pos == -1)
                {
                    /*if (parseInt(stock) >= parseInt($(this).val()))
                        aniadir = 1;
                    else
                    {
                        if (confirm("Stock no disponible. Desea ubicarlo como BackOrder?"))
                            aniadir = 1;
                        else{
                            $("#stock-alert").fadeTo(4000, 1000).slideUp(500, function() {
                                $("#stock-alert").slideUp(500);
                              });         
                              $('#stock-alert').show();                              
                        }
                    }*/

                    aniadir = 1;
                }
                else
                {                
                    $("#register-alert").fadeTo(4000, 1000).slideUp(500, function() {
                      $("#resgister-alert").slideUp(500);
                    });         
                    $('#resgister-alert').show()       ;
                }
            }
            else
            {
                    //console.log("stock: " + stock + " - qty: " + $(this).val());
                    /*if (parseInt(stock) >= parseInt($(this).val()))
                        aniadir = 1;
                    else
                    {
                        if (confirm("Stock no disponible. Desea ubicarlo como BackOrder?"))
                            aniadir = 1;
                        else{
                            $("#stock-alert").fadeTo(4000, 1000).slideUp(500, function() {
                                $("#stock-alert").slideUp(500);
                              });         
                              $('#stock-alert').show();                              
                        }
                    }*/
                    aniadir = 1;
            }

            if (aniadir == 1)
            {
                cadena = "../business/product_dscto.php";
                var inventario = parseInt(row[4].trim());                                    
                var stock_saldo = (parseInt(inventario) - parseInt(qty));
                //var inventario = parseInt(row.children()[4].innerText);                                    
                //var stock_saldo = (parseInt(inventario) - parseInt(qty));

                $.ajax({
                     url:cadena,
                     type:'POST',
                     data: {product:product,//row.children()[0].innerText,
                            empresa:$("input[name='id_empresa']").val(),
                            client:$("input[name=client-id]").val(),
                            stock_upd:stock_saldo},
                    success: function(resulSet) {
                        var objResulSet = $.parseJSON(resulSet);
                        switch (objResulSet["error"])
                        {
                                case 0:
                                    //console.clear();
                                    console.log("Añadiendo producto " + product);//row.children()[0].innerText);
                                    //console.log(objResulSet["data"][0]["PORC_DSCTO"]);
                                    var obj = objResulSet["data"][0];//JSON.parse(objResulSet["data"][0]["PORC_DSCTO"]);
                                    console.log(obj.PORC_DSCTO);
                                    //let product = row.children()[0].innerText;
                    
                                    //var list_code_tmp = list_code + row.children()[0].innerText.trim() + ",";
                                    var list_code_tmp = list_code + "," + product ;
                                    console.log("selected ==> " + list_code_tmp.substr(0, list_code_tmp.length-1));

                                    if (list_code.length > 0 ) list_code = list_code  + "," + product; //  + row.children()[0].innerText.trim();
                                    else list_code = product;//row.children()[0].innerText.trim();
                                    
                                    $("#product-list-selected").val(list_code);
            
                                    let date = new Date()
            
                                    let day = date.getDate()
                                    let month = date.getMonth() + 1
                                    let year = date.getFullYear()
                                    let hour= date.getHours(); 
                                    let minute= date.getMinutes(); 
                                    let second= date.getSeconds(); 
            
                                    let dd = (day < 10 ? "0"+day : day);
                                    let mm = (month < 10 ? "0"+month : month);
                                    let yyyy = year;
            
                                    let hh = (hour < 10 ? "0"+hour : hour);
                                    let mi = (minute < 10 ? "0"+minute : minute);
                                    let se = (second < 10 ? "0"+second : second);;
            
                                    var porcDscto = obj.PORC_DSCTO;
                                    //var price = row.children()[3].innerText;
                                    var price = row[3].trim();
                                    //console.log((parseFloat(qty)*parseFloat(row.children()[3].innerText)*parseFloat(porcDscto)/100).toFixed(2));
                                    var dscto = (parseFloat(qty)*parseFloat(price)*parseFloat(porcDscto)/100);//.toFixed(2);
                                    console.log("%: " + dscto);
                                    var subtotal = parseFloat(qty)*parseFloat(price);
                                    var total = (subtotal - dscto);//.toFixed(2);
            
                                    var fecha = yyyy+"-"+mm+"-"+dd+" "+hh+":"+mi+":"+se;
            
                                    var table = $('#tableOrder').DataTable();

                                    var rowNode = table
                                        //.row.add( [ row.children()[0].innerText, row.children()[1].innerText, stock_saldo, parseFloat(price).toFixed(2), '<input type="text" name="items" id="items" CssClass="txt-observ" value="' + qty + '"/>', parseFloat(dscto).toFixed(2), parseFloat(total).toFixed(2), fecha, '<input type="text" name="observs" id="observs" CssClass="txt-observ" value=""/>',porcDscto] )
                                        .row.add( [ product, productName, stock_saldo, parseFloat(price).toFixed(2), '<input type="text" name="items" id="items" CssClass="txt-observ" value="' + qty + '"/>', parseFloat(dscto).toFixed(2), parseFloat(total).toFixed(2), fecha, '<input type="text" name="observs" id="observs" CssClass="txt-observ" value=""/>',porcDscto] )
                                        .draw()
                                        .node();
                                     
                                    $("#product-list").html("");     
                                    $('input[name=items]').focus(function() {
                                        $( this ).select();
                                    }).ForceNumericOnly();
                                    $('input[name=observs]').focus(function() {
                                        $( this ).select();
                                    }).ForceDecimalOnly();

                                    /*totalizar orden*/
                                    console.log('Price: ' + table.column(3).data().sum());                              
                                    var dataQty = table.$('input').serialize().split('&');
                                    var qtyTotal = 0;
                                    $.each(dataQty, function( index, value ) {
                                        var iname  =(value.split('=')[0]);
                                        var iproduct  = parseInt(value.split('=')[1]);
                                        
                                        if (iname.split('_')[0] == "item"){
                                            var iVal  = parseInt(value.split('=')[1]);
                                            qtyTotal = + qtyTotal + iVal;
                                        }
                                    });
                                    console.log('Qty: ' + qtyTotal);                                                                                  
                                    console.log('Dscto: ' + table.column(5).data().sum());                              
                                    console.log('Total: ' + table.column(6).data().sum());  

                                    let total_items = parseInt(qtyTotal);
                                    let total_dscto = parseFloat(table.column(5).data().sum());//.toFixed(2);
                                    let total_pagar = parseFloat(table.column(6).data().sum());//.toFixed(2);
            
                                    
                                    total_items = parseInt(total_items) + parseInt(qty);
                                    total_dscto = parseFloat(total_dscto) + parseFloat(dscto);
                                    total_pagar = parseFloat(total_pagar) + parseFloat(total);
                                    
                                                             
                                    console.log(total_items + " - " + total_dscto + " - " + total_pagar);
                                    $("#total-items").text(parseFloat(total_items));     
                                    $("#total-dscto").text(parseFloat(total_dscto).toFixed(2));     
                                    $("#total-pagar").text(parseFloat(total_pagar).toFixed(2));     
        
                                    //console.log("qty: " + qty);
                                    //console.log("inventario: " + row.children()[4].innerText);
                                    console.log("inventario: " + inventario);                                    
                                    console.log("stock: " + stock_saldo);
            
                                    console.log("Savin in DB");

                                    let nOrder = $("#nOrder").val();
                                    let order_det = '[{"product":'+product+', "qty":'+qty+', "valor":'+total+', "dscto":'+dscto+',"price":'+price+',"porcdscto":'+porcDscto+'}]';
                                    let order_head = '[{"tot_qty":'+parseFloat(total_items)+', "tot_dscto":'+total_dscto+', "total":'+total_pagar+'}]';

                                    cadena = "../business/order-save-detail.php";

                                    $.ajax({
                                        url:cadena,
                                        type:'POST',
                                        data: {nOrder:nOrder,
                                                vend_codigo:$("input[name='id_vendedor']").val(),
                                                vend_empresa:$("input[name='id_empresa']").val(),
                                                client:$("input[name=client-id]").val(),
                                                order: order_det,
                                                orderh: order_head,
                                                action: "insert-item",
                                                observ: '',
                                                notaventa: '0'
                                            },
                                        success: function(resulSet) {
                                            console.log(resulSet);
                                            var objResulSet = $.parseJSON(resulSet);
                                            switch (objResulSet["error"])
                                            {
                                                case 0:
                                                    //$("#divCreatePedido").html("Producto agregado al pedido.");
                                                    alertMsg(id_name_obj, id_title_obj, id_message_obj, "Nuevo Item", "Producto agregado al pedido.");
                                                    //alertMsg("#divCreatePedido", "Nuevo Item", "Producto agregado al pedido.");

                                                    
                                                    break;
                                                default:
                                                    alertMsg(id_name_obj, id_title_obj, id_message_obj, "Nuevo Item", objResulSet["data"]);
                                                    //alertMsg("#divCreatePedido", "Nuevo Item", objResulSet["data"]);
                                                    //$("#divCreatePedido").html(objResulSet["data"]);
                                                    break;
                                
                                            }                                       
                                            //alertMsg("#divCreatePedido");
                                            console.log("focus product");
                                            $("input[id='product']").val("");
                                            $("input[id='product']").trigger("focus");
                                            $("#qtyItem").val("");
                                            $("#dQtyItem").hide();
                                            /*$("input[id='product']").trigger("focus").focus(function() {
                                                $( this ).select();
                                            });                                            */
                                        }
                                    });


                                    /*cadena = "../business/product_stock.php";
            
                                    $.ajax({
                                         url:cadena,
                                         type:'POST',
                                         data: {product:row.children()[0].innerText,
                                                empresa:$("input[name='id_empresa']").val(),
                                                client:$("#client-id").text(),
                                                stock_upd:stock_saldo},
                                         success: function(resp) {
                                            console.log("Actualizado stock");
                                            console.log(resp);
                                        }
                                    });   */

                                    /*console.log("focus product");
                                    //$("input[id='product']").val("");
                                    $("input[id='product']").trigger("focus");
                                    $("input[id='product']").trigger("focus").focus(function() {
                                        $( this ).select();
                                    });*/
                    
                                    break;
                                default:
                                    //alertMsg("#divCreatePedido", "Nuevo Item", objResulSet["data"]);
                                    alertMsg(id_name_obj, id_title_obj, id_message_obj, "Nuevo Item", objResulSet["data"]);
                                    //$("#message").html(objResulSet["data"]);
                                    //alertMsg("#message");
                                    break;            
                        }
                    }
                });                
            }
        }
        else
        {
            //console.log("Cantidad Invalida");
            $("#qty-alert").fadeTo(4000, 1000).slideUp(500, function() {
              $("#qty-alert").slideUp(500);
            });         
            $('#qty-alert').show();
            //$('input[id="qtyItem"]').trigger("focus");            
        }
   });    


    $('input[id=_cantidad]').ForceNumericOnly()
    //$('input[id=qtyItem]').ForceNumericOnly()
    .blur(function(){
        //e.preventDefault();
        //console.log($(this).val());
        console.log("evento qty tabla");
        var row = ($(this).parent()).parent();
        var qty = $(this).val();
        var list_code = $("#product-list-selected").val();

        //console.log("length list_code: " + list_code.length);

        if (parseFloat(qty) > 0.0)
        {
            var aniadir = 0;
            //var stock = parseFloat(row.children()[4].innerText);
            var product = row.children()[1].innerText.trim();
            var productName = row.children()[2].innerText.trim();

            if (list_code.length > 0)
            {
                var array_list_code = list_code.split(',');
                //console.log(array_list_code);

                let pos = array_list_code.indexOf(product);//row.children()[0].innerText.trim());

                //console.log("validar stock: " + stock + " - qty: " + $(this).val());
                if (pos == -1)
                {
                    /*if (parseInt(stock) >= parseInt($(this).val()))
                        aniadir = 1;
                    else
                    {
                        if (confirm("Stock no disponible. Desea ubicarlo como BackOrder?"))
                            aniadir = 1;
                        else{
                            $("#stock-alert").fadeTo(4000, 1000).slideUp(500, function() {
                                $("#stock-alert").slideUp(500);
                              });         
                              $('#stock-alert').show();                              
                        }
                    }*/

                    aniadir = 1;
                }
                else
                {                
                    $("#register-alert").fadeTo(4000, 1000).slideUp(500, function() {
                      $("#resgister-alert").slideUp(500);
                    });         
                    $('#resgister-alert').show()       ;
                }
            }
            else
            {
                    //console.log("stock: " + stock + " - qty: " + $(this).val());
                    /*if (parseInt(stock) >= parseInt($(this).val()))
                        aniadir = 1;
                    else
                    {
                        if (confirm("Stock no disponible. Desea ubicarlo como BackOrder?"))
                            aniadir = 1;
                        else{
                            $("#stock-alert").fadeTo(4000, 1000).slideUp(500, function() {
                                $("#stock-alert").slideUp(500);
                              });         
                              $('#stock-alert').show();                              
                        }
                    }*/
                    aniadir = 1;
            }

            if (aniadir == 1)
            {
                cadena = "../business/product_dscto.php";
                var inventario = parseInt(row.children()[5].innerText);                                    
                var stock_saldo = (parseInt(inventario) - parseInt(qty));

                $.ajax({
                     url:cadena,
                     type:'POST',
                     data: {product:product,//row.children()[0].innerText,
                            empresa:$("input[name='id_empresa']").val(),
                            client:$("input[name=client-id]").val(),
                            stock_upd:stock_saldo},
                    success: function(resulSet) {
                        var objResulSet = $.parseJSON(resulSet);
                        switch (objResulSet["error"])
                        {
                                case 0:
                                    //console.clear();
                                    console.log("Añadiendo producto " + product);//row.children()[0].innerText);
                                    //console.log(objResulSet["data"][0]["PORC_DSCTO"]);
                                    var obj = objResulSet["data"][0];//JSON.parse(objResulSet["data"][0]["PORC_DSCTO"]);
                                    console.log(obj.PORC_DSCTO);
                                    //let product = row.children()[0].innerText;
                    
                                    //var list_code_tmp = list_code + row.children()[0].innerText.trim() + ",";
                                    var list_code_tmp = list_code + product + ",";
                                    console.log("selected ==> " + list_code_tmp.substr(0, list_code_tmp.length-1));

                                    if (list_code.length > 0 ) list_code = list_code  + "," + product; //  + row.children()[0].innerText.trim();
                                    else list_code = product;//row.children()[0].innerText.trim();
                                    
                                    $("#product-list-selected").val(list_code);
            
                                    let date = new Date()
            
                                    let day = date.getDate()
                                    let month = date.getMonth() + 1
                                    let year = date.getFullYear()
                                    let hour= date.getHours(); 
                                    let minute= date.getMinutes(); 
                                    let second= date.getSeconds(); 
            
                                    let dd = (day < 10 ? "0"+day : day);
                                    let mm = (month < 10 ? "0"+month : month);
                                    let yyyy = year;
            
                                    let hh = (hour < 10 ? "0"+hour : hour);
                                    let mi = (minute < 10 ? "0"+minute : minute);
                                    let se = (second < 10 ? "0"+second : second);;
            
                                    var porcDscto = obj.PORC_DSCTO;
                                    var price = row.children()[4].innerText;
                                    //console.log((parseFloat(qty)*parseFloat(row.children()[3].innerText)*parseFloat(porcDscto)/100).toFixed(2));
                                    var dscto = (parseFloat(qty)*parseFloat(price)*parseFloat(porcDscto)/100);//.toFixed(2);
                                    console.log("%: " + dscto);
                                    var subtotal = parseFloat(qty)*parseFloat(price);
                                    var total = (subtotal - dscto);//.toFixed(2);
            
                                    var fecha = yyyy+"-"+mm+"-"+dd+" "+hh+":"+mi+":"+se;
            
                                    var table = $('#tableOrder').DataTable();

                                    var rowNode = table
                                        //.row.add( [ row.children()[0].innerText, row.children()[1].innerText, stock_saldo, parseFloat(price).toFixed(2), '<input type="text" name="items" id="items" CssClass="txt-observ" value="' + qty + '"/>', parseFloat(dscto).toFixed(2), parseFloat(total).toFixed(2), fecha, '<input type="text" name="observs" id="observs" CssClass="txt-observ" value=""/>',porcDscto] )
                                        .row.add( [ product, productName, stock_saldo, parseFloat(price).toFixed(2), '<input type="text" name="items" id="items" CssClass="txt-observ" value="' + qty + '"/>', parseFloat(dscto).toFixed(2), parseFloat(total).toFixed(2), fecha, '<input type="text" name="observs" id="observs" CssClass="txt-observ" value=""/>',porcDscto] )
                                        .draw()
                                        .node();
                                     
                                    $("#product-list").html("");     
                                    $('input[name=items]').focus(function() {
                                        $( this ).select();
                                    }).ForceNumericOnly();
                                    $('input[name=observs]').focus(function() {
                                        $( this ).select();
                                    }).ForceDecimalOnly();

                                    /*totalizar orden*/
                                    console.log('Price: ' + table.column(3).data().sum());                              
                                    var dataQty = table.$('input').serialize().split('&');
                                    //console.log('qTYtABLE: ' + dataQty);                              
                                    var qtyTotal = 0;
                                    $.each(dataQty, function( index, value ) {
                                        var iname  =(value.split('=')[0]);
                                        var iproduct  = parseInt(value.split('=')[1]);
                                        
                                        if (iname.split('_')[0] == "items"){
                                            var iVal  = parseInt(value.split('=')[1]);
                                            qtyTotal = + qtyTotal + iVal;
                                        }
                                    });
                                    console.log('Qty: ' + qtyTotal);                                                                                  
                                    console.log('Dscto: ' + table.column(5).data().sum());                              
                                    console.log('Total: ' + table.column(6).data().sum());  

                                    let total_items = parseInt(qtyTotal);
                                    let total_dscto = parseFloat(table.column(5).data().sum());//.toFixed(2);
                                    let total_pagar = parseFloat(table.column(6).data().sum());//.toFixed(2);
            
                                    
                                    //total_items = parseInt(total_items) + parseInt(qty);
                                    //total_dscto = parseFloat(total_dscto) + parseFloat(dscto);
                                    //total_pagar = parseFloat(total_pagar) + parseFloat(total);
                                    
                                                             
                                    console.log(total_items + " - " + total_dscto + " - " + total_pagar);
                                    $("#total-items").text(parseFloat(total_items));     
                                    $("#total-dscto").text(parseFloat(total_dscto).toFixed(2));     
                                    $("#total-pagar").text(parseFloat(total_pagar).toFixed(2));     
        
                                    //console.log("qty: " + qty);
                                    console.log("inventario: " + row.children()[5].innerText);
                                    console.log("stock: " + stock_saldo);
            
                                    console.log("Savin in DB");

                                    let nOrder = $("#nOrder").val();
                                    let order_det = '[{"product":'+product+', "qty":'+qty+', "valor":'+total+', "dscto":'+dscto+',"price":'+price+',"porcdscto":'+porcDscto+'}]';
                                    let order_head = '[{"tot_qty":'+parseFloat(total_items)+', "tot_dscto":'+total_dscto+', "total":'+total_pagar+'}]';

                                    cadena = "../business/order-save-detail.php";

                                    $.ajax({
                                        url:cadena,
                                        type:'POST',
                                        data: {nOrder:nOrder,
                                                vend_codigo:$("input[name='id_vendedor']").val(),
                                                vend_empresa:$("input[name='id_empresa']").val(),
                                                client:$("input[name=client-id]").val(),
                                                order: order_det,
                                                orderh: order_head,
                                                action: "insert-item",
                                                observ: '',
                                                notaventa: '0'
                                            },
                                        success: function(resulSet) {
                                            console.log(resulSet);
                                            var objResulSet = $.parseJSON(resulSet);
                                            switch (objResulSet["error"])
                                            {
                                                case 0:
                                                    //$("#divCreatePedido").html("Producto agregado al pedido.");
                                                    alertMsg(id_name_obj, id_title_obj, id_message_obj, "Nuevo Item", "Producto agregado al pedido.");
                                                    //alertMsg("#divCreatePedido", "Nuevo Item", "Producto agregado al pedido.");

                                                    
                                                    break;
                                                default:
                                                    alertMsg(id_name_obj, id_title_obj, id_message_obj, "Nuevo Item", objResulSet["data"]);
                                                    //alertMsg("#divCreatePedido", "Nuevo Item", objResulSet["data"]);
                                                    //$("#divCreatePedido").html(objResulSet["data"]);
                                                    break;
                                
                                            }                                       
                                            //alertMsg("#divCreatePedido");
                                            //console.log("focus product");
                                            $("input[id='product']").val("");
                                            $("input[id='product']").trigger("focus");
                                            //$("#dQtyItem").hide();
                                            /*$("input[id='product']").trigger("focus").focus(function() {
                                                $( this ).select();
                                            });                                            */
                                        }
                                    });


                                    /*cadena = "../business/product_stock.php";
            
                                    $.ajax({
                                         url:cadena,
                                         type:'POST',
                                         data: {product:row.children()[0].innerText,
                                                empresa:$("input[name='id_empresa']").val(),
                                                client:$("#client-id").text(),
                                                stock_upd:stock_saldo},
                                         success: function(resp) {
                                            console.log("Actualizado stock");
                                            console.log(resp);
                                        }
                                    });   */

                                    /*console.log("focus product");
                                    //$("input[id='product']").val("");
                                    $("input[id='product']").trigger("focus");
                                    $("input[id='product']").trigger("focus").focus(function() {
                                        $( this ).select();
                                    });*/
                    
                                    break;
                                default:
                                    //alertMsg("#divCreatePedido", "Nuevo Item", objResulSet["data"]);
                                    alertMsg(id_name_obj, id_title_obj, id_message_obj, "Nuevo Item", objResulSet["data"]);
                                    //$("#message").html(objResulSet["data"]);
                                    //alertMsg("#message");
                                    break;            
                        }
                    }
                });                

                //$("input[id='product']").trigger("focus");
                /*$("input[type='text']").focus(function() {
                    $( this ).select();
                });*/
            }

    
        }
        else
        {
            //console.log("Cantidad Invalida");
            $("#qty-alert").fadeTo(4000, 1000).slideUp(500, function() {
              $("#qty-alert").slideUp(500);
            });         
            $('#qty-alert').show()       ;
        }
   });/*.focus(function(){
        $(this).select();
   });  */ 


   $("#productfind").hover(function(e){
       //e.preventDefault();
        console.log($(this).attr('id'));

    });   

    $('.zoom').hover(function() {
        $(this).addClass('transition');
    }, function() {
        $(this).removeClass('transition');
    });   

    function setItem(row, qty){
        //var row = ($(this).parent()).parent();
        //var qty = $(this).val();
        console.log($("#product-list-selected").val());
        var list_code = $("#product-list-selected").val();

        //console.log(row);
        //console.log(qty);
        var aniadir = 0;
        var stock = parseFloat(row[4]);
        if (list_code.length > 0)
        {
            var array_list_code = list_code.split(',');
            //console.log(array_list_code);

            let pos = array_list_code.indexOf(row[1]);


            //console.log("validar stock: " + stock + " - qty: " + qty);
            if (pos == -1)
            {
                aniadir = 1;
            }
            else
            {                
                /*$("#register-alert").fadeTo(4000, 1000).slideUp(500, function() {
                    $("#resgister-alert").slideUp(500);
                });         
                $('#resgister-alert').show()       ;*/
            }
        }
        else
        {
                //if (parseInt(stock) >= parseInt(qty))
                    aniadir = 1;
                /*else
                {
                }*/
        }

        if (aniadir == 1)
        {
            cadena = "../business/product_dscto.php";
            var inventario = parseInt(row[5]);                                    
            var stock_saldo = (parseInt(inventario) - parseInt(qty));

            $.ajax({
                    url:cadena,
                    type:'POST',
                    data: {product:row[1],
                        empresa:$("input[name='id_empresa']").val(),
                        client:$("input[name=client-id]").val(),
                        stock_upd:stock_saldo},
                success: function(resulSet) {
                    var objResulSet = $.parseJSON(resulSet);
                    switch (objResulSet["error"])
                    {
                            case 0:
                                //console.clear();
                                let product = row[1];
                                console.log("Añadiendo producto " + product);
                                //console.log(objResulSet["data"][0]["PORC_DSCTO"]);
                                var obj = objResulSet["data"][0];//JSON.parse(objResulSet["data"][0]["PORC_DSCTO"]);
                                //console.log(obj.PORC_DSCTO);
                
                                //var list_code_tmp = list_code + product + ",";
                                //console.log("selected ==> " + list_code_tmp.substr(0, list_code_tmp.length-1));


                                list_code = $("#product-list-selected").val();

                                if (list_code.length > 0 ) list_code = list_code  + ","  + product;
                                else list_code = product;
                                
                                $("#product-list-selected").val(list_code);
                                
                                console.log($("#product-list-selected").val());

                                /*list_code = list_code + "," + product;
                                $("#product-list-selected").val(list_code);
                                console.log(list_code);*/
        
                                let date = new Date();
        
                                let day = date.getDate();
                                let month = date.getMonth() + 1;
                                let year = date.getFullYear();
                                let hour= date.getHours(); 
                                let minute= date.getMinutes(); 
                                let second= date.getSeconds(); 
        
                                let dd = (day < 10 ? "0"+day : day);
                                let mm = (month < 10 ? "0"+month : month);
                                let yyyy = year;
        
                                let hh = (hour < 10 ? "0"+hour : hour);
                                let mi = (minute < 10 ? "0"+minute : minute);
                                let se = (second < 10 ? "0"+second : second);;
        
                                var porcDscto = obj.PORC_DSCTO;
                                var price = row[4];
                                //console.log((parseFloat(qty)*parseFloat(row.children()[3].innerText)*parseFloat(porcDscto)/100).toFixed(2));
                                var dscto = (parseFloat(qty)*parseFloat(price)*parseFloat(porcDscto)/100);//.toFixed(2);
                                //console.log("%: " + dscto);
                                var subtotal = parseFloat(qty)*parseFloat(price);
                                var total = (subtotal - dscto);//.toFixed(2);
        
                                var fecha = yyyy+"-"+mm+"-"+dd+" "+hh+":"+mi+":"+se;
        
                                /*totalizar orden*/
                                let total_items = parseInt($("#total-items").text());
                                let total_dscto = parseFloat($("#total-dscto").text());//.toFixed(2);
                                let total_pagar = parseFloat($("#total-pagar").text());//.toFixed(2);
        
                                //console.log((total_items) + " total_items");//total_items + " - " + total_dscto + " - " + total_pagar);
                                //console.log((total_dscto) + " total_dscto");//total_items + " - " + total_dscto + " - " + total_pagar);
                                //console.log((total_pagar) + " total_pagar");//total_items + " - " + total_dscto + " - " + total_pagar);
        
                                total_items = parseInt(total_items) + parseInt(qty);
                                total_dscto = parseFloat(total_dscto) + parseFloat(dscto);
                                total_pagar = parseFloat(total_pagar) + parseFloat(total);
        
                                var table = $('#tableOrder').DataTable();
            
                                var rowNode = table
                                    //.row.add( [ row[0], row[1], '<input type="text" name="item_"' + row[0] + ' id="item_"' + row[0] + ' CssClass="txt-observ" value="' +  + '"/>', parseFloat(price).toFixed(2), qty, parseFloat(dscto).toFixed(2), parseFloat(total).toFixed(2), fecha, '<input type="text" name="txt-observ" id="txt-observ" CssClass="txt-observ" value="0"/>'] )
                                    .row.add( [ row[1], row[2], stock_saldo, parseFloat(price).toFixed(2), '<input type="text" name="items" id="item_' + row[1] + '" CssClass="txt-observ" value="' + qty + '"/>', parseFloat(dscto).toFixed(2), parseFloat(total).toFixed(2), fecha, '<input type="text" name="observs" id="observs" CssClass="txt-observ" value=""/>', porcDscto] )
                                    .draw()
                                    .node();
                                    
                                $("#product-list").html("");     
                                $('input[name=items]').focus(function() {
                                    $( this ).select();
                                }).ForceNumericOnly();
                                $('input[name=observs]').focus(function() {
                                    $( this ).select();
                                }).ForceDecimalOnly();
                                
                                
                                ///console.log(total_items + " - " + total_dscto + " - " + total_pagar);
                                $("#total-items").text(parseFloat(total_items));     
                                $("#total-dscto").text(parseFloat(total_dscto).toFixed(2));     
                                $("#total-pagar").text(parseFloat(total_pagar).toFixed(2));     
        
                                /*console.log("qty: " + qty);
                                console.log("inventario: " + row[4]);
                                console.log("stock: " + stock_saldo);*/
        
                                console.log("Savin in DB");

                                let nOrder = $("#nOrder").val();
                                let order_det = '[{"product":'+product+', "qty":'+qty+', "valor":'+total+', "dscto":'+dscto+',"price":'+price+',"porcdscto":'+porcDscto+'}]';
                                let order_head = '[{"tot_qty":'+parseFloat(total_items)+', "tot_dscto":'+total_dscto+', "total":'+total_pagar+'}]';

                                cadena = "../business/order-save-detail.php";

                                //console.log(nOrder);
                                //console.log(order_det);
                                //console.log(order_head);

                                // $noOrder, $empresa_id, $vendedor_id, $client, $product, $qty, $valor, $dscto
                            
                                $.ajax({
                                    url:cadena,
                                    type:'POST',
                                    data: {nOrder:nOrder,
                                            vend_codigo:$("input[name='id_vendedor']").val(),
                                            vend_empresa:$("input[name='id_empresa']").val(),
                                            client:$("input[name=client-id]").val(),
                                            order: order_det,
                                            orderh: order_head,
                                            action: "insert-item",
                                            observ: '',
                                            notaventa: '0'
                                        },
                                    success: function(resulSet) {
                                        console.log(resulSet);
                                        var objResulSet = $.parseJSON(resulSet);
                                        switch (objResulSet["error"])
                                        {
                                            case 0:
                                                alertMsg(id_name_obj, id_title_obj, id_message_obj, "Nuevo Item", "Producto agregado al pedido.");
                                                //alertMsg("#divCreatePedido", "Nuevo Item", "Producto agregado al canasta.");
                                                //$("#message").html("Producto añadido al canasta.");
                                                break;
                                            default:
                                                alertMsg(id_name_obj, id_title_obj, id_message_obj, "Nuevo Item", objResulSet["data"]);
                                                //alertMsg("#divCreatePedido", "Nuevo Item", objResulSet["data"]);
                                                //$("#message").html(objResulSet["data"]);
                                                break;
                            
                                        }                                       
                                        //alertMsg("#message");

                                        //console.log("focus product");
                                        $("input[id='product']").val("");
                                        $("input[id='product']").trigger("focus");
                                        /*$("input[id='product']").focus(function() {
                                            $( this ).select();
                                        }); */                                   
                                        
                                    }
                                });

                                break;
                            default:
                                alertMsg(id_name_obj, id_title_obj, id_message_obj, "Nuevo Item", objResulSet["data"]);
                                //alertMsg("#divCreatePedido", "Nuevo Item", objResulSet["data"]);
                                //$("#message").html(objResulSet["data"]);
                                //alertMsg("#message");
                                break;            
                    }
                }
            });                
        }
   
        /*$("input[type='text']").focus(function() {
            $( this ).select();
        });        */
    }

    //$("input[id='_cantidad']").trigger("focus"); 

});
