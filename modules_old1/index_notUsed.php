<?php    
    /******************** init session ***********************/
    require_once "../config/inc.php";

    /*
    if ($_SERVER['REQUEST_METHOD'] == 'POST')
    {
            echo "primera vez";
    }
    else
    {
            echo "mas de primera";
    }

*/

    if(!isset($_SESSION['sess_username']))
    {
        header('location:../');

    }


?>

<?php
$title = "SYS-CORCAI";                   // (1) Set the title
include "header.php";                 // (2) Include the header
?>

<!-- begin page content -->

<!--<p><b>Welcome to our web site </b></p>
<p style='text-align: center;'>
We're using PHP to provide you with dynamic content
for a better web experience.
</p>-->
    <nav class="navbar navbar-light background-top-bar sticky-top">
        <span class="company-name">TALLERES CORDOVA</span>

        <ul class="nav justify-content-end">
            <li class="nav-item">
                <div class="welcome-user"><?php echo 'Bienvenido '.$_SESSION['sess_username']; ?></div>
            </li>
            <li class="nav-item">
                <a class="navbar-brand" href="#">
                    <img src="../images/perfil.png" class="rounded" width="30" height="30" alt="">
                </a>
            </li>
        </ul>        
    </nav>


    
    <div class="container-fluid">
        <!-- Content here -->        
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="sidebar-sticky pt-3">
                <!-- MENUS -->
                    <ul class="nav flex-column">
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
                                <span class="feather-lock"></span>
                                Salir
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <h2>Section title</h2>
                <div class="table-responsive">

                </div>
                <div class="col-sm-9">
                        <label class="form-check-label">
                            <span class="text-danger align-middle" id="errorMsg"></span>
                        </label>

                </div>

            </main>
        </div>
    </div>

    <form name="refreshForm"> 
        <input type="hidden" name="visited" value="" /> 
    </form> 


<!-- end page content -->



<?php
include "footer.php";                 // (3) Include the footer
?>