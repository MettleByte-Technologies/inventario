<?php
    /******************** init session ***********************/
    //require_once "../config/inc.php";

    class csCountry {
        private $country_id;
        private $country_name;
        private $country_code;
        private $country_initial;
        private $country_nationality;

        private $cnn;
        private $resulset;

        public function __construct($cnn){
            //parent::__construct("connectDB");
            $this->country_id = 0;
            $this->country_name = "";
            $this->country_code = 0;
            $this->country_initial = "";
            $this->country_nationality = "";
            $this->cnn = $cnn;
            //$this->clase = "csCountry";
            //$this->connectionDB_2();
        }

        public function getCountries(){            
            $query =  "SELECT * FROM `tbl_country`";
    
            try {                                                                
                $this->resulset = $this->cnn->prepare($query);
                
                //$this->resulset->bindValue('userId', $_SESSION['sess_user_id'], PDO::PARAM_INT);
                $this->resulset->execute();                
                $count = $this->resulset->rowCount();
                $array = array();

                if($count > 0 && !empty($this->resulset)) {                    
                    /******************** Your code ***********************/
                    //Recorremos la data obtenida
                    foreach($this->resulset as $row){
                        //Llenamos la data en el array
                        array_push($array,$row);
                    }
                    return $array;
                } 
                else 
                {
                    //return $query;
                    return "No existen datos";
                }
            } 
            catch (PDOException $e) 
            {
                return "Error : ".$e->getMessage();
            }
        }

    }
?>