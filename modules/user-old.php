
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
                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Ingresar nuevo registro">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#modalInsert">
                        Buscar 
                        <span class="feather-plus"></span>
                    </button>
                </span>            
            </div>

            <table class="table table-hover table-condensed table-bordered table-sm">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Nombres</th>
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
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Editar/Eliminar">
                                    <button class="btn btn-warning feather-edit-2" title="Editar/Eliminar" id="editU"></button>
                                </span>
                                <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Actualizar registro">
                                    <button class="btn btn-warning feather-edit-2" data-toggle="modal" data-target="#modalUpdate" ></button>
                                </span>

                            </div>
                        </td>
                        <td><?php echo $row["company_name"]; ?>  </td>
                    </tr>                


                <?php 


                    }      

                ?>
                </tbody>

            </table>
        </div>
    </div>
</div>


<!-- Modal Insert -->
<div class="modal fade" id="modalInsert" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="modalInsert" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalInsert">Nueva Empresa</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <?php 
                $idAction = "0";
                include "user-edit.php";
            ?>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="insertCompany">Guardar</button>
      </div>
    </div>
  </div>
</div>


<!-- Modal Update -->
<div class="modal fade" id="modalUpdate" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="modalUpdate" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalUpdate">Actualizar Empresa</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <?php 
                $idAction = "1";
                include "user-edit.php";
            ?>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="updateCompany">Guardar</button>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript" src="../js/user.js"></script>
