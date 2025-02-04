<?php
    require_once "../config/inc.php";
    require_once "../data/order.php";


    //var_dump(isset($_POST['vend_codigo']));
    if (isset($_POST['nOrder']) && isset($_POST['vend_codigo']) && isset($_POST['vend_empresa']) && isset($_POST['client']) && isset($_POST['order'])  && isset($_POST['action']))
    {
        $noOrder = ($_POST['nOrder']);
        $vendedor_id = $_POST['vend_codigo'];
        $empresa_id = $_POST['vend_empresa'];
        $client = $_POST['client'];
        $action = $_POST['action'];
        $observ = $_POST['observ'];
        $notaventa = $_POST['notaventa'];
        $bodega = $_POST['bodega'];

        //var_dump(json_decode('[{"foo": 5}, {"foo": 8}]'));
        $obj = new csOrder();

        switch ($action){
            case "insert-item":
                $items = json_decode($_POST['order']);
        
                $totals = json_decode($_POST['orderh']);
        
                /*$obj->setTotalsOrder($nOrder, $totals->tot_qty, $totals->tot_dscto, $totals->total);
        
                foreach($items as $item)
                {
                    $obj->setOrderDetail($noOrder, $empresa_id, $vendedor_id, $client, $item->product, $item->qty, $item->valor, $item->dscto, $item->price);
                }*/
        
                $data = array();
                //$query = array_push("UPDATE `fa_pedido` SET PEDI_PRECIO_VTA = $total, PEDI_VALOR_PEDIDO = $tot_qty, PEDI_DESCUENTO_TOTAL = $tot_dscto WHERE PEDI_CODIGO_PEDIDO = $nOrder");
                
                array_push($data, [$totals[0]->total, (float)$totals[0]->tot_qty, $totals[0]->tot_dscto, $observ, '0', (int)$noOrder]);
                //array_push($data, [$totals[0]->total, (float)$totals[0]->tot_qty, $totals[0]->tot_dscto, (int)$noOrder]);
                array_push($data, [$empresa_id, $noOrder, $items[0]->product, $items[0]->qty, $items[0]->price, $items[0]->dscto, $items[0]->porcdscto, $items[0]->valor, $items[0]->qty, $items[0]->valor]);
        
                echo json_encode($obj->setOrderItemDetail($data));
        
                break;
            case "update-order":
                $items = ($_POST['order']);

                echo $obj->UpdateOrderTrx( $empresa_id, $noOrder, $notaventa, $items, $bodega);
                //echo json_decode($obj->UpdateOrderTrx( $empresa_id, $noOrder, $notaventa, $items));
                //$items = json_decode($_POST['order']);



                /*foreach($items as $item)
                {
                        ($obj->updateDetailOrderObserv( $empresa_id, $noOrder, $item->product, $item->newporc));
                }

                echo json_encode($obj->setOrderPendingSent($noOrder, $observ, $notaventa));*/
                break;                    
            case "update-order-aprove":
                $items = ($_POST['order']);
                $notaventa = $_POST['notaventa'];                        
                $observ = ($_POST['observ']);
                $estado = ($_POST['estado']);

                echo $obj->UpdateAproveOrderTrx( $empresa_id, $noOrder, $notaventa, $observ, $estado, $items, $bodega);
                break;                    
            case "update-order_old":
                $items = json_decode($_POST['order']);

                foreach($items as $item)
                {
                    ($obj->updateDetailOrderObserv( $empresa_id, $noOrder, $item->product, $item->newporc));
                }

                //var_dump($items);
                echo json_encode($obj->setOrderPendingSent($noOrder, $observ, $notaventa));                
                break;                    
        }

    }
    else
        "Error"
?>