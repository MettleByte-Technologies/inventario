<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Carlos Correa">
        <title> Ventas</title>

        <link href="ico/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" type="text/css">
        <link href="bootstrap/css/bootstrap.css" rel="stylesheet">
        <link href="css/login.css" rel="stylesheet" crossorigin="anonymous">
    </head>
    <body>

        <div class="container">
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <div class="login-form bg-light mt-4 p-4">
                        
                        <form method="POST" id="login_form" class="row g-3">
                            <div class="col-12 div-center">
                                <img src="images/logo/crafbonlogo.png" alt="Crafbon"/>
                            </div>

                            <div class="col-12">
                                <label><i class="bi bi-person-fill"></i>Username</label>                                
                                <input type="text" id="username" name="username" class="form-control" placeholder="Username">
                            </div>
                            <div class="col-12">
                                <label><i class="bi bi-lock-fill"></i>Password</label>
                                <input type="password" id="password" name="password" class="form-control" placeholder="Password">
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-dark float-end">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="alert alert-warning alert-dismissable" id="invalid">
                    <strong>Usuario y/o Password son inválidos!</strong>
                </div>
                <div class="alert alert-warning alert-dismissable" id="modules">
                    
                </div>
                <div class="alert alert-warning alert-dismissable" id="fields">
                    <strong>Todos los campos son requeridos!</strong>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 div-center">
                    <p class="copyright">&copy; 2024<p>
                </div>
            </div>
        </div>

        </div>
        <!-- Jquery -->
        <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
        <!-- Jquery UI -->
        <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>
        <!-- Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <!-- Own -->
        <script src="js/login.js"></script>
        <script src="js/functions.js"></script>
    </body>


</html>