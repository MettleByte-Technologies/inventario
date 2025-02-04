function getSelectedItem(obj, parent_id, child_id, child_value, url_path){
    var selecteId = obj.children("option:selected").val();
    console.log (selecteId);
    //e.preventDefault();

    if (selecteId > 0){
        cadena =    `action='select'` +
        `&${parent_id}=` + selecteId;

        //console.log (cadena);

        $.ajax({
        url: url_path,
        type:'POST',
        data: cadena,
        success: function(resp) {
                //console.log (resp);
                var obj = JSON.parse(resp);
                //console.log (obj["error"]);
                if (obj["error"] == 0) 
                {
                    
                    //console.log (obj);

                    child_id.forEach(function(elemento, indice, array) {
                        console.log(elemento, indice);
                        $(`select#${elemento}`)
                            .empty()
                            .append('<option selected="selected" value="0">- Seleccione -</option></option>');
                    })


                    $.each(obj["data"], function(key, val) {
                        console.log(val[`${child_id[0]}`] + " - " + val[`${child_value}`]); //Fine

            

                        optionValue = val[`${child_id[0]}`];
                        optionText = val[`${child_value}`];
                        $(`select#${child_id}`).append(`<option value="${optionValue}"> ${optionText} </option>`); 


                    });                    
                } 
                else
                {
                    //alert(resp);            
                    //alertify.success(resp + " :(");
                    alert("No existen datos" + " :(");
                    //console.log (resp);

                }
            }
        });
    }
    else
    {
        child_id.forEach(function(elemento, indice, array) {
            console.log(elemento, indice);
            $(`select#${elemento}`)
                .empty()
                .append('<option selected="selected" value="0">- Seleccione -</option></option>');
        })

    }
}

function getAjax (urlPath, str){
    return $.ajax({
        url:urlPath,
        type:'POST',
        data: str});
}