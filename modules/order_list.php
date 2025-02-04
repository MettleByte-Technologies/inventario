<?php
    require_once "../config/inc.php";
?>

<input type="hidden" id="data-estado" name="data-estado" value="<?php echo $_POST['estado']; ?>"/>

<h5>
  <div class="form-check">
    <input class="form-c-heck-input" type="checkbox" value="" id="flexCheckDefault" name="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">
      Ver Antiguos
    </label>
  </div>
</h5>

<!--<div class="container">-->
    <div class="row" id="tableMonthly">
        <div class="col-sm-12">        
            <table id="example1" class="display compact" width="100%"></table>            
        </div>
    </div>   
<!--</div>-->

<div class="row" id="tableOld">
        <div class="col-sm-12">        
            <table id="example2" class="display compact" width="100%"></table>            
        </div>
    </div>  


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

<script type="text/javascript" src="../js/functions.js"></script>
<script type="text/javascript" src="../js/order.js"></script>
