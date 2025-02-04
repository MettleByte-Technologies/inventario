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
                $orderlist = $obj->getOrderListArray($vend_empresa, $vend_codigo, 1);     
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