<?php 
    //require_once "../config/inc.php";

    $action = "select";
    include "../business/product.php";

    $item = $productslist["data"][0];
    $item = ($item["PRODUCTO"] == "NULL" ? '' : $item["PRODUCTO"]);
    //var_dump(($item));
    if (gettype($productslist) == "array" && $item != "")        
    {
?>    
    </br>
    </br>
    <div class="row">
        <div class="col-sm-12">
            <table id="tableProduct" class="hover" style="width:100%">
                <thead>
                    <tr>
                        <!--<th></th>-->
                        <th>Producto</th>
                        <th>Descripción</th>
                        <!--<th>Descuento</th>-->
                        <th>Precio</th>
                        <th>Stock</th>
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
                        <!--<td><?php echo $row["PRECIO_MY"]; ?>  </td>-->
                        <td><?php echo $row["PRECIO_PU"]; ?>  </td>
                        <td><?php echo $row["SALDO_INV"]; ?>  </td>
                        <td>
                            <div data-toggle="tooltip" title="<?php echo $row['PRODUCTO'];?>">
                            <?php if (strlen($row['FOTO_PATH']) > 0)
                            {
                            ?>
                                <img src="<?php echo ($row['FOTO_PATH']);?>" alt="<?php echo $row['PRODUCTO'];?>" style="width: 25%;" class="zoom"/>                                
                            <?php
                            }
                            else
                            {
                            ?>
                                <img src="" alt="<?php echo $row['PRODUCTO'];?>" style="width: 10%;"/>  
                            <?php
                            }
                            ?>
                            </div>
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
        echo "PRODUCTO NO EXISTE";
    }
?>
