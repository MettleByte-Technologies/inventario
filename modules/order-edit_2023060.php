<?php 
    //require_once "../config/inc.php";

    $action = "select-client";
    $edit = 1;
    require_once "../business/client.php";

    // Parse PHP associative array to generate modules list
    //foreach($companies as $row){
    //var_dump($clientData);
    $clientData = $orderData[0];
    $orderHeader = $orderData[1]["data"][0];
    $orderDetail = $orderData[2];

    //var_dump($orderHeader);
    
    $clientObj = $clientData["data"][0];
    //var_dump($clientObj);
    //require_once "../business/order-save.php";        

    //var_dump(json_encode($orderDetail));
?>
<div class="container">
    <script>
        var json_var = <?php echo json_encode($orderDetail); ?>;
        var dataNotaVenta = <?php echo $orderHeader["PEDI_ALFA"]; ?>;
    </script>
    <input type="hidden" id="data-det" name="data-det" value="<?php echo json_encode($orderDetail); ?>"/>
    <input type="hidden" id="data-NotaVenta" name="data-NotaVenta" value="<?php echo $orderHeader["PEDI_ALFA"]; ?>"/>
    <div class="cliente-data">    
        <div class="row">
            <div class="col-sm-2">
                <label for="CODIGO"><h3>PEDIDO #</h3></label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm"><h3><?php echo $order_id; ?></h3></label>
                <input type="hidden" id="nOrder" name="nOrder" value="<?php echo $order_id; ?>">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2">
                <label for="CODIGO">CODIGO CLIENTE</label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm" ><?php echo $clientObj["CODIGO"]; ?></label>
                <input type="hidden" id="client-id" name="client-id" value="<?php echo $clientObj["CODIGO"]; ?>">
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

    <?php 

        // Parse PHP associative array to generate modules list
        //foreach($companies as $row){
        //var_dump($clientData);
        //$clientObj = $clientData["data"][0];
        //var_dump($clientObj);
    ?>

    <div class="alert alert-warning alert-dismissable" id="divCreatePedido">                    
        <strong><div id="titleCreatePedido"></div></strong><div id="messageCreatePedido"></div>
    </div>

    <div class="alert alert-warning alert-dismissable" id="register-alert">
        <!--<button type="button" class="close" data-dismiss="alert">&times;</button>-->  
        <strong>¡Cuidado!</strong> Este producto ya esta registrado.
    </div>
    <div class="alert alert-warning alert-dismissable" id="qty-alert">
        <!--<button type="button" class="close" data-dismiss="alert">&times;</button>-->  
        <strong>¡Cuidado!</strong> Cantidad ingresada es Inválida.
    </div>
    <div class="alert alert-warning alert-dismissable" id="stock-alert">
        <!--<button type="button" class="close" data-dismiss="alert">&times;</button>-->  
        <strong>¡Cuidado!</strong> Cantidad solicitada supera el stock.
    </div>

    <div class="row">
        <div class="col-sm">
            <div class="input-group mb-3">
                <span class="input-group-text feather-shopping-cart" id="basic-addon1"></span>
                <input type="text" id="product" name="product" class="form-control" placeholder="Producto a buscar" aria-label="Productos" aria-describedby="basic-addon1">    
            </div>
        </div>
    </div>

    <div class="row" id="dQtyItem">
        <div class="col-sm">
            <div class="input-group mb-3">
                <span class="input-group-text feather-hash" id="basic-addon1"></span>
                <input type="text" id="qtyItem" name="qtyItem" class="form-control" placeholder="Cantidad" aria-label="Cantidad" aria-describedby="basic-addon1">    
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm">
            <div class="input-group mb-3">
                <span class="input-group-text " id="basic-addon1">Marca</span>
                <select id="select-marca" class="form-select form-select-sm" aria-label=".form-select-sm example">
                </select>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm">
            <div class="input-group mb-3">
                <span class="input-group-text " id="basic-addon1">Línea</span>
                <select id="select-linea" class="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0" selected>-- Seleccionar Línea--</option>
                </select>
            </div>
        </div>
    </div>
    
    <div id="loading" class="width=100%;"><img src="../ico/loading.gif" alt="Loading" width="150px"></div>
    <div id="product-list"></div>
    </br>

    <div id="product-list"></div>
    </br>

    
    <div id="order-new-list"></div>
    <input type="hidden" name="product-list-selected" id="product-list-selected"/>

    <!--<div class="row">
            <div class="col-sm-2">
                <label for="CODIGO">CODIGO</label>
            </div>
            <div class="col-sm-10">
                <label class="form-control-sm" id="client-id" name="client-id"><?php echo $clientObj["CODIGO"]; ?></label>
            </div>
    </div>-->

    <div class="row" >
        <div class="col-sm">
            <h3>Pedido #<label id="nOrder"><?php echo $order_id; ?></label></h3>
        </div>

        <!--<div class="col-sm-2">
            <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Exportar a Excel">
                <button class="btn btn-primary" id="export-excel">
                    Excel 
                    <span class="feather-download"></span>
                </button>
            </span>            
        </div>-->
        <!--<div< class="col-sm-2">
            <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Guardar Pedido">
                <button class="btn btn-primary" id="save-items">
                    Guardar 
                    <span class="feather-save"></span>
                </button>
            </span>            
        </div>-->
    </div>
        
    <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Nota Venta">
                <input type="checkbox" id='notaventa' name='notaventa' style="display: hidden;"/>
                    Nota Venta 
    </span>        
    </br>
    </br>




    <div class="row">
        <div class="col-sm">        
            <table id="tableOrder" class="display compact" width="100%">
                
            </table> 
                
                
        </div>
    </div>




    <div class="row totales">
        <div class="col-sm-4"></div>
        <div class="col-sm">
            <b>Total</b>
        </div>
        <div class="col-sm">
            <b>Cantidad:</b> <label id="total-items"><?php echo 0; //number_format($orderHeader["PEDI_VALOR_PEDIDO"], 2); ?></label>
        </div>
        <div class="col-sm">
            <b>Descuento:</b> <label id="total-dscto"><?php echo 0.00; //number_format($orderHeader["PEDI_DESCUENTO_TOTAL"],2); ?></label>
        </div>
        <div class="col-sm">
            <b>A pagar:</b> <label id="total-pagar"><?php echo 0.00; //number_format($orderHeader["PEDI_PRECIO_VTA"],2); ?></label>
        </div>

        <!--        <div class="col-sm-12">

            <table class="table table-hover table-condensed table-bordered table-sm" id="table-pedido">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Producto</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Descuento</th>
                        <th scope="col">Total</th>
                        <th scope="col">Fecha de registro</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Total</th>
                        <th scope="col">Cantidad:</th>
                        <th scope="col"><label id="total-items">0</label></th>
                        <th scope="col">Descuento:</th>
                        <th scope="col"><label id="total-dscto">0.00</label></th>
                        <th scope="col">Total:</th>
                        <th scope="col"><label id="total-pagar">0.00</label></th>
                        <th scope="col"></th>
                    </tr>                    
                </tfoot>
            </table>
        </div>-->
    </div>
    
    <div class="row">
        <div class="col-sm">
            <div class="input-group mb-3">
                <span class="input-group-text feather-file-text" id="basic-addon2"></span>
                <input type="text" id="pedi-observ" name="pedi-observ" class="form-control"  placeholder="Observaciones del pedido" aria-label="Productos" aria-describedby="basic-addon2" value='<?php echo $orderHeader["PEDI_OBSERVACION"]; ?>'>    
            </div>
        </div>
    </div>    
    
</div>

<script type="text/javascript" src="../js/product_marca_linea.js"></script>
<script type="text/javascript" src="../js/order-edit.js"></script>
