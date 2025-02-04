<?php
    /******************** init session ***********************/
    require_once "../config/inc.php";
    require_once "../database/connectDB.php";
    require_once "../database/entidadBase.php";
    //require_once "country.php";

    class csUser extends connectDB{
        private $person_idNumber;
        private $banch_id;
        private $person_type;
        private $person_firstName;
        private $person_middleName;
        private $person_flastName;
        private $person_mlastName;
        private $person_fullName;
        private $person_bussinesName;
        private $person_birthDate;
        private $person_gender;
        private $person_photo_url;
        private $person_stat;
        private $user_id;
        private $user_nickName;
        private $rol_id;
        private $user_password;

        public function __construct(){
            parent::__construct("connectDB");
            $this->person_idNumber = 0;
            $this->banch_id = 0;
            $this->person_type = "";
            $this->person_firstName = "";
            $this->person_middleName = "";
            $this->person_flastName = "";
            $this->person_mlastName = "";
            $this->person_fullName = 0;
            $this->person_bussinesName = "";
            $this->person_birthDate = "";
            $this->person_gender = "";
            $this->person_photo_url = "";
            $this->person_stat = "";
            $this->user_id = 0;
            $this->user_nickName = "";
            $this->rol_id = 0;
            $this->user_password = "";

    
            $this->clase = "csUser";
            $this->connectionDB_2();
        }


        public function getUsers(){
            /*$query = 
            "   SELECT tp.person_idNumber vend_codigo,  person_firstName vend_nombre1, 
                       person_flastName vend_apellido1, CONCAT(person_firstName,' ', person_flastName) vendedor,
                       user_Id, user_nickName, rol_id, CASE rol_id WHEN 1 THEN 'Admin' else 'Vendedor' end rol,
                       user_password
                FROM `tbl_person` tp
                LEFT JOIN `tbl_user` tu
                ON tp.person_idNumber = tu.person_idNumber
            ";*/




            $query = "SELECT tuser.vend_codigo, VEND_NOMBRE1, VEND_APELLIDO1, ".
                     "CONCAT(VEND_NOMBRE1, ' ', VEND_APELLIDO1) vendedor, ".
                     "tuser.username user_id, tuser.username user_nickName, ".
                     "rol_id, CASE rol_id WHEN 1 THEN 'Admin' else 'Vendedor' end rol,".
                     "tuser.password ".
                     "FROM tbl_user_proyecto tuser ".
                     "INNER JOIN fa_vendedor tperson ".
                     "ON tuser.VEND_CODIGO = tperson.VEND_CODIGO ".
                     "AND tuser.VEND_EMPRESA = tperson.VEND_EMPRESA ";
                     //"INNER JOIN in_empresa em ".
                     //"ON tuser.VEND_EMPRESA = em.EMPR_CODIGO_EMPRESA ";
                     //"WHERE user_nickName = :username and user_password = AES_ENCRYPT(:password,'m@9@13')";
                     //"WHERE username = :username and password = :password";
                     //"WHERE username = :username";
    
            //var_dump($query);
            $obj = new EntidadBase("", $this->cnn);
            return $obj->getAllQuery($query);
        }

        public function getUser($vend_codigo){
            $query = 
            "   SELECT tp.person_idNumber vend_codigo,  person_firstName vend_nombre1, 
                       person_flastName vend_apellido1, CONCAT(person_firstName,' ', person_flastName) vendedor,
                       user_Id, user_nickName, rol_id,user_password
                FROM `tbl_person` tp
                LEFT JOIN `tbl_user` tu
                ON tp.person_idNumber = tu.person_idNumber
                WHERE tp.person_idNumber = $vend_codigo
            ";
    
            $obj = new EntidadBase("", $this->cnn);
            return $obj->getAllQuery($query);
        }


        public function getCompanies(){
            $obj = new EntidadBase("tbl_company", $this->cnn);
            return $obj->getAll();
        }

        public function getCountries(){
            $obj = new EntidadBase("tbl_country", $this->cnn);
            return $obj->getAll();            
        }

        public function getStates($country_id){
            $query = 
            "   SELECT *
                FROM `tbl_state`
                WHERE country_id = $country_id
            ";
    
            $obj = new EntidadBase("", $this->cnn);
            return $obj->getAllQueryTest($query);
        }


        public function getCities($state_id){
            $query = 
            "   SELECT *
                FROM `tbl_city`
                WHERE state_id = $state_id
            ";
    
            $obj = new EntidadBase("", $this->cnn);
            return $obj->getAllQuery($query);
        }

        

    }
?>