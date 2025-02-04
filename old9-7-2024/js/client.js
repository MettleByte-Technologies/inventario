$(document).ready(function() {
    $('#tableClient').DataTable( {
        //"paging":   false,
        //"ordering": false,
        "info":     false,
        "searching": false,
        "language": {
            "url": "../config/Spanish.json"
        }
    } );
    
   /*--- nueva orden ---*/
   $("input[name='codigo']").click(function(e){
       //e.preventDefault();
       $("#next-head").attr('disabled', false);
       $("#next-footer").attr('disabled', false);

      $("#client-id").val($(this).attr('id'));

      //console.log($(this).attr('id'));
      console.log($("#client-id").val());
   });
   
});