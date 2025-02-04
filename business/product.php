<?php
    //require_once "../config/inc.php";
    require_once "../data/product.php";

    $obj = new csProduct();

    //if(isset($_POST['product']))
    if (isset($_POST['vend_codigo']) && isset($_POST['vend_empresa']) && isset($_POST['client']))
    {
        $empresa_id = $_POST['vend_empresa'];
        $vendedor_id = $_POST['vend_codigo'];
        $client = $_POST['client'];

        /*if (isset($_POST['linea'])){
            $cod_linea = $_POST['linea'];

            //$productslist = $obj->getProducstConditionSP("", $empresa_id, $vendedor_id, $client, $cod_linea);
            $productslist = $obj->getGetDiscountProductSP($empresa_id, $client, $id_codigom, $cod_linea, 2);
            //$productslist='hola';
        }
        
        if (isset($_POST['product'])){
            $product = trim($_POST['product']);
            if ($action == "select"){

                //$clients = $obj->getClients();     
                $productslist = $obj->getProducstConditionSP($product, $empresa_id, $vendedor_id, $client);
                //var_dump($productslist);
            }
            else if ($action == "select-inv"){

                //$clients = $obj->getClients();     
                $productslist = $obj->getProducstCondition($product, $empresa_id, $vendedor_id, $client);
                //var_dump($productslist);
            }
            else
                echo json_encode(array("error"=>409, "data"=>"Error, no existen proceso para la accion requerida $action"));

        }*/

        if (isset($_POST['productm']) && isset($_POST['productl'])){
            $productm= trim($_POST['productm']);
            $productl = intval(trim($_POST['productl']));
            if ($action == "select"){
                //$clients = $obj->getClients();  
                $tipo = 1;
                if ($productl > 0) $tipo = 2;                
                $productslist = $obj->getGetDiscountProductSP($empresa_id, $client, $productm, $productl, $tipo);
                //var_dump($productslist);
            }
            else if ($action == "select-inv"){

                //$clients = $obj->getClients();     
                $productslist = $obj->getProducstCondition($product, $empresa_id, $vendedor_id, $client);
                //var_dump($productslist);
            }
            else
                echo json_encode(array("error"=>409, "data"=>"Error, no existen proceso para la accion requerida $action"));

        }

        if (isset($_POST['product'])){
            $product = trim($_POST['product']);
            if ($action == "select"){
                if (strlen($product) > 0)
                {
                    //$clients = $obj->getClients();     
                    $productslist = $obj->getProducstConditionSP($product, $empresa_id, $vendedor_id, $client);
                    
                    //var_dump($productslist);
                }
                else
                    //echo json_encode(array("error"=>409, "data"=>"Debe ingresar un texto o codigo para ejecutar el proceso la busqueda"));
                    echo 409;
            }
            else if ($action == "select-inv"){

                //$clients = $obj->getClients();     
                $productslist = $obj->getProducstCondition($product, $empresa_id, $vendedor_id, $client);
                //var_dump($productslist);
            }
            else{
                echo json_encode(array("error"=>409, "data"=>"Error, no existen proceso para la accion requerida $action"));
            }

        }

        //$clase = $obj->clase;
    }

?>