<?php
    require_once "../config/inc.php";
    require_once "../data/order.php";


    //var_dump(isset($_POST['vend_codigo']));
    if (isset($_POST['vend_codigo']) && isset($_POST['vend_empresa']) && isset($_POST['client']))
    {
        $vend_codigo = $_POST['vend_codigo'];
        $vend_empresa = $_POST['vend_empresa'];
        $client = $_POST['client'];

            $obj = new csOrder();


            $orderNew = $obj->setOrderHeader($vend_empresa, $vend_codigo, $client, 0, 0, 0, $vend_codigo);     

            //echo $orderNew;
            echo json_encode($orderNew);
    }
    else{
        echo json_encode(array("error"=>3000, "data"=>"Error en parametros de sesión ".$_POST['client']));
    }
?>