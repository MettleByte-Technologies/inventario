<?php
    /******************** init session ***********************/
    require_once "../config/inc.php";
    require_once "../database/connectDB.php";

    class csModule extends connectDB{
        private $menu_id;
        private $module_id;
        private $module_child_id;
        private $menu_name;
        private $menu_icon_url;
        private $menu_order;
        private $menu_level;
        private $menu_status;
        
        public function __construct(){
            parent::__construct("connectDB");
            $this->menu_id = 0;
            $this->module_id = 0;
            $this->module_child_id = 0;
            $this->menu_name = '';
            $this->menu_icon_url = '';
            $this->menu_order = 0;
            $this->menu_level = 0;
            $this->menu_status;

            $this->clase = "csModule";
        }

        public function getModules(){
            $user_id = $_SESSION['sess_user_id'];

            $query = 
            "   SELECT DISTINCT module_name, module_image_url, module_target, module_idTag
                FROM ".$this->schema."tbl_module mo
                INNER JOIN ".$this->schema."tbl_profile_module pr
                   ON mo.module_id = pr.module_id
                  AND pr.profilem_status = 'A'
                INNER JOIN ".$this->schema."tbl_user_proyecto us
                   ON pr.rol_id = us.rol_id
                WHERE us.username = $user_id
                  AND mo.module_status = 'A'
                ORDER BY mo.module_order";

            try{
                $stmt = ConnectDB::cnnDB()->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $stmt->execute();

                $count = $stmt->rowCount();
                //$row   = $stmt->fetch(PDO::FETCH_ASSOC);
                $array = array();
                if($count > 0 && !empty($stmt)) {
                    foreach($stmt as $row){
                        //Llenamos la data en el array
                        array_push($array,$row);
                    }
    
                    $result = array("error"=>0, "data"=>$array);
                    
                    return $result;
    
                }
                else 
                {
                    var_dump($stmt);
                    $this->cnn = null;
                    echo "No existen datos";
                }
            } 
            catch (PDOException $e) 
            {
                $err = "Error : ".$e->getMessage();
                $this->cnn = null;
                echo $err;
            }
            catch (Exception $e) 
            {
                $err = "Error : ".$e->getMessage();
                echo $err;
            }









            //$obj = new EntidadBase("", $this->cnn);
            //return $obj->getAllQuery($query);
        }

    }
?>