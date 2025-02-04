<?php    
    $action = "select";
    include "../business/client.php";

    echo json_encode($clientlist);            
    //var_dump($action);
?>
