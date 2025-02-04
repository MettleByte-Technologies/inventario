<?php
    /******************** init session ***********************/
    require_once "../config/inc.php";

    include("../database/connectDB.php");

    class csMenu{
        private $menu_id;
        private $module_id;
        private $module_child_id;
        private $menu_name;
        private $menu_icon_url;
        private $menu_order;
        private $menu_level;
        private $menu_status;

        public function __construct(){
            $this->menu_id = 0;
            $this->module_id = 0;
            $this->module_child_id = 0;
            $this->menu_name = '';
            $this->menu_icon_url = '';
            $this->menu_order = 0;
            $this->menu_level = 0;
            $this->menu_status;
        
        }


        public function __set($var, $valor)
        {
            $temporal = $var;
            // Verifica que la propiedad exista, en este caso el nombre es la cadena en "$temporal"
            if (property_exists('csMenu',$temporal))
            {
            $this->$temporal = $valor;
            }
            else
            {
            echo $var . " No existe.";
            }
        }
        
        public function __get($var)
        {
            $temporal = $var;
            // Verifica que exista
            
            if (property_exists('csMenu', $temporal))
            {
            return $this->$temporal;
            }
            
            // Retorna nulo si no existe
            return NULL;
        }

        public function getMenu(){
            try {
                
                $_SESSION['sess_user_id'];

                
                $query = "SELECT `tbl_menu`.`menu_id`,
                          `tbl_menu`.`module_id`,
                          `tbl_menu`.`menu_name`,
                          `tbl_menu`.`menu_icon_url`,
                          `tbl_menu`.`menu_order`,
                          `tbl_menu`.`menu_level`,
                          `tbl_menu`.`menu_status`
                          FROM `tbl_menu`";
                
                $stmt = ConnectDB::connectionDB()->prepare($query);

                $stmt->bindValue('username', $username, PDO::PARAM_STR);
                $stmt->bindValue('password', $password, PDO::PARAM_STR);
                $stmt->execute();
                
                /*
                $objDml = new dml();
                $stmt = $objDml->dml_selectWhere($query, array("username"=>$username, "password"=>$password));
                */

                $count = $stmt->rowCount();
                $row   = $stmt->fetch(PDO::FETCH_ASSOC);
                if($count == 1 && !empty($row)) {
                    session_regenerate_id();
                    
                    /******************** Your code ***********************/
                    $_SESSION['sess_user_id']   = $row['user_id'];
                    $_SESSION['sess_username'] = $row['user_nickName'];
                    $_SESSION['sess_name'] = $row['person_fullName'];
                    $_SESSION['session_id']   = session_id();
                    //echo "home.php";
                    echo "modules/";
                } 
                else 
                {
                    echo "invalid";
                }
            } 
            catch (PDOException $e) 
            {
                echo "Error : ".$e->getMessage();
            }
        }

    }
?>