$(document).ready(function() {                 
    $("#login_form").submit(function(e){
      e.preventDefault();
      $.ajax({
         url:'data/check_authentication.php',
         type:'POST',
         data: {username:$("#username").val(), password:$("#password").val()},
         success: function(resp) {
            //alert (resp);
            if(resp == "invalid") 
            {
               $("#errorMsg").html("Invalid username and password!");  
            } 
            //else if(resp != "home.php") 
            else if(resp != "modules/") 
            {
               //window.location.href= resp;
               $("#errorMsg").html(resp);  

            }
            else if(resp == "Both fields are required!") 
            {
               //window.location.href= resp;
               $("#errorMsg").html(resp);  

            }
            else
            {
               window.location.href= resp;
            }
         }
     });
  });
});