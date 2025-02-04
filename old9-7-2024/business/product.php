<?php
    //require_once "../config/inc.php";
    require_once "../data/product.php";

    $obj = new csProduct();

    //if(isset($_POST['product']))
    if (isset($_POST['vend_codigo']) && isset($_POST['vend_empresa']) && isset($_POST['client']) && isset($_POST['product']))
    {
        $product = trim($_POST['product']);
        $empresa_id = $_POST['vend_empresa'];
        $vendedor_id = $_POST['vend_codigo'];
        $client = $_POST['client'];

        if ($action = "select"){

            //$clients = $obj->getClients();     
            $productslist = $obj->getProducstCondition($product, $empresa_id, $vendedor_id, $client);
            //var_dump($productslist);
        }
        else
            echo json_encode(array("error"=>3000, "data"=>"Error, no existen proceso para la accion requerida $action"));
        
        //$clase = $obj->clase;
    }

?>