    <div class="container">
        <div class="form-group row">
            <div class="col-sm-3">
                <label for="company_legalIdDocument<?php echo "_" . $idAction; ?>">Id Cliente</label>
                <input type="text" id="company_legalIdDocument<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="codigo" required>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12">
            <table class="table table-hover table-condensed table-bordered table-sm">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Nombres/Razon Social</th>
                        <th scope="col">Propietario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">                        
                            <div >
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Editar">
                                    <button class="btn btn-warning feather-edit-2" title="Editar" id="editarOrden"></button>
                                </span>
                                <span class="d-inline-block" tabindex="1" data-toggle="tooltip" title="Eliminar registro">
                                    <button class="btn btn-danger feather-trash-2" title="Eliminar" id="eliminarrOrden"></button>
                                </span>
                            </div>
                        </td>
                        <td><input type="text" id="findProduct" value="0000000" /></td>
                        <td><?php echo '$row["descripción"]'; ?>  </td>
                        <td><?php echo '$row["Descuento"]'; ?>  </td>
                    </tr>                
                </tbody>

            </table>                
            </div>
        </div>

            <table class="table table-hover table-condensed table-bordered table-sm">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Producto</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Descuento</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">                        
                            <div >
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Editar">
                                    <button class="btn btn-warning feather-edit-2" title="Editar" id="editarOrden"></button>
                                </span>
                                <span class="d-inline-block" tabindex="1" data-toggle="tooltip" title="Eliminar registro">
                                    <button class="btn btn-danger feather-trash-2" title="Eliminar" id="eliminarrOrden"></button>
                                </span>
                            </div>
                        </td>
                        <td><input type="text" id="findProduct" value="0000000" /></td>
                        <td><?php echo '$row["descripción"]'; ?>  </td>
                        <td><?php echo '$row["Descuento"]'; ?>  </td>
                        <td><?php echo '$row["cantidad"]'; ?>  </td>
                        <td><?php echo '$row["precio"]'; ?>  </td>
                        <td><?php echo '$row["stock"]'; ?>  </td>
                        <td><?php echo 'ver imagen'; ?>  </td>
                    </tr>                
                </tbody>

            </table>

        <div class="">
            <div>
                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Cancelar">
                    <button class="btn btn-primary">
                        Cancelar 
                        <span class="feather-plus"></span>
                    </button>
                </span>            
            </div>
    </div>
    



<div class="container">
    <div class="row">
        <div class="col-sm-12">
            <div>
                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Ingresar nuevo registro">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#modalInsert">
                        Nuevo 
                        <span class="feather-plus"></span>
                    </button>
                </span>            
            </div>

            <table class="table table-hover table-condensed table-bordered table-sm">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Producto</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Descuento</th>
                        <th scope="col">Total</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Fecha de registro</th>
                    </tr>
                </thead>
                <tbody>
                <?php 

                    $action = "select";
                    include "../business/company.php";

                    // Parse PHP associative array to generate modules list
                    foreach($companies as $row){
                ?>
                    <tr>
                        <td scope="row">                        
                            <div >
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Editar">
                                    <button class="btn btn-warning feather-edit-2" title="Editar" id="editarOrden"></button>
                                </span>
                                <span class="d-inline-block" tabindex="1" data-toggle="tooltip" title="Eliminar registro">
                                    <button class="btn btn-danger feather-trash-2" title="Eliminar" id="eliminarrOrden"></button>
                                </span>
                            </div>
                        </td>
                        <!--<td><?php echo $row["company_id"]; ?>  </td>
                        <td><?php echo $row["city_id"]; ?>  </td>
                        <td><?php echo $row["company_IdNumber"]; ?>  </td>
                        <td><?php echo $row["company_name"]; ?>  </td>-->
                    </tr>                


                <?php 


                    }      

                ?>
                </tbody>

            </table>
        </div>
    </div>
</div>

<script type="text/javascript" src="../js/order.js"></script>
