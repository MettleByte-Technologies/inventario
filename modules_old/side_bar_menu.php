<?php
    $action = "select";
    include "../business/module.php";
?>
<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="sidebar-sticky pt-3">
        <!-- MENUS -->
        <ul class="nav flex-column">
        <?php
            //var_dump($resulset);
            //echo $resulset['error'];
            // Parse PHP associative array to generate modules list
            foreach($resulset['data'] as $obj){
                $active = "";

                switch ($obj["module_name"]){
                    case "Home":
                        $active = "active";
                        break;
                }
        ?>
                <li class="nav-item">
                    <a id="<?php echo $obj["module_idTag"]; ?>" class="nav-link <?php echo $active; ?>" href="#">

                    <span class="<?php echo $obj["module_image_url"]; ?>"></span>
                        <?php                                                          
                            if ($obj["module_name"] == "Home"){
                                echo $obj["module_name"] . '<span class="sr-only">(current)</span>' ;
                            }
                            else{
                                echo $obj["module_name"];
                            }
                        ?>
                    </a>
                </li>
        <?php
            }

        ?>
<!--        
                <li class="nav-item">
                    <a class="nav-link active" href="#">
                        <span class="feather-home"></span>
                        Home <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span class="feather-aperture"></span>
                        Empresa
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span class="feather-shopping-cart"></span>
                        Facturación
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span class="feather-package"></span>
                        Productos
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span class="feather-users" ></span>
                        Clientes
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span class="feather-truck"></span>
                        Proveedores
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <span class="feather-lock"></span>
                        Administración
                    </a>
                </li>
                <li class="nav-item">
                    <a id="logout" class="nav-link" href="#">
                        <span class="feather-log-out"></span>
                        Salir
                    </a>
                </li>
        -->
            </ul>
    </div>
</nav>
