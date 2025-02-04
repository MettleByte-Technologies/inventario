<?php 
    $action = "delete-order";
    require_once "../business/order.php";
?>

<div class="container">
    <div class="row">
        <div class="col-sm-2">
            <div>
                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Ingresar pedido">
                    <button class="btn btn-primary" id="new-order">
                        Nuevo 
                        <span class="feather-shopping-cart"></span>
                    </button>
                </span>            
            </div>
        </div>
        <div class="col-sm-2">
            <div>
                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Enviar pedido">
                    <button class="btn btn-primary" id="process">
                        Enviar 
                        <span class="feather-shopping-cart"></span>
                    </button>
                </span>            
            </div>
        </div>
        <div class="col-sm-2">
            <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Eliminar">
                <button class="btn btn-danger" title="Eliminar" data-toggle="modal" data-target="#exampleModal">
                    Eliminar
                    <span class="feather-trash-2"></span>                    
                </button>
            </span>
        </div>
    </div>    
    </br>    
    </br>    
    <div class="row">
        <div class="col-sm-12">        
            <table id="example" class="display" style="width:100%">
                <thead>
                    <tr>
                        <th>
                            <div>
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Enviar Pedido">Enviar
                                    <input type="checkbox" name="send-order" id="all-order" />
                                </span>
                            </div>
                        </th>
                        <th></th>
                        <th>Empresa</th>
                        <th>Pedido</th>
                        <!--<th>Vendedor</th>-->
                        <th>Codigo</th>
                        <th>Cliente</th>
                        <th>Fecha Registro</th>
                    </tr>
                </thead>
                <tbody>
                <?php 
                    //$action = "select";
                    //require_once "../business/order.php";
                    //include "../business/order.php";

                    // Parse PHP associative array to generate modules list
                    try
                    {
                        if ($orderlist == "No existen datos")
                            echo "No existen pedidos registrados";
                        else
                        foreach($orderlist["data"] as $row){
                ?>
                    <tr>
                        <td>
                            <div>
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Seleccionar Cliente">
                                    <input type="checkbox" name="send-orderi" id="<?php echo $row["CODIGO"]; ?>" class="send-orderi"/>
                                </span>
                            </div>                            
                        </td>
                        <td>                        
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Editar">
                                    <button class="csEdit btn btn-success feather-edit-2" title="Editar" id="editO"></button>
                                </span>
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Editar">
                                    <button class="csEdit btn btn-success feather-eye" title="Ver" id="editO"></button>
                                </span>
                                <span class="csdiscount d-inline-block" tabindex="0" data-toggle="tooltip" title="%">
                                    <button class="btn btn-success feather-percent" title="%" id="percentO"></button>
                                </span>
                                <!--<span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Editar">
                                    <button class="csEdit btn btn-warning feather-edit-2" title="Editar" id="editO"></button>
                                </span>
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Eliminar">
                                    <button class="btn btn-danger feather-trash-2" title="Eliminar" data-toggle="modal" data-target="#exampleModal"></button>
                                </span>
                                <span class="csdiscount d-inline-block" tabindex="0" data-toggle="tooltip" title="%">
                                    <button class="btn btn-primary feather-percent" title="%" id="percentO"></button>
                                </span>-->
                        </td>
                        <td><?php echo $row["PEDI_CODIGO_EMPRESA"]; ?>  </td>
                        <td><?php echo $row["PEDI_CODIGO_PEDIDO"]; ?>  </td>
                        <!--<td><?php echo $row["PEDI_CODIGO_VENDEDOR"]; ?>  </td>-->
                        <td><?php echo $row["PEDI_CODIGO_CLIENTE"]; ?>  </td>
                        <td><?php echo $row["RAZON_SOCIAL"]; ?>  </td>
                        <td><?php echo $row["PEDI_FECHA_SISTEMA"]; ?>  </td>
                    </tr>                
                <?php 
                        }      
                    }
                    catch(Exception $ex)
                    {
                        $error = ex;
                    }
                ?>
                </tbody>

            </table>

        </div>
    </div>
</div>


<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Esta seguro de eliminar este pedido?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Una vez eliminado no podra recuperarlo
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" id="delO">Save changes</button>
      </div>
    </div>
  </div>
</div>


<script type="text/javascript" src="../js/order.js"></script>
