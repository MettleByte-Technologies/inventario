<?php
    //require_once "../config/inc.php";
    require_once "../data/product.php"; 

    $obj = new csProduct();

    //if(isset($_POST['product']))
    if (isset($_POST['empresa']) && isset($_POST['client']) && isset($_POST['product']) && isset($_POST['stock_upd']))
    {
        $empresa = $_POST['empresa'];
        $client = $_POST['client'];
        $product = trim($_POST['product']);
        $stock = $_POST['stock_upd'];

        if ($action = "select"){

            //$clients = $obj->getClients();     
            $obj->setProducStock($empresa, $product, $stock);
            //echo '{"dscto":"'.$productresult["data"][0]["PORC_DSCTO"].'"}';  
        }
        
        //$clase = $obj->clase;
    }

?>