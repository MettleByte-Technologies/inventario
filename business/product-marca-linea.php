<?php
    //require_once "../config/inc.php";
    require_once "../data/product.php";

    $obj = new csProduct();

    //if(isset($_POST['product']))
    if (isset($_POST['action']) && isset($_POST['vend_empresa']))
    {
        $action = trim($_POST['action']);
        $empresa_id = $_POST['vend_empresa'];

        if ($action == "marca"){
            $productslist = $obj->getProducsMarca($empresa_id);
            echo json_encode(array("error"=>200, "data"=>json_encode($productslist)));
        }
        else if ($action == "linea"){

            $productslist = $obj->getProducsLinea($_POST['marca'], $empresa_id);
            echo json_encode(array("error"=>200, "data"=>json_encode($productslist)));
        }
        else
            echo json_encode(array("error"=>409, "data"=>"Error, no existe un proceso para la accion requerida $action"));
        
        //$clase = $obj->clase;
    }

?>