<?php 
    //require_once "../config/inc.php";

    $action = "select";
    include "../business/product.php";

    //var_dump(sizeof($productslist["data"]));
    //var_dump($productslist);
    //if ($productslist != "No existen datos")
?>
<?php 
    if ($productslist["error"] == 200) //Codigo 200 ==> request Ok
    {

        $item = $productslist["data"][0];
        $item = ($item["PRODUCTO"] == "NULL" ? '' : $item["PRODUCTO"]);
            
        if (gettype($productslist) == "array" && $item != "")        
        {        
            $firstKey = "_cantidad";
            //if (sizeof($productslist["data"]) > 1) 
            if (count($productslist["data"]) > 1) 
                $firstKey = ($productslist["data"][0]["PRODUCTO"]);
            //$firstKey = ($productslist["data"][0]["PRODUCTO"]);
            //var_dump(count($productslist["data"]));
?>    



    <script type="text/javascript" src="../js/product.js"></script>



<?php
        }      
        else
        {
            echo ($productslist);;
            //echo json_encode($productslist);;
            //echo 409;
        }  
    }
    else
    {
        //echo json_encode($productslist);;
        //echo $productslist["error"];
        echo 204;
    }  

?>
