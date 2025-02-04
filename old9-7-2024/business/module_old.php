<?php
    require "../database/connectDB.php";
    require_once "../data/module.php";

    $modules = new csModule();

    if ($action = "select"){
        $resulset = $modules->getModules(); 
    }
    
?>