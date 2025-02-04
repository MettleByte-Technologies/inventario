<?php
    //require "../database/connectDB.php";
    require_once "../data/country.php";

    $obj = new csCountry();

    //echo "pruebas";

    if ($action = "select"){
        $resulset = $obj->getCountries();     
    }
    
?>