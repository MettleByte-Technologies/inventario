<!doctype html>
<html>
    <head>    
        <title>Tablas</title>    
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link href="../bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>    
        <link href="../js/alertifyjs/css/alertify.css" rel="stylesheet" type="text/css"/>    
        <link href="../js/alertifyjs/css/themes/default.css" rel="stylesheet" type="text/css"/>    
        <!-- Icons -->
        <link href="../ico/feather-icons/feather.css" rel="stylesheet" type="text/css">

        <script scr="..js/jquery.js" type="text/javascript"></script>
        <script scr="../bootstrap/js/bootstrap.js" type="text/javascript"></script>
        <script scr="../js/alertifyjs/alertifyjs.js" type="text/javascript"></script>

    <body>    
        <div class="container">
            <div id="tabla">  
                <?php include "componentes/tabla.php" ?>
            </div>
        </div>

        <!-- Modal nuevo -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalNuevo">
        Nuevo
        </button>

        <!-- Modal -->
        <div class="modal fade" id="modalNuevo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>

        <!-- Modal editar -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalEdicion">
        Edición
        </button>

        <!-- Modal -->
        <div class="modal fade" id="modalEdicion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>


<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </body>  
</html>
