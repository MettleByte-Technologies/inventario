<?php
    require_once "../config/inc.php";
    require_once "../data/order.php";

    //$_SESSION['format-table'] = "false";

    if (isset($_POST['vend_codigo']) && isset($_POST['vend_empresa']))
    {
        $obj = new csOrder();

        $vend_codigo = $_POST['vend_codigo'];
        $vend_empresa = $_POST['vend_empresa'];

        if (isset($_POST['action']))
        {
            $action = $_POST['action'];

            if ($action == "selectArray"){
                $estado = $_POST['estado'];
                $orderlist = $obj->getOrderListArray($vend_empresa, $vend_codigo, $estado, 1);     
                //var_dump($orderlist);
                echo json_encode($orderlist);
            }

            if ($action == "selectArrayOld"){
                $estado = $_POST['estado'];
                $orderlist = $obj->getOrderListArrayOld($vend_empresa, $vend_codigo, $estado, 1);     
                //var_dump($orderlist);
                echo json_encode($orderlist);
            }

            if ($action == "selectArrayExpress"){
                $estado = $_POST['estado'];
                $orderlist = $obj->getOrderListArrayExpress($vend_empresa, $vend_codigo, $estado, 1);     
                //var_dump($orderlist);
                echo json_encode($orderlist);
            }

            if ($action == "export-file-order"){
                //$estado = $_POST['estado'];
                $orderlist = $obj->getOrderListArrayExport($vend_empresa, $vend_codigo, $_POST['nOrder']);     
                echo json_encode($orderlist);
            }

            if ($action == "sent-order"){
                $list = explode(',', $_POST['sentorders']);
    
                foreach($list as $s)
                    $orderlist = $obj->sentOrder($vend_empresa,  $s);     
                //var_dump($orderlist);
    
                //$orderlist = $obj->getOrderListArray($vend_empresa, $vend_codigo, 1);
                echo json_encode($orderlist);
            }

            if ($action == "export-order"){
                $orderlist = $obj->approveOrder($vend_empresa,  $_POST['nOrder']);     
                //$orderlist = $obj->reviewOrder($vend_empresa,  $_POST['nOrder']);     

                echo json_encode($orderlist);
            }

            if ($action == "export-order-review"){
                //$orderlist = $obj->approveOrder($vend_empresa,  $_POST['nOrder']);     
                $orderlist = $obj->reviewOrder($vend_empresa,  $_POST['nOrder']);     

                echo json_encode($orderlist);
            }

            if ($action == "reprove-order"){
                //$deuda = 'D';
                //if ($_POST['deuda'] == '1') $deuda = 'F';
                $deuda = $_POST['deuda'];

                $observ = $_POST['observ'];

                $orderlist = $obj->reproveOrder($vend_empresa,  $_POST['nOrder'], $deuda, $observ);     

                echo json_encode($orderlist);
            }

            if ($action == "delete-order"){
                $list = explode(',', $_POST['delorders']);
    
                foreach($list as $s)
                    $orderlist = $obj->deleteOrder($vend_empresa,  $s);     
                //var_dump($orderlist);
    
                //$orderlist = $obj->getOrderListArray($vend_empresa, $vend_codigo, 1);
                echo json_encode($orderlist);
            }

            if ($action == "delete-item"){
                $list = explode(',', $_POST['delorders']);
    
                //var_dump ($list);
                foreach($list as $s)
                    $orderlist = $obj->deleteItem($vend_empresa, $_POST['nOrder'], $s);     

                $obj->updateHeaderOrder($vend_empresa, $_POST['nOrder'], $_POST['tot_qty'], $_POST['total_dscto'], $_POST['total_pagar']);
                //echo json_encode($orderlist);

                echo json_encode(array("error"=>0, "data"=>"Item(s) eliminados"));                
            }

        }
        else
        {
            if ($action == "select"){
                $orderlist = $obj->getOrderList($vend_empresa, $vend_codigo, 1);     
            }    
        }


       /* if ($action == "select-order" && isset($_POST['nOrder'])){
            //var_dump($_POST['nOrder']);
            $order = $obj->getOrder($_POST['nOrder']);     
        }*/


    }    

    
    //$clase = $obj->clase;
?>