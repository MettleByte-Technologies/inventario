$("#updateUser").click(function(e){
    e.preventDefault();

    //console.log ('update user');

    cadena = "../modules/user-edit.php";

         $.ajax({
            url:cadena,
            type:'POST',
            data: null,
            success: function(resp) {
               if(resp == "../") 
               {
                  window.location.href= resp;
               } 
               else 
               {
               $("#title-content").html("<h2>Actualizar Usuario</h2>");  
               $("#content").html(resp);  
      
               }
            }
         });

 });






/*--- insert company ---*/
$("#editU").click(function(e){
    console.log ('insert company');
    e.preventDefault();

    cadena = "../modules/user-edit.php";

    //alert (cadena);
    window.location.href= cadena;

 });
 


/*--- Class required ---*/
$(".modal-body input")
   .blur(function(e){
      if ($(this).attr('id') == "company_special_taxpayer_0" || $(this).attr('id') == "company_special_taxpayer_1"){
         console.log($(this).attr('id'));         
      }
      else{
         if ($.trim($(this).value) == "")
            $(this).addClass("is-invalid");
      }

   })
   .focus(function(e){
      $(this).removeClass("is-invalid");
 });

 $(".modal-body textarea")
   .blur(function(e){
      if ($.trim($(this).value) == "")
         $(this).addClass("is-invalid");
   })
   .focus(function(e){
      $(this).removeClass("is-invalid");
 });


 $(".modal-body select")
 .blur(function(e){
      $(this).addClass("is-invalid");
 })
 .focus(function(e){
    $(this).removeClass("is-invalid");
});
