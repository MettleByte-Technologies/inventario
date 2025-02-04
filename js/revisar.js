/* Codigo viene desde proudct.js*/

var action = 1;
var handler1 = function deleteRow()
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

/*action = 1;
$( "#eliminarItem" ).bind( "click", handler);
action = 0;*/