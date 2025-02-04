<?php 
    /******************** init session ***********************/
    require_once "../config/inc.php";
    //require_once "../database/connectDB.php";
    require_once "../data/user.php";


    //if(isset($_POST['username']) && $_POST['username'] != '' && isset($_POST['password']) && $_POST['password'] != '') 
    if(isset($_POST['username']) && isset($_POST['password'])) 
    {
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);

        if($username != "" && $password != "") 
        {
            $obj = new csUser();

            try 
            {
                    $valid = $obj->getAuthentication($username, $password);                    
            } 
            catch (Exception $e) 
            {
                echo "Error : ".$e->getMessage();
            }
        } 
        else 
        {
            //echo "Both fields are required!";
            echo "Both fields are required!";
        }
    } 
    else 
    {
        header('location:./');
    }
?>