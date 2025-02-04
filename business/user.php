<?php
    require_once "../data/user.php";

    $obj = new csUser();

    if ($action = "select"){
        $users = $obj->getUsers();     
    }else if ($action = "update")
        $users = $obj->getgetUser($id);     
    
    //$clase = $obj->clase;
?>