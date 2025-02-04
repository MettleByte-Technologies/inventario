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
$title = "Pedidos";                   // (1) Set the title
include "header.php";                 // (2) Include the header
?>

<!-- begin page content -->

<!--<p><b>Welcome to our web site </b></p>
<p style='text-align: center;'>
We're using PHP to provide you with dynamic content
for a better web experience.
</p>-->

<!-- Top bar -->
<?php
include "top_bar.php";                 // (2) Include the header
?>

<div class="container-fluid">
     <div class="row">

     <!-- side bar menu-->
<?php
include "side_bar_menu.php";                 // (2) Include the header
?>

<!-- content-->
<?php
include "content.php";                 // (2) Include the header
?>

    </div>
</div>

<!-- end page content -->



<?php
include "footer.php";                 // (3) Include the footer
?>