$(document).ready(function() {
    var action = 1;
    var handler = function deleteRow()
    {
        //row.parent().parent().parent().remove();

        //deleteRow($(this).parent().parent().parent();

        if (action == 0)
        {
            console.log(rowDel);

            var qty = parseFloat(rowDel.children()[5].innerText);
            var dscto = parseFloat(rowDel.children()[6].innerText);
            var total = parseFloat(rowDel.children()[7].innerText);

            console.log(qty);
            console.log(dscto);
            console.log(total);

            var total_items = parseFloat($("#total-items").text());     
            var total_dscto = parseFloat($("#total-dscto").text());     
            var total_pagar = parseFloat($("#total-pagar").text());     
            

            $("#total-items").text(parseFloat(total_items) - parseFloat(qty));     
            $("#total-dscto").text((parseFloat(total_dscto) - parseFloat(dscto)).toFixed(2));     
            $("#total-pagar").text((parseFloat(total_pagar) - parseFloat(total_pagar)).toFixed(2));     

            var list_code = $("#product-list-selected").val();        

            var array_list_code = list_code.split(',');
            console.log(array_list_code);

            let pos = array_list_code.indexOf(rowDel.children()[1].innerText.trim());

            array_list_code.splice(array_list_code.indexOf(rowDel.children()[1].innerText.trim()), 1);

            //console.log(array_list_code);
            //console.log(array_list_code.length);

            rowDel.remove();

            if (array_list_code.length == 0)
            {
                $("#product-list-selected").val('');
            }
            else
            {
                $("#product-list-selected").val(array_list_code.toString());
            }

        }



    }

    $("#tableProduct").DataTable( {
        //"paging":   false,
        //"ordering": false,
        "info":     false,
        "searching": false,
        "language": {
            "url": "../config/Spanish.json"
        }
    } );
    

   $("#productfind").click(function(e){
       e.preventDefault();

      console.log ('buscando ' + $('input[id=product]').val());
      // cadena = "../business/product.php";
      cadena = "../modules/product_list.php";

      $.ajax({
         url:cadena,
         type:'POST',
         data: {product:$('input[id=product]').val()},
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
    });


   $('input[id=_cantidad]').blur(function(){
        //e.preventDefault();
        //console.log($(this).val());
        var row = ($(this).parent()).parent();
        var qty = $(this).val();
        var list_code = $("#product-list-selected").val();

        //console.log("length list_code: " + list_code.length);

        if (parseFloat(qty) > 0.0)
        {
            var aniadir = 0;
            var stock = parseFloat(row.children()[4].innerText);
            if (list_code.length > 0)
            {
                var array_list_code = list_code.split(',');
                console.log(array_list_code);

                let pos = array_list_code.indexOf(row.children()[0].innerText.trim());


                console.log("validar stock: " + stock + " - qty: " + $(this).val());
                if (pos == -1)
                {
                    if (parseInt(stock) >= parseInt($(this).val()))
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

                    }
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
                    if (parseInt(stock) >= parseInt($(this).val()))
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

                    }
            }

            if (aniadir == 1)
            {
                cadena = "../business/product_dscto.php";

                $.ajax({
                     url:cadena,
                     type:'POST',
                     data: {product:row.children()[0].innerText,
                            empresa:$("input[name='id_empresa']").val(),
                            client:$("input[name=client-id]").val(),
                            stock_upd:stock},
                    success: function(resulSet) {
                        var objResulSet = $.parseJSON(resulSet);
                        switch (objResulSet["error"])
                        {
                                case 0:
                                    //console.clear();
                                    console.log("Añadiendo producto " + row.children()[0].innerText);
                                    //console.log(objResulSet["data"][0]["PORC_DSCTO"]);
                                    var obj = objResulSet["data"][0];//JSON.parse(objResulSet["data"][0]["PORC_DSCTO"]);
                                    console.log(obj.PORC_DSCTO);
                                    let product = row.children()[0].innerText;

                                    var inventario = parseInt(row.children()[4].innerText);
                                    var stock_saldo = (parseInt(inventario) - parseInt(qty));
            
            
                                    var list_code_tmp = list_code + row.children()[0].innerText.trim() + ",";
                                    console.log("selected ==> " + list_code_tmp.substr(0, list_code_tmp.length-1));
                                    $("#product-list-selected").val(list_code + row.children()[0].innerText.trim() + "," );
            
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
                                    var price = row.children()[3].innerText;
                                    //console.log((parseFloat(qty)*parseFloat(row.children()[3].innerText)*parseFloat(porcDscto)/100).toFixed(2));
                                    var dscto = (parseFloat(qty)*parseFloat(price)*parseFloat(porcDscto)/100);//.toFixed(2);
                                    console.log("%: " + dscto);
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
                                        .row.add( [ row.children()[0].innerText, row.children()[1].innerText, stock_saldo, parseFloat(price).toFixed(2), qty, parseFloat(dscto).toFixed(2), parseFloat(total).toFixed(2), fecha] )
                                        .draw()
                                        .node();
                                     
                                    /*$( rowNode )
                                        .css( 'color', 'red' )
                                        .animate( { color: 'black' } );*/
            
                                    /*var html_pedido= "<tr> " +
                                                     "   <td>" +
                                                     "       " +
                                                     "           <span class=\"d-inline-block\" tabindex=\"1\" data-toggle=\"tooltip\" title=\"Eliminar Item\">" +
                                                     "               <button class=\"btn btn-danger feather-trash-2\" title=\"Eliminar\" id=\"eliminarItem\" onclick=\"console.log ($(this).parent().parent().parent()); rowDel = $(this).parent().parent().parent(); deleteRow();\"></button>" +
                                                     "           </span>" +
                                                     "        " +
                                                     "   </td>" +
                                                     "   <td>"+ row.children()[0].innerText+"</td>" +
                                                     "   <td>"+row.children()[1].innerText+"</td>" +
                                                     "   <td>"+stock_saldo+"</td>" +
                                                     "   <td>"+price.toFixed(2)+"</td>" +
                                                     "   <td>"+qty+"</td>" +
                                                     "   <td>"+dscto.toFixed(2)+"</td>" +
                                                     "   <td>"+total.toFixed(2)+"</td>" +
                                                     "   <td>"+fecha+"</td>" +
                                                     "</tr>";
                                                     */
            
                                    ////$("#table-pedido>tbody").append("<tr><td></td><td>"+row.children()[0].innerText+"</td><td>"+row.children()[1].innerText+"</td><td>Cantidad</td><td>Precio</td><td>Descuento</td><td>Total</td><td>Stock</td><td>Fecha de registro</td></tr>")
                                    //$("#table-pedido>tbody").prepend(html_pedido);
                                    $("#product-list").html("");     
            
                                    console.log(total_items + " - " + total_dscto + " - " + total_pagar);
                                    $("#total-items").text(parseFloat(total_items));     
                                    $("#total-dscto").text(parseFloat(total_dscto).toFixed(2));     
                                    $("#total-pagar").text(parseFloat(total_pagar).toFixed(2));     
                                    action = 1;
                                    $( "#eliminarItem" ).bind( "click", handler);
                                    action = 0;
            
                                    console.log("qty: " + qty);
                                    console.log("inventario: " + row.children()[4].innerText);
                                    console.log("stock: " + stock_saldo);
            
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
                                                action: "insert-item"
                                            },
                                        success: function(resulSet) {
                                            console.log(resulSet);
                                            var objResulSet = $.parseJSON(resulSet);
                                            switch (objResulSet["error"])
                                            {
                                                case 0:
                                                    $("#message").html("Producto añadido al canasta.");
                                                    break;
                                                default:
                                                    $("#message").html(objResulSet["data"]);
                                                    break;
                                
                                            }                                       
                                            alertMsg("#message");
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


                                    break;
                                default:
                                    $("#message").html(objResulSet["data"]);
                                    alertMsg("#message");
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
            $('#qty-alert').show()       ;
        }
   }).focus(function(){
        $(this).select();
   });   


   $("#productfind").hover(function(e){
       //e.preventDefault();
        console.log($(this).attr('id'));

      });   

    $('.zoom').hover(function() {
        $(this).addClass('transition');
    }, function() {
        $(this).removeClass('transition');
    });   

  /*$("#success-alert").hide();
  //$("#myWish").click(function showAlert() {
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
      $("#success-alert").slideUp(500);
    });
  //});    */
});