<?php 
    /******************** init session ***********************/
    require_once "../config/inc.php";

    /******************** destroy session ***********************/
    try
    {
        session_destroy();

        session_unset();
    
        echo '../';
    }
    catch (Exception $e) 
    {
        echo "Error : ".$e->getMessage();
    }

?>