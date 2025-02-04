$("#message").hide();

function alertMsg(id_name){
    $(id_name).fadeTo(4000, 1000).slideUp(500, function() {
        $(id_name).slideUp(500);
    });         
    $(id_name).show();      
}

function JsonToArray(json_data)
{
    var result = [];
    
    for(var i in json_data){
        result.push([json_data [i]]);
    }
    
    return result;
}

function rowJsonToArray(json_data)
{
    var result = [];
    
    for(var i in json_data){
        for(var j in json_data[i]){
            result.push(json_data [i][j]);
        }
    }
    
    return result;
}
