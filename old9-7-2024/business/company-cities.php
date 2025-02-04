<?php
    require_once "../data/company.php";

    $obj = new csCompany();

    $action = $_POST["action"];

    if ($action = "select"){
        $name_id = $_POST["state_id"];        
        $resulSet = $obj->getCities($name_id);

        echo json_encode($resulSet);
    }

?>