$(document).ready(function() {                 
    $("#invalid").hide();
    $("#modules").hide();
    $("#fields").hide();

    $("#login_form").submit(function(e){
        e.preventDefault();
        var strUsername = $("#username").val().trim();
        var strPassword = $("#password").val().trim();
        
        if (strUsername.length >0 && strPassword.length > 0)
            $.ajax({
                url:'business/authentication.php',
                type:'POST',
                data: {username:strUsername, password:strPassword},
                success: function(resp) {
                    if(resp == "invalid") 
                    {
                        alertMsg("#invalid");

                    } 
                    else if(resp != "modules/") 
                    {
                        $("#modules").html(resp);
                        alertMsg("#modules");
                    }
                    else
                    {
                        //alertMsg(resp);
                        window.location.href= resp;
                    }
                }
            });
        else
        {
            alertMsg("#fields");
        }
  });
});