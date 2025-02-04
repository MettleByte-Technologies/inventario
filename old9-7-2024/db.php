<?php 
try {
  $db = new PDO('mysql:host=localhost;dbname=crafb8si_magale;charset=utf8mb4', 'crafb8si_admin', 'j2J-90rTTFKS');
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);  
} catch (PDOException $e) {
  echo "Connection failed : ". $e->getMessage();
}
