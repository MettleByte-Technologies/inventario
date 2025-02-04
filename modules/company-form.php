<div class="form-group row">
    <div class="col">
        <?php
            $unique   = 1;
            $label   = "Pais";
            $pk      = "country_id";
            $content = "country_name";                    
            $resulset = $countries;
            $required = "required";
            include "../html/select.php";

        ?>
    </div>
    <div class="col">
        <?php
            $unique   = 1;
            $label   = "Provincia";
            $pk      = "state_id";
            $content = "state_name";                    
            $resulset = $states;
            $required = "required";
            include "../html/select.php";

            ?>
    </div>
    <div class="col">
        <?php
            $unique   = 1;
            $label   = "Ciudad";
            $pk      = "city_id";
            $content = "state_name";                    
            $resulset = $states;
            $required = "required";
            include "../html/select.php";

        ?>

    </div>
</div>
<div class="form-group row">
    <div class="col-sm-3">
        <label for="company_legalIdDocument<?php echo "_" . $idAction; ?>">RUC</label>
        <input type="text" id="company_legalIdDocument<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="1734256789001" required>
    </div>
    <div class="col-sm-9">
        <label for="company_legalName<?php echo "_" . $idAction; ?>">Representante Legal</label>
        <input type="text" id="company_legalName<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="Nombre del representante legal" required>
    </div>
</div>
<hr/>
<div class="form-group row">
    <div class="col-sm-3">
        <label for="company_IdNumber<?php echo "_" . $idAction; ?>">RUC</label>
        <input type="text" id="company_IdNumber<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="1734256789001" required>
    </div>
    <div class="col-sm-9">
        <label for="company_name<?php echo "_" . $idAction; ?>">Razón Social</label>
        <input type="text" id="company_name<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="Nombre de la empresa" required>
    </div>
</div>
<div class="form-group row">
    <div class="col-sm-3">
        <label for="company_iva<?php echo "_" . $idAction; ?>">% IVA</label>
        <input type="text" id="company_iva<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="12" required>
    </div>
    <div class="col-sm-5">
        <label for="company_special_taxpayer<?php echo "_" . $idAction; ?>">Contribuyente Especial</label>
        <input type="text" id="company_special_taxpayer<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="00000" required>
    </div>
    <div class="col-sm">
    <br/>
        <input type="checkbox" class="form-check-input" id="company_accounting<?php echo "_" . $idAction; ?>" required>
        <label class="form-check-label" for="company_accounting<?php echo "_" . $idAction; ?>">Obligado a llevar Contabilidad</label>
    </div>
</div>
<div class="form-group row">
    <div class="col-sm">
        <label for="company_address<?php echo "_" . $idAction; ?>">Domicilio</label>
        <textarea class="form-control" id="company_address<?php echo "_" . $idAction; ?>" rows="2" required></textarea>
    </div>
</div>
<div class="form-group row">
    <div class="col-sm-3">
        <label for="company_company_postCodeIdNumber<?php echo "_" . $idAction; ?>">Código Postal</label>
        <input type="text" id="company_company_postCodeIdNumber<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="000000" required>
    </div>
    <div class="col-sm-3">
        <label for="company_phone_codeCountry<?php echo "_" . $idAction; ?>">Codigo País</label>
        <input type="text" id="company_phone_codeCountry<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="0000" required>
    </div>
    <div class="col-sm-3">
        <label for="company_phone_state<?php echo "_" . $idAction; ?>">Codigo Área</label>
        <input type="text" id="company_phone_state<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="00000" required>
    </div>
    <div class="col-sm">
        <label for="company_phone_number<?php echo "_" . $idAction; ?>">Télefono Domicilio</label>
        <input type="text" id="company_phone_number<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="2678529" required>
    </div>
</div>
<div class="form-group row">
    <div class="col-sm-3">
    </div>
    <div class="col-sm-3">
        <label for="company_celphone_codeCountry<?php echo "_" . $idAction; ?>">Codigo País</label>
        <input type="text" id="company_celphone_codeCountry<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="0000" required>
    </div>
    <div class="col-sm-3">
    </div>
    <div class="col-sm">
        <label for="company_celphone_number<?php echo "_" . $idAction; ?>">Télefono Celular</label>
        <input type="text" id="company_celphone_number<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="996258462" required>
    </div>
</div>
<div class="form-group row">
    <div class="col-sm-5">
        <label for="company_email<?php echo "_" . $idAction; ?>">Correo Electrónico</label>
        <input type="email" id="company_email<?php echo "_" . $idAction; ?>" class="form-control form-control-sm" placeholder="mimail@dominio.com" required>
    </div>
    <div class="col-sm">
        <label for="company_logoUrl<?php echo "_" . $idAction; ?>">Logo</label>
        <input type="file" id="company_logoUrl<?php echo "_" . $idAction; ?>" class="form-control-file" >
    </div>
</div>
