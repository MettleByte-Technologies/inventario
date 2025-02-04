<?php
    /******************** init session ***********************/
    require_once "../config/inc.php";
    require_once "../data/client.php";
    
    //var_dump(isset($_POST['vend_codigo']));
    if (isset($_POST['vend_codigo']) && isset($_POST['vend_empresa']) && isset($_POST['client']))// && isset($_POST['order_id']))
    {
        $vend_codigo = $_POST['vend_codigo'];
        $vend_empresa = $_POST['vend_empresa'];
        $client = $_POST['client'];

        if (isset($_POST['order']))
        {
            $order_id = $_POST['order'];
        }

        $obj = new csClient();
        $estado = "0";

        if ($action == "select"){
            $clientlist = $obj->getClientBySeller($vend_empresa, $vend_codigo, $client);
            if (isset($_POST['type'])) $type = $_POST['type'];
            else $type = '';

            //echo json_encode($clientlist);            
        }

        if ($action == "select-list"){
            $clientlist = $obj->getClientBySeller($vend_empresa, $vend_codigo, $client);
            if (isset($_POST['type'])) $type = $_POST['type'];
            else $type = '';
        }

        //var_dump($edit);
        if ($action == "select-client")
        {
            if ($edit == 1)
            {

                $orderData = array();
                
                array_push($orderData,$obj->getClientById($vend_empresa, $vend_codigo, $client));
                array_push($orderData,$obj->getOrderHeaderListArray($order_id));
                array_push($orderData,$obj->getOrderDetailListArray($order_id));
                //var_dump($orderData);
            }
            else if ($edit == 2)
            {
                $orderData = array();
                
                array_push($orderData,$obj->getClientById($vend_empresa, $vend_codigo, $client));
                array_push($orderData,$obj->getOrderHeaderListArray($order_id));
                array_push($orderData,$obj->getOrderDetailListArray($order_id, $client));

                $estado = $_POST['estado'];
            }
            else
                $clientData = $obj->getClientById($vend_empresa, $vend_codigo, $client);
        }

        if ($action == "select-client-dscto")
        {
                $orderData = array();
                
                array_push($orderData,$obj->getClientById($vend_empresa, $vend_codigo, $client));
                array_push($orderData,$obj->getOrderHeaderListArray($order_id));
                array_push($orderData,$obj->getOrderDetailListDsctArray($order_id));
                //var_dump($orderData);
        }        
        if ($action == "select-order"  && isset($_POST['nOrder']))
        {
            //var_dump($_POST['nOrder']);
            $clientData = $obj->getClientByIdOrder($vend_empresa, $vend_codigo, $client, $_POST['nOrder']);
            //var_dump(expression)
        }
    }
    else
    {
        echo json_encode(array("error"=>3000, "data"=>"Error en consulta de clientes."));
    }

?>