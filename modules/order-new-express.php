<?php 
    //require_once "../config/inc.php";

    $action = "select-client";
    $edit = false;
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
        <!--<div class="col-sm-2">
            <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Guardar Pedido">
                <button class="btn btn-primary" id="save-items">
                    Guardar 
                    <span class="feather-save"></span>
                </button>
            </span>            
        </div>-->
    </div>

    <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Nota Venta">
                <input type="checkbox" id='notaventa' name='notaventa'/>
                    Nota Venta 
                  
    </span>        
    </br>
    </br>

    <div class="row">
        <div class="col-sm-2">
            <label for="lblProduct">Producto</label>
        </div>
        <div class="col-sm-10">
            <label class="form-control-sm"><?php echo $clientObj["LOCALIDAD"]; ?></label>
        </div>
    </div>

    <div class="row">
        <div class="col-sm">        
            <label id="lblProduct">Producto</label>
            <input type="text" name="producId" id="producId" CssClass="txt-observ" value=""/>
            <label id="lblQty">Cantidad</label>
            <input type="text" name="producQty" id="producQty" CssClass="txt-observ" value=""/>
        </div>
    </div>


    <div class="row">
        <div class="col-sm">        
            <table id="tableOrder" class="display compact" width="100%"></table>            
        </div>
    </div>




    <!--<div class="row totales">
        <div class="col-sm-4"></div>
        <div class="col-sm">
            <b>Total</b>
        </div>
        <div class="col-sm">
            <b>Cantidad:</b> <label id="total-items">0</label>
        </div>
        <div class="col-sm">
            <b>Descuento:</b> <label id="total-dscto">0.00</label>
        </div>
        <div class="col-sm">
            <b>A pagar:</b> <label id="total-pagar">0.00</label>
        </div>
    </div>-->

    <div class="row"  style="display: none">
        <div class="col-sm">
            <div class="input-group mb-3">
                <span class="input-group-text feather-file-text" id="basic-addon2"></span>
                <input type="text" id="pedi-observ" name="pedi-observ" class="form-control" placeholder="Observaciones del pedido" aria-label="Productos" aria-describedby="basic-addon2">    
            </div>
        </div>
    </div>
    
</div>

<script type="text/javascript" src="../js/order-new-express.js"></script>
