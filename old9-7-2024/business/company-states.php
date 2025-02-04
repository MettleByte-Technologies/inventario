<?php
    require_once "../data/company.php";

    $obj = new csCompany();

    $action = $_POST["action"];

    if ($action = "select"){
        $name_id = $_POST["country_id"];        
        $resulSet = $obj->getStates($name_id);

        echo json_encode($resulSet);
    }

?>