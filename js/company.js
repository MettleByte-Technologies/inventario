/*--- insert company ---*/
$("#insertCompany").click(function(e){
    console.log ('insert company');
    e.preventDefault();

    cadena = "";

   try {
      //print "this is our try block n";
/*      var request = getAjax('../data/dmlCompany.php', cadena);

      request.done (function(resp) {
         if(resp == 1) 
         {
            //alertify.success("Agregado con exito :)");
         } 
         else 
         {
            //alertify.success("Fallo el registro :(");            
         }
      });                           
      request.fail (function(o){

      });
      request.always (function(o){
         console.log("always");      
         //alertify.success("Fallo el registro :(");            
         $('#modalNuevo').modal('hide');      
      });
*/
      urlPath = '../data/dmlCompany.php';
      strData = '';

      $.ajax({
         url:urlPath,
         type:'POST',
         data: strData,
         success: function(msg){
            console.log(msg);
         },
         error: function(error){
            console.error();
            console.log(error.statusText);
            console.log(error.responseText);
         },
         complete: function(msg){
            console.log(msg);
         }
      
      });


   } catch (error) {
         //print "something went wrong, caught yah! n";
         //$('#modalNuevo').modal('hide');      

   } finally {
         //print "this part is always executed n";
   }   
 });
 

/*--- Get selected country ---*/
$("select#country_id_0")
   .change(function(e){
    //getSelectedItem($(this), "country_id", "state_id", "state_name", "../business/company-states.php");
      getSelectedItem($(this), "country_id", ["state_id", "city_id"], "state_name", "../business/company-states.php");
   });


/*--- Get selected state ---*/
$("select#state_id").change(function(e){
    getSelectedItem($(this), "state_id", ["city_id"], "city_name", "../business/company-cities.php");
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
