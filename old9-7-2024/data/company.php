<?php
    /******************** init session ***********************/
    require_once "../config/inc.php";
    require_once "../database/connectDB.php";
    require_once "../database/entidadBase.php";
    require_once "country.php";

    class csCompany extends connectDB{
        private $company_id;
        private $city_id;
        private $company_IdNumber;
        private $company_name;
        private $company_logoUrl;
        private $company_legalName;
        private $company_legalIdDocument;
        private $company_iva;
        private $company_accounting;
        private $company_special_taxpayer;
        private $company_address;
        private $company_postCode;
        private $company_phone_codeCountry;
        private $company_phone_state;
        private $company_phone_number;
        private $company_celphone_codeCountry;
        private $company_celphone_number;
        private $company_email;

        public function __construct(){
            parent::__construct("connectDB");
            $this->company_id = 0;
            $this->city_id = 0;
            $this->company_IdNumber = "";
            $this->company_name = "";
            $this->company_logoUrl = "";
            $this->company_legalName = "";
            $this->company_legalIdDocument = "";
            $this->company_iva = 0;
            $this->company_accounting = "";
            $this->company_special_taxpayer = 0;
            $this->company_address = "";
            $this->company_postCode = "";
            $this->company_phone_codeCountry = 0;
            $this->company_phone_state = 0;
            $this->company_phone_number = 0;
            $this->company_celphone_codeCountry = 0;
            $this->company_celphone_number = 0;
            $this->company_email = "";
    
            $this->clase = "csCompany";
            $this->connectionDB_2();
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