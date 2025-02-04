<?php 
session_start();
if(isset($_SESSION['sess_user_id']) && $_SESSION['sess_user_id'] != "") {
  echo '<h1>Welcome '.$_SESSION['sess_name'].'</h1>';

  //session_destroy();
} else { 
  header('location:./');
}
?>