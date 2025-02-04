$("#message").hide();

function alertMsg(id_name, id_title, id_message, title, message){
    $(id_title).html(title);
    $(id_message).html(message);    
    $(id_name).fadeTo(4000, 1000).slideUp(500, function() {
        $(id_name).slideUp(500);
    });         
    $(id_name).show();      

    //get class
    //$(this).attr('class')


    //add remove class
    //    $(this).addClass('transition');
    //    $(this).removeClass('transition');
}

jQuery.fn.ForceNumericOnly =  function() {
    return this.each(function() {
        $(this).keydown(function(e) {
            //console.log('keydown ==> ' + e.charCode + ' ' + e.keyCode );
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (
                key == 8 ||
                key == 9 ||
                key == 37 ||
                key == 39 ||
                key == 46 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105)
                );
        }).keypress(function(e) {
            //console.log('keypress ==> ' +  e.charCode + ' ' + e.keyCode + ' ');
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (
                (key >= 48 && key <= 57)
            );        
        });
    });
  };

jQuery.fn.ForceDecimalOnly = function() {
    return this.each(function() {
        var valid = ($(this).val().match(/^[0-9.]+\.\d{1,2}$/));        
        $(this).keydown(function(e) {
            console.log('keydown ==> ' + e.charCode + ' ' + e.keyCode );
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (
                valid ||
                key == 8 ||
                key == 9 ||
                key == 37 ||
                key == 39 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105)
            );
        }).keypress(function(e) {
            console.log('keypress ==> ' +  e.charCode + ' ' + e.keyCode + ' ');
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (
                valid ||
                key == 46 ||
                (key >= 48 && key <= 57)
            );       
        });

    });  

};


  (function ($){
    jQuery.fn.onlynums = function() {
  
        var permitidos = [48,49,50,51,52,53,54,55,56,57,188,190,96,97,98,99,100,101,102,103,104,105,110];
  
        //Controls
        permitidos.push(8); //Tecla borrar
        permitidos.push(32); //Tecla espacio
        permitidos.push(39); //Tecla flecha izq
        permitidos.push(37); //Tecla flecha drc
  
        $(this).keydown(function(event){
  
          if($.inArray(event.which, permitidos) == -1){
  
           return false;
  
          }
  
        });
  
    };
  })(jQuery);//End function.  


  jQuery.fn.ForceNumericOnlyBorrador =
  function() {
    return this.each(function() {
      $(this).keydown(function(e) {
        var key = e.charCode || e.keyCode || 0;
        // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
        return (
            key == 8 ||
            key == 9 ||
            key == 46 ||
            //(key >= 37 && key <= 40) ||
            (key >= 48 && key <= 57) /*||
            (key >= 96 && key <= 105)*/
        );
      });
    });
  };

jQuery.fn.ForceDecimalOnlyBorrador = function() {
    return this.each(function() {
        var permitidos = [48,49,50,51,52,53,54,55,56,57,188,190,96,97,98,99,100,101,102,103,104,105,110];

        //Controls
        permitidos.push(8); //Tecla borrar
        permitidos.push(9); //Tecla tab
        permitidos.push(32); //Tecla espacio
        permitidos.push(39); //Tecla flecha izq
        permitidos.push(37); //Tecla flecha drc
        permitidos.push(46); //Punto decimal

        var valid = ($(this).val().match(/^[0-9.]+\.\d{1,3}$/));

        $(this).keydown(function(event){
            if($.inArray(event.which, permitidos) == -1){
                return false || valid;
            }    

            return valid;
        });

        /*$(this).keydown(function(e) {
            console.log($(this).val());
            var valid = ($(this).val().match(/^[0-9.]+\.\d{1,3}$/));


            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (
            key == 8 ||
            key == 9 ||
            key == 46 ||
            (key >= 37 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105));
        });*/
    });
};

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
