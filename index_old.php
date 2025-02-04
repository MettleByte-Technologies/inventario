<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="author" content="Carlos Correa">
        <title>SYS-CORCAI</title>
        <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
        <link rel="stylesheet" href="css/style.css">

        <style>
            .form-check-label {
                background-image:url(images/error.png);
                background-position:left;
                background-repeat:no-repeat;
                padding-left:1.5rem;
            }
                .btn-success {
                cursor:pointer;
            }
        </style>

        <!-- Favicon -->
        <link rel="apple-touch-icon" sizes="57x57" href="favicon/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="favicon/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="favicon/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="favicon/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="favicon/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="favicon/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="favicon/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="favicon/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="favicon/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="favicon/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
        <link rel="manifest" href="favicon/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">

    </head>
    <body>
        <div class="container">
            <div class="text-center login-page">
                <form method="POST" id="login_form">
                    <div class="row">
                        <div class="col-md-12 login-form-header">
                            <p class="login-form-font-header"><img src="images/logo/logo_login_blanco1_.png" alt="Empresa"/><p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group has-danger">
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-at"><img src="images/username.png" width="20" /></i></div>
                                    <!--<input type="text" name="username" class="form-control" id="username" placeholder="Username" autocomplete="off" required autofocus>-->
                                    <label for="user" class="sr-only">User</label>
                                    <input type="text" name="username" id="username" class="form-control" placeholder="Username" autocomplete="off" required autofocus>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                    <div class="input-group-addon" style="width: 2.6rem"><i class="fa fa-key"><img src="images/password.png" width="20" /></i></div>
                                    <!--<input type="password" name="password" class="form-control" id="password" placeholder="Password" required>-->

                                    <label for="pwd" class="sr-only">Password</label>
                                    <input type="password" name="password" id="password" class="form-control" placeholder="Password" required>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <!--<input type="submit" class="btn btn-success" value="Login">-->

                            <button class="btn btn-lg btn-outline-primary" type="submit">Sig in</button>

                            <label class="form-check-label">
                                <span class="text-danger align-middle" id="errorMsg"></span>
                            </label>

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 login-form-header">
                            <p class="login-form-copyright">&copy; 2006-2021<p>
                        </div>
                    </div>
                </form>
            </div>

        </div>


        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="bootstrap/js/bootstrap.js"></script>
        <script type="text/javascript" src="js/login.js"></script>
    </body>
</html>