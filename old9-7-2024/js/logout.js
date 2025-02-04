/*--- End current session ---*/
$("a#logout").click(function(e){
   //alert ('Finalizando sesion');
   e.preventDefault();
   $.ajax({
      url:'../data/logout.php',
      type:'POST',
      data: null,
      success: function(resp) {
         if(resp == "../") 
         {
            window.location.href= resp;
         } 
         //else if(resp != "home.php") 
         else 
         {
            //window.location.href= resp;
            $("#errorMsg").html(resp);  

         }
      }
   });
});



/*--- Not used ---*/
$(document).ready(function() {                 
    $("#logout_form").submit(function(e){
        //alert ('Finalizando sesion');
      e.preventDefault();
      $.ajax({
         url:'../data/logout.php',
         type:'POST',
         data: null,
         success: function(resp) {
            if(resp == "../") 
            {
                window.location.href= resp;
            } 
            //else if(resp != "home.php") 
            else 
            {
               //window.location.href= resp;
               $("#errorMsg").html(resp);  

            }
         }
     });
  });


});