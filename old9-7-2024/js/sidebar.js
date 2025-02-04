/*--- End current session ---*/
$("a.nav-link").click(function(e){
    var idTag = $(this).attr('id');
    //alert(idTag);
    e.preventDefault();

   switch(idTag){
      case "home":
         window.location.href= "../modules/";
         break;
      case "logout":
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
         break;

      case "company":                
         $.ajax({
            url:'../modules/company.php',
            type:'POST',
            data: null,
            success: function(resp) {
               if(resp == "../") 
               {
                  window.location.href= resp;
               } 
               else 
               {
               $("#title-content").html("<h2>Empresa</h2>");  
               $("#content").html(resp);  
      
               }
            }
         });
         break;

      case "billing":                //Ordenes
         $.ajax({
            url:'../modules/order_list.php',
            type:'POST',
            data: {vend_codigo:$("input[name='id_vendedor']").val(),
                vend_empresa:$("input[name='id_empresa']").val()},
            success: function(resp) {
               if(resp == "../") 
               {
               window.location.href= resp;
               } 
               else 
               {
               $("#title-content").html("<h2>Pedidos</h2>");  
               $("#content").html(resp);  

               }
            }
         });
         break;

      case "product":                //Inventarios
         $.ajax({
            url:'../modules/inventory.php',
            type:'POST',
            data: null,
            success: function(resp) {
               if(resp == "../") 
               {
                  window.location.href= resp;
               } 
               else 
               {
               $("#title-content").html("<h2>Inventario</h2>");  
               $("#content").html(resp);  

               }
            }
         });
         break;

      case "customer":      //Usuarios          
         $.ajax({
            url:'../modules/user.php',
            type:'POST',
            data: null,
            success: function(resp) {
               if(resp == "../") 
               {
                  window.location.href= resp;
               } 
               else 
               {
               $("#title-content").html("<h2>Usuarios</h2>");  
               $("#content").html(resp);  

               }
            }
         });
         break;

      case "supplier":                //Clientes
         $.ajax({
            url:'../modules/client_list.php',
            type:'POST',
            data: {vend_codigo:$("input[name='id_vendedor']").val(),
                  vend_empresa:$("input[name='id_empresa']").val(),
                  client:'',
                  type: 'list'},
            success: function(resp) {
               if(resp == "../") 
               {
                  window.location.href= resp;
               } 
               else 
               {
               $("#title-content").html("<h2>CLientes</h2>");  
               $("#content").html(resp);  

               }
            }
         });
         break;


      case "security":                
         $.ajax({
            url:'../modules/security.php',
            type:'POST',
            data: null,
            success: function(resp) {
               if(resp == "../") 
               {
                  window.location.href= resp;
               } 
               else 
               {
               $("#title-content").html("<h2>Administración</h2>");  
               $("#content").html(resp);  

               }
            }
         });
         break;

    }
 });
 