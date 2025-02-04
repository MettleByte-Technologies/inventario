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
                        <th scope="col">Id</th>
                        <th scope="col">Vendedor</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Nick/Usuario</th>
                    </tr>
                </thead>
                <tbody>
                <?php 

                    $action = "select";
                    include "../business/user.php";                    

                    // Parse PHP associative array to generate modules list
                    foreach($users["data"] as $row){
                     //echo json_encode($row);;
                ?> 
                    <tr>
                        <td scope="row">                        
                            <div >
                                <span class="d-inline-block" tabindex="0" title="Actualizar">
                                    <button class="btn btn-warning feather-edit-2" id="updateUser"></button>
                                </span>
                                <span class="d-inline-block" tabindex="1" title="Eliminar">
                                    <button class="btn btn-danger feather-trash-2" title="Eliminar"></button>
                                </span>
                            </div>
                        </td>
                        <td><?php echo $row["vend_codigo"]; ?>  </td>
                        <td><?php echo $row["vendedor"]; ?>  </td>
                        <td><?php echo $row["rol"]; ?>  </td>
                        <td><?php echo $row["user_nickName"]; ?>  </td>
                    </tr>                
                <?php 

                    }      

                ?>
                </tbody>

            </table>
        </div>
    </div>
</div>

<script type="text/javascript" src="../js/user.js"></script>
