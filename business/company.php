<?php
    require_once "../data/company.php";

    $obj = new csCompany();

    if ($action = "select"){
        $companies = $obj->getCompanies();     
        $countries = $obj->getCountries();     
        $states    = null;     
        $cities    = null;     
    }
    
    //$clase = $obj->clase;
?>