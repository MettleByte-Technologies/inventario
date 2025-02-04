<!doctype html>
<html lang="en">
<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="Carlos Correa">

        <title><?php echo $title; ?></title>

        <!-- Bootstrap core CSS -->
        <link href="../bootstrap/css/bootstrap.css" rel="stylesheet">
        <!-- CSS alertifyjs -->
        <!--<link href="../js/alertifyjs/css/alertify.css" rel="stylesheet">
        <link href="../js/alertifyjs/css/themes/default.css" rel="stylesheet">-->
        <!-- Icons -->
        <link href="../ico/feather-icons/feather.css" rel="stylesheet" type="text/css">
        <!-- CSS this Template -->
        <link href="../css/dashboard.css" rel="stylesheet">

        <!-- DataTables CSS -->
        <!--<link href="../DataTables/Buttons-2.2.2/css/buttons.bootstrap5.min.css" rel="stylesheet">-->

        <style>
            .bd-placeholder-img {
                font-size: 1.125rem;
                text-anchor: middle;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            @media (min-width: 768px) {
                .bd-placeholder-img-lg {
                font-size: 3.5rem;
                }
            }
        </style>
        <link rel="stylesheet" href="../css/datatables.min.css">
        <link rel="stylesheet" href="../css/sections.css">

        <!-- Favicon -->
        <link rel="apple-touch-icon" sizes="57x57" href="../favicon/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="../favicon//apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="../favicon//apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="../favicon//apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="../favicon//apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="../favicon//apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="../favicon//apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="../favicon//apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="../favicon//apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="../favicon/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="../favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="../favicon/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="../favicon/favicon-16x16.png">
        <link rel="manifest" href="../favicon/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">

        <!-- Bootstrap Ico -->
        <link rel="stylesheet" href="../ico/bootstrap-icons/bootstrap-icons.css">


        <!-- Script to illustrates unload() method -->

        <script type="text/javascript"> 
            function checkRefresh() 
            { 
                if(document.refreshForm.visited.value == "") 
                {   
                // This is a fresh page load 
                //alert ('Fresh Load'); 
                document.refreshForm.visited.value = "1"; 
                } 
                else 
                { 
                // This is a page refresh 
                alert ('Page has been Refreshed, The AJAX call was not made'); 

                } 
            } 
    </script> 

</head>
<body onLoad="checkRefresh();" onpageshow="if (event.persisted) noBack();" onunload=""> 


<!-- end header -->