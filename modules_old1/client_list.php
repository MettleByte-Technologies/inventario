<?php 
    $action = "select-list";
    include "../business/client.php";

    if (gettype($clientlist) == "array")
    {
?>    
    <div class="row">
        <div class="col-sm-12">
            <table id="tableClient" class="display" style="width:100%">
                <thead>
                    <tr>
                <?php
                    //echo 'type: '.$type;
                    if (strlen($type) == 0){
                ?>
                        <th></th>
                <?php                        
                    }
                ?>
                        <th>Código Cli</th>
                        <th>Regional</th>
                        <th>RUC</th>
                        <th>Zona</th>
                        <th>Razon Social</th>
                        <th>Dirección</th>
                        <th>Propietario</th>
                        <th>Cupo</th>
                        <!--<th>Fecha Ingreso</th>-->
                        <th>Teléfono</th>
                        <th>Forma de Pago</th>
                        <th>Localidad</th>
                        <!--<th>Tipo</th>
                        <th>Tipo de Cliente</th>-->
                    </tr>
                </thead>
                <tbody>
                <?php 
                    foreach($clientlist["data"] as $row){
                ?>
                    <tr>
                <?php
                    if (strlen($type) == 0){
                ?>
                        <td>                        
                            <div>
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Seleccionar Cliente">
                                    <input type="radio" name="codigo" id="<?php echo $row["CODIGO"]; ?>" />
                                </span>
                            </div>
                        </td>
                <?php
                    }
                ?>
                        <!--<td><?php echo $row["empresa"]; ?></td>-->
                        <td><?php echo $row["CODIGO"]; ?></td>
                        <td><?php echo $row["REGIONAL"]; ?></td>
                        <td><?php echo $row["RUC"]; ?></td>
                        <td><?php echo $row["ZONA"]; ?></td>
                        <td><?php echo $row["RAZON_SOCIAL"]; ?></td>
                        <td><?php echo $row["DIRECCION"]; ?></td>
                        <!--<td><?php echo $row["LISTA_PRECIO"]; ?></td>-->
                        <!--<td><?php echo $row["EMAIL"]; ?></td>-->
                        <td><?php echo $row["NOMBRE_PROPIETARIO"]; ?></td>
                        <td><?php echo $row["CUPO_CRED"]; ?></td>
                        <!--<td><?php echo $row["FECHA_ING"]; ?></td>-->
                        <td><?php echo $row["TELEFONO"]; ?></td>
                        <td><?php echo $row["FORMA_PAGO"]; ?></td>
                        <td><?php echo $row["LOCALIDAD"]; ?></td>
                        <!--<td><?php echo $row["TIPO"]; ?></td>
                        <td><?php echo $row["TIPO_CLIENTE"]; ?></td>-->
                        <!--<td><?php echo $row["ESTADO"]; ?></td>-->
                    </tr>               
                <?php 
                    }      

                ?>
                </tbody>
            </table>
            
        </div>
    </div>
    <script type="text/javascript" src="../js/client.js"></script>
<?php 
    }      

?>
