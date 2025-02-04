<?php 
    //require_once "../config/inc.php";

    $action = "select-order";
    require_once "../business/client.php";

    // Parse PHP associative array to generate modules list
    //foreach($companies as $row){
    //var_dump($clientData);
    $clientObj = $clientData["data"][0];
    //var_dump($clientObj);
    //require_once "../business/order-save.php";

?>
<div class="container">
    <div class="cliente-data">    
        <div class="row">
            <div class="col-sm-2">
                <label for="CODIGO">PEDIDO #</label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm" id="client-id"><?php echo $clientObj["PEDI_CODIGO_PEDIDO"]; ?></label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <label for="CODIGO">CODIGO</label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm" id="client-id"><?php echo $clientObj["CODIGO"]; ?></label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <label for="RUC">RUC</label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm"><?php echo $clientObj["RUC"]; ?></label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <label for="NOMBRE">NOMBRE</label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm"><?php echo $clientObj["NOMBRE"]; ?></label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <label for="RAZON_SOCIAL">RAZON SOCIAL</label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm"><?php echo $clientObj["RAZON_SOCIAL"]; ?></label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <label for="DIRECCION">DIRECCION</label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm"><?php echo $clientObj["DIRECCION"]; ?></label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <label for="TELEFONO">TELEFONO</label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm"><?php echo $clientObj["TELEFONO"]; ?></label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <label for="DIRECCION">ZONA</label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm"><?php echo $clientObj["ZONA"]; ?></label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <label for="DIRECCION">LOCALIDAD</label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm"><?php echo $clientObj["LOCALIDAD"]; ?></label>
            </div>
        </div>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="col-sm-12">

            <table class="table table-hover table-condensed table-bordered table-sm">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Descuento</th>
                        <th scope="col">Total</th>
                        <!--<th scope="col">Stock</th>-->
                        <th scope="col">Fecha de registro</th>
                    </tr>
                </thead>
                <tbody>
                <?php 
                    //$action = "select-order";
                    //require_once "../business/order.php";

                    // Parse PHP associative array to generate modules list
                    //$row = $order['data'][0];
                    
                    $tqty = 0;
                    $tprice = 0.0;
                    $tdscto = 0.0;
                    $ttotal = 0.0;
                    //foreach($order['data'] as $row)

                    //var_dump($clientData["data"][0]);
                    foreach($clientData["data"] as $row)
                    //var_dump($order);
                    //var_dump($row);
                    {

                        $tqty = $tqty + $row['DEPE_CANTIDAD_PEDIDO'];
                        $tprice = $tprice + number_format(floatval($row['DEPE_PRECIO']),2);
                        $tdscto = $tdscto + number_format(floatval($row['DEPE_COSTO']),2);
                        $ttotal = $ttotal + number_format(floatval($row['DEPE_PRECIO_LISTA']),2);
                ?>
                    <tr> 
                        <td><?php echo $row['DEPE_CODIGO_PRODUCTO']; ?></td>
                        <td><?php echo $row['DESCRIPCION']; ?></td>
                        <td><?php echo $row['DEPE_CANTIDAD_PEDIDO']; ?></td>
                        <td><?php echo number_format(floatval($row['DEPE_PRECIO']),2); ?></td>
                        <td><?php echo number_format(floatval($row['DEPE_COSTO']),2); ?></td>
                        <td><?php echo number_format(floatval($row['DEPE_PRECIO_LISTA']),2); ?></td>
                        <!--<td><?php echo number_format(floatval($row['DEPE_PRECIO_LISTA'])); ?></td>-->
                        <td><?php echo $row['DEPE_FECHA_ENTREGA']; ?></td>
                        <!--<td><?php echo $row["company_id"]; ?>  </td>
                        <td><?php echo $row["city_id"]; ?>  </td>
                        <td><?php echo $row["company_IdNumber"]; ?>  </td>
                        <td><?php echo $row["company_name"]; ?>  </td>-->
                    </tr>                


                <?php 


                    }      

                ?>
                    <tr> 
                        <td></td>
                        <td>Total</td>
                        <td><?php echo $tqty; ?></td>
                        <td><?php echo $tprice; ?></td>
                        <td><?php echo $tdscto; ?></td>
                        <td><?php echo $ttotal; ?></td>
                        <!--<td><?php echo number_format(floatval($row['DEPE_PRECIO_LISTA'])); ?></td>-->
                        <td></td>
                    </tr>                
                </tbody>

            </table>
        </div>
    </div>
</div>

<script type="text/javascript" src="../js/order.js"></script>
