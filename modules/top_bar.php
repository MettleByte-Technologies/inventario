<nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#"><?php echo $_SESSION['sess_empresa']; ?></a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <ul class="nav justify-content-end">
            <li class="nav-item">
                <div class="welcome-user">
                    <?php echo 'Bienvenido '.$_SESSION['sess_name']; ?>
                    <input type="hidden" name="id_vendedor" id="id_vendedor" value="<?php echo $_SESSION['sess_vend_codigo']; ?>" />
                    <input type="hidden" name="id_empresa" id="id_empresa" value="<?php echo $_SESSION['sess_vend_empresa']; ?>" />
                    <input type="hidden" name="rol_id" id="rol_id" value="<?php echo $_SESSION['sess_rol_id']; ?>" />
                </div>
            </li>
            <li class="nav-item">
                <a class="photo-user" href="#">
                    <img src="../images/perfil.png" class="rounded" width="30" height="30" alt="">
                </a>
            </li>
    </ul>        

</nav>
