<?php 
    //require_once "../config/inc.php";

    $action = "select";
    include "../business/product.php";

    if ($productslist["error"] == 0)
    {

        $item = $productslist["data"][0];
        //$item = ($item["PRODUCTO"] == "NULL" ? '' : $item["PRODUCTO"]);
            
        if (gettype($productslist) == "array" && $item != "")        
        {        
?>    

        <div class="row">
            <div class="col-sm-12">
                <table id="tableProduct" class="hover" style="width:100%">
                    <thead>
                        <tr>
                            <!--<th></th>-->
                            <th>Producto</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>% Dscto</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php 
                        header('Content-type: image/jpg'); 

                        foreach($productslist["data"] as $row){
                    ?>
                        <tr>
                            <!--<td scope="row">                        
                                <div >
                                    <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Editar">
                                        <input type="checkbox" name="<?php echo $row["PRODUCTO"]; ?>" id="<?php echo $row["PRODUCTO"]; ?>">
                                    </span>
                                </div>
                            </td>-->
                            <td><?php echo $row["PRODUCTO"]; ?>  </td>
                            <td><?php echo $row["DESCRIPCION"]; ?>  </td>
                            <td><input type="text" id="_cantidad" value="0" /></td>
                            <!--<td><?php echo '15'; ?>                        -->
                            <td><?php echo $row["PRECIO_MY"]; ?>  </td>
                            <!--<td><?php echo $row["PRECIO_PU"]; ?>  </td>
                            <td><?php echo $row["COSTO"]; ?>  </td>-->
                            <!--<td><?php $min=0; $max=100; echo mt_rand($min,$max); ?>-->
                            <td><?php echo $row["SALDO_INV"]; ?>  </td>
                            <td><?php echo round($row["PORC_DSCTO"],4).' %'; ?>  </td>
                            <td>
                                
                                <?php if (strlen($row['FOTO']) > 0)
                                {
                                ?>
                                    <img src="data:image/jpeg;base64,<?php echo base64_encode($row['FOTO']);?>" alt="<?php echo $row['PRODUCTO'];?>" style="width: 10%;" class="zoom"/>                                
                                <?php
                                }
                                else
                                {
                                ?>
                                    <img src="" alt="<?php echo $row['PRODUCTO'];?>" style="width: 10%;"/>  
                                <?php
                                }
                                ?>
                                
                            </td>
                        </tr>                
                    <?php 
                        }      

                    ?>
                    </tbody>
                </table>
                
            </div>
        </div>
        <script type="text/javascript" src="../js/product.js"></script>



<?php
        }      
        else
        {
            echo "No existen datos";
        }  
    }
      else
    {
        echo "No existen datos";
    }  

?>
