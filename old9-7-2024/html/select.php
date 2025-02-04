<label for="<?php echo $pk . "_" . $idAction; ?>"><?php echo $label; ?></label>
<select id="<?php echo $pk . "_" . $idAction; ?>" class="form-control form-control-sm" <?php echo $required; ?>>
    <?php
        $select = "";
        if ($unique == 1){

    ?>
    <option value="0">- Seleccione -</option>
    <?php            
        }
        else{
            $select = "selected";
        }
    ?>
    <?php
        //$resulset = null;
        // Parse PHP associative array to generate modules list
        try{
            if ($resulset != null){
                foreach($resulset as $row){
                    ?>
                    <option value="<?php echo $row[$pk]; ?>" <?php echo $select; ?>  ><?php echo $row[$content]; ?></option>
                    <?php
                
                    }
            }
        }
        catch(Exception $e)
        {

        }
    ?>
</select>
