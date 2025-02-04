<?php 
    //require_once "../config/inc.php";

    $action = "select";
    include "../business/product.php";

    //var_dump(sizeof($productslist["data"]));
    //var_dump($productslist);
    //if ($productslist != "No existen datos")
?>
<?php 
    if ($productslist["error"] == 200) //Codigo 200 ==> request Ok
    {

        $item = $productslist["data"][0];
        $item = ($item["PRODUCTO"] == "NULL" ? '' : $item["PRODUCTO"]);
            
        if (gettype($productslist) == "array" && $item != "")        
        {        
            $firstKey = "_cantidad";
            //if (sizeof($productslist["data"]) > 1) 
            if (count($productslist["data"]) > 1) 
                $firstKey = ($productslist["data"][0]["PRODUCTO"]);
            //$firstKey = ($productslist["data"][0]["PRODUCTO"]);
            //var_dump(count($productslist["data"]));
?>    

    <div class="row">
        <input type="hidden" id="sizeofProducts"  name="sizeofProducts" value="<?php echo count($productslist["data"]); ?>"/>
        <input type="hidden" id="firstKey"  name="firstKey" value="<?php echo $firstKey; ?>"/>
        <div class="col-sm-12">
            <table id="tableProduct" class="hover" style="width:100%">
                <thead>
                    <tr>
                        <th>Secuencia</th>
                        <th>Producto</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>% Linea Dscto</th>
                        <th>% Marca Dscto</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                <?php 
                    header('Content-type: image/jpg'); 
                    //var_dump(sizeof($productslist["data"]));
                    
                    foreach($productslist["data"] as $row){
                ?>
                    <tr>
                        <td><?php echo $row["SECUENCIA"];   ?>  </td>
                        <td><?php echo $row["PRODUCTO"];   ?>  </td>
                        <td><?php echo $row["DESCRIPCION"]; ?>  </td>
                <?php 
                        if (count($productslist["data"]) > 1){
                            $idInput = "_qty"; 
                            $nameInput = "_qty"; 
                ?>
                    <!--<script>$("#dQtyItem").hide(); console.log("item hide");</script>-->
                    <td><input type="text" id="<?php echo $idInput;?>" name="<?php echo $nameInput;?>" value="" /></td>
                <?php                            
                        }
                        else{ 
                            $idInput = "_cantidad";
                            $nameInput = "_cantidad";
                ?>
                    <!--<script>$("#qtyItem").val(""); $("#dQtyItem").show(); console.log("item show");</script>-->
                    <!--<td></td>-->
                    <td>
                        <!--<input autofocus type="text" id="<?php echo $idInput;?>" name="<?php echo $nameInput;?>" />-->

                                    <input autofocus type="text" id="_cantidad" name="_cantidad" class="form-control" placeholder="Cantidad" aria-label="Cantidad" aria-describedby="basic-addon1">    
                                    <script>//trigger("focus");</script>                                    

                    </td>
                    <!--<script>$('input[name="<?php echo $idInput;?>"]').trigger("focus");</script>-->
                    <!--<td><input type="text" id="<?php echo $idInput;?>" name="<?php echo $nameInput;?>" value="" readonly style="border=0;" /></td>-->
                <?php                            
                        }                        
                        ?>
                        <td><?php echo $row["PRECIO_MY"]; ?>  </td>
                        <td><?php echo $row["SALDO_INV"]; ?>  </td>
                        <td><?php echo round($row["LINEA_DSCTO"],4).' %'; ?>  </td>
                        <td><?php echo round($row["MARCA_DSCTO"],4).' %'; ?>  </td>
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
            echo ($productslist);;
            //echo json_encode($productslist);;
            //echo 409;
        }  
    }
    else
    {
        //echo json_encode($productslist);;
        //echo $productslist["error"];
        echo 204;
    }  

?>
