<?php
class connectDB{
    protected $resulSet;
    protected $cnn;
    protected $clase;
    protected $db_cfg;
    protected $schema;

    public function __construct($clase){
        $this->clase   = $clase;
        $this->db_cfg = require_once 'config.php';
    }

    public function cnnDB($trx = false){
        //$db_cfg   = require_once 'config.php';
        $driver   = $this->db_cfg["driver"];
        $host     = $this->db_cfg["host"];
        $user     = $this->db_cfg["user"];
        $pass     = $this->db_cfg["pass"];
        $database = $this->db_cfg["database"];
        $this->schema   = $this->db_cfg["schema"];
        $charset  = $this->db_cfg["charset"];

        $this->cnn = null;
        if($driver=="mysql" || $driver==null){
            try {
                $this->cnn = new PDO($driver.":dbname=".$database, $user, $pass, array(PDO::ATTR_PERSISTENT => true));
                $this->cnn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->cnn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);  
                //if ($trx) 
            } catch (PDOException $ePDO) {
                $err = "Connection failed : ". $ePDO->getMessage();
                die();
                echo $err;
            } catch (Exception $eExc) {
                $err = "Connection failed : ". $eExc->getMessage();
                die();
                echo $err;
            }
        }
        
        return $this->cnn;
    } 

    protected function beginTran(){
        $this->cnn->beginTransaction();
    }

    protected function commitTran(){
        $this->cnn->commit();
    }

    protected function rollbackTran(){
        $this->cnn->rollback()();
    }

    protected function executeTran($data){
        $this->resulSet->execute($data);
    }

    protected function prepareQuery($query){
        $this->resulSet = $this->cnn->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));        
    }


    public function __set($var, $valor)
    {
        $temporal = $var;
        // Verifica que la propiedad exista, en este caso el nombre es la cadena en "$temporal"
        if (property_exists($this->clase,$temporal))
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
        
        if (property_exists($this->clase, $temporal))
        {
        return $this->$temporal;
        }
        
        // Retorna nulo si no existe
        return NULL;
    }

    public function dmlStoreProcedure($query){
        try {                                                                
            $this->resulSet = $this->cnnDB()->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            
            $this->resulSet->execute();                
            $count = $this->resulSet->rowCount();

            //return  $result = array("error"=>200, "data"=>$count);
            $array = array();

            if($count > 0 && !empty($this->resulSet)) {                    
                //Recorremos la data obtenida
                foreach($this->resulSet as $row){
                    //Llenamos la data en el array
                    array_push($array,$row);
                }

                $result = array("error"=>200, "data"=>$array, "rows"=>$count);
                $this->cnn = null;
                return $result;
            } 
            else 
            {
                $this->cnn = null;
                return array("error"=>204, "data"=>"No existen datos", "rows"=>0);
            }
        } 
        catch (PDOException $e) 
        {
            //die();
            return array("error"=>4090, "data"=>$e->getMessage(), "rows"=>0);
        }
        catch (Exception $e) 
        {
            //var_dump($query);

            //die();
            return array("error"=>4091, "data"=>$e->getMessage(), "rows"=>0);
        }
    }

    public function dmlStoreProcedureTrx($query){
        try {                                                                
            $this->resulSet = $this->cnnDB()->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            
            $this->resulSet->execute();                
            $count = $this->resulSet->rowCount();

            //return  $result = array("error"=>200, "data"=>$count);
            $array = array();

            if($count > 0 && !empty($this->resulSet)) {                    
                //Recorremos la data obtenida
                /*foreach($this->resulSet as $row){
                    //Llenamos la data en el array
                    array_push($array,$row);
                }*/

                $result = array("error"=>$this->resulSet[0][0], "data"=>$this->resulSet[0][1], "rows"=>$count);
                $this->cnn = null;
                return json_encode($result);
            } 
            else 
            {
                $this->cnn = null;
                return json_encode(array("error"=>409, "data"=>"Error al actualizar Orden", "rows"=>0));
            }
        } 
        catch (PDOException $e) 
        {
            //die();
            return json_encode(array("error"=>4090, "data"=>$e->getMessage(), "rows"=>0));
        }
        catch (Exception $e) 
        {
            //var_dump($query);

            //die();
            return json_encode(array("error"=>4091, "data"=>$e->getMessage(), "rows"=>0));
        }
    }

    public function dmlSelect($query){
        try {                                                                
            $this->resulSet = $this->cnnDB()->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            
            $this->resulSet->execute();                
            $count = $this->resulSet->rowCount();
            $array = array();

            if($count > 0 && !empty($this->resulSet)) {                    
                /******************** Your code ***********************/
                //Recorremos la data obtenida
                foreach($this->resulSet as $row){
                    //Llenamos la data en el array
                    array_push($array,$row);
                }

                $result = array("error"=>0, "data"=>$array);
                $this->cnn = null;
                return $result;
            } 
            else 
            {
                $this->cnn = null;
                return array("error"=>1000, "data"=>"No existen datos");//trim("No existen datos");
            }
        } 
        catch (PDOException $e) 
        {
            die();
            return array("error"=>2000, "data"=>"Error : ".$e->getMessage());//trim("Error : ".$e->getMessage());
        }
        catch (Exception $e) 
        {
            die();
            return array("error"=>3000, "data"=>"Error : ".$e->getMessage());//trim("Error : ".$e->getMessage());
        }
    }

    public function dmlSelectArray($query){
        try {                                                                
            $this->resulSet = $this->cnnDB()->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            
            $this->resulSet->execute();                
            $count = $this->resulSet->rowCount();
            $array = array();

            if($count > 0 && !empty($this->resulSet)) {                    
                /******************** Your code ***********************/
                //Recorremos la data obtenida
                foreach($this->resulSet as $row){
                    //Llenamos la data en el array
                    array_push($array,$row);
                }

                $result = array("error"=>0, "data"=>$array);
                $this->cnn = null;
                return $result;
            } 
            else 
            {
                $this->cnn = null;
                return array("error"=>1000, "data"=>"No existen datos");
            }
        } 
        catch (PDOException $e) 
        {
            //die();
            return array("error"=>2000, "data"=>$e->getMessage());
        }
        catch (Exception $e) 
        {
            var_dump($query);

            //die();
            array("error"=>3000, "data"=>$e->getMessage());
        }
    }

    public function dmlUpdate($query, $strmsg){
        try {                                                                
            $this->resulSet = $this->cnnDB()->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            
            $this->resulSet->execute();                
            $count = $this->resulSet->rowCount();

            if($count > 0 ) {                    
                $result = array("error"=>0, "data"=>"$strmsg");
                $this->cnn = null;
                return $result;
            } 
            else 
            {
                $this->cnn = null;
                return array("error"=>1000, "data"=>"Datos no encontrados");
            }
        } 
        catch (PDOException $e) 
        {
            //die();
            return array("error"=>2000, "data"=>$e->getMessage());
        }
        catch (Exception $e) 
        {
            //die();
            array("error"=>3000, "data"=>$e->getMessage());
        }
    }

    public function dmlInsertTrans($query, $data, $strmsg){
        $this->cnn = $this->cnnDB();
        $this->resulSet = $this->cnn->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));

        try { 
            $this->cnn->beginTransaction();
            //var_dump($data);
            foreach ($data as $row)
            {
                $result = $this->resulSet->execute($row);                //$stmt->execute($row);
                
                if (!$result){
                    $this->cnn->rollback();
                    return array("error"=>1000, "data"=>$strmsg);
                }
            }
            $this->cnn->commit();
            return array("error"=>0, "data"=>"Inserted");
        }
        catch (PDOException $e) 
        {
            $this->cnn->rollback();
            return array("error"=>2000, "data"=>$e->getMessage());
        }
        catch (Exception $e) 
        {
            $this->cnn->rollback();
            return array("error"=>3000, "data"=>$e->getMessage());
        }

        //return "Aqui";
    }

    public function dmlTrans($queries, $data, $strmsg){
        $this->cnn = $this->cnnDB();
        //foreach ($queries as $query)        
        try { 
            $this->cnn->beginTransaction();
            for ($i=0; $i < count($queries); ++$i){
                $this->resulSet = $this->cnn->prepare($queries[$i], array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                //var_dump($queries[$i]);
                //var_dump($data[$i]);
                //foreach ($data[$i] as $row)
                {
                    //var_dump($row);
                    $result = $this->resulSet->execute($data[$i]);                //$stmt->execute($row);
                    
                    if (!$result){
                        $this->cnn->rollback();
                        //return array("error"=>1000, "data"=>('$queries[$i]' + ' --> ' + '$strmsg'));
                        return array("error"=>1000, "data"=>$strmsg);                        
                    }
                }
            }    
            $this->cnn->commit();
            return array("error"=>0, "data"=>"Process succesfull");                                
        }
        catch (PDOException $e) 
        {
            $this->cnn->rollback();
            return array("error"=>2000, "data"=>$e->getMessage());
        }
        catch (Exception $e) 
        {
            $this->cnn->rollback();
            return array("error"=>3000, "data"=>$e->getMessage());
        }
        //return "Aqui";
    }

    public function executeTrx($query, $data, $strmsg){
        $this->cnnDB();

        try { 
            $this->beginTran();
            prepareQuery($query);//$this->cnn->prepare($query, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            //var_dump($data);
            foreach ($data as $row)
            {
                //$result = $this->resulSet->execute($row);                //$stmt->execute($row);
                executeTran($row);
                
                /*if (!$result){
                    $this->cnn->rollback();
                    return array("error"=>1000, "data"=>$strmsg);
                }*/
            }
            $this->commitTran();
            return array("error"=>200, "data"=>"Inserted");
        }
        catch (PDOException $e) 
        {
            $this->rollbackTran();
            return array("error"=>4091, "data"=>$e->getMessage());
        }
        catch (Exception $e) 
        {
            $this->rollbackTran();
            return array("error"=>4192, "data"=>$e->getMessage());
        }

        //return "Aqui";
    }    

    public function executeArrayTrx($queries, $data, $strmsg){
        $this->cnnDB();

        try { 
            $this->beginTran();
            //var_dump($data);

            for ($i=0; $i < count($queries); ++$i){
                $this->prepareQuery($queries[$i]); //$this->resulSet = $this->cnn->prepare($queries[$i], array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                //var_dump($queries[$i]);
                //var_dump($data[$i]);
                //foreach ($data[$i] as $row)
                {
                    //var_dump($row);
                    $this->executeTran($data[$i]); //$result = $this->resulSet->execute($data[$i]);                //$stmt->execute($row);
                    
                    /*if (!$result){
                        $this->cnn->rollback();
                        //return array("error"=>1000, "data"=>('$queries[$i]' + ' --> ' + '$strmsg'));
                        return array("error"=>1000, "data"=>$strmsg);                        
                    }*/
                }
            }    

            $this->commitTran();
            return array("error"=>200, "data"=>(" procesada"));
        }
        catch (PDOException $e) 
        {
            $this->rollbackTran();
            return array("error"=>409, "data"=>($e->getMessage()));
        }
        catch (Exception $e) 
        {
            $this->rollbackTran();
            return array("error"=>409, "data"=>($e->getMessage()));
        }

        //return "Aqui";
    }       
}
?>
