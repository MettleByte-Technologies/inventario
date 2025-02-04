
<div class="form-group row">
    <div class="col-sm-3">
        <label for="vend_codigo<?php echo "_" . $idAction; ?>">Codigo</label>
        <input type="text" id="vend_codigo<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="000011" disabled>
    </div>
</div>
<div class="form-group row">
    <div class="col-sm-5">
        <label for="vend_nombre1<?php echo "_" . $idAction; ?>">Nombre</label>
        <input type="text" id="vend_nombre1<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="Nombre" disabled>
    </div>
    <div class="col-sm-5">
        <label for="vend_apellido1<?php echo "_" . $idAction; ?>">Apellido</label>
        <input type="text" id="vend_apellido1<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="Apellido" disabled>
    </div>
</div>
<div class="form-group row">
    <div class="col-sm-5">
        <label for="user_nickName<?php echo "_" . $idAction; ?>">Nick/Usuario</label>
        <input type="text" id="user_nickName<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="usuario" required>
    </div>
    <div class="col-sm-5">
        <label for="user_password<?php echo "_" . $idAction; ?>">Password</label>
        <input type="text" id="user_password<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="password" required>
    </div>
</div>
<div class="form-group row">
    <div class="col-sm-3">
        <label class="form-check-label" for="rol<?php echo "_" . $idAction; ?>">Administrador</label>
    </div>
    <div class="col-sm">
        <input type="checkbox" class="form-check-input" id="rol<?php echo "_" . $idAction; ?>" required>
    </div>
</div>
<div >
    <span class="d-inline-block" tabindex="0" title="Guardar">
        <button class="btn btn-primary feather-save id="saveUser" title="Guardar"></button>
    </span>
    <span class="d-inline-block" tabindex="1" title="Cancelar">
        <button class="btn btn-danger feather-trash-2" title="Cancelar"></button>
    </span>
</div>