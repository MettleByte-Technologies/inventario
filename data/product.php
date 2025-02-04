<?php
    /******************** init session ***********************/
    require_once "../config/inc.php";
    require_once "../database/connectDB.php";

    class csProduct extends connectDB{
        private $EMPRESA;
        private $PRODUCTO;
        private $DESCRIPCION;
        private $COD_MARCA;
        private $MARCA;
        private $COD_LINEA;
        private $LINEA;
        private $CODIGO_LISTA;
        private $PRECIO_PU;
        private $PRECIO_MY;
        private $COSTO;

        public function __construct(){
            parent::__construct("connectDB");
            $this->EMPRESA = 0;
            $this->PRODUCTO = "";
            $this->DESCRIPCION = "";
            $this->COD_MARCA = 0;
            $this->MARCA = "";
            $this->COD_LINEA = 0;
            $this->LINEA = "";
            $this->CODIGO_LISTA = 0;
            $this->PRECIO_PU = 0.0;
            $this->PRECIO_MY = 0.0;
            $this->COSTO = 0.0;
    
            $this->clase = "csProduct";
        }

        public function getGetDiscountProductSP($empresa_id, $client, $id_codigom, $id_codigol, $id_type = 1){
            $query = "";
            try{                
                $query = "CALL GetDiscountProduct($empresa_id, '$client', $id_codigom, $id_codigol, $id_type)";        
                //$query = "CALL GetDiscountProduct(2, '1285', 66, 679, 1)";        
                return $this->dmlStoreProcedure($query); //Get result from select                        
                //return $query;
            }
            catch(Exception $exProduct){
                $exmsg = $exProduct;
                return NULL;
            }
        }

        public function getProducstConditionSP($product, $empresa_id, $vendedor_id, $client, $linea = ""){
            $query = "";
            try{
                $CLIENT_ID = intval($client);
                $PRODUCTO_ID = 0;

                if ($CLIENT_ID > 0){//Buscar por empresa y cliente con % de descuento
                    //$PRODUCTO_ID = 0;
                    //$isNumber = 1;

                    try{
                        $PRODUCTO_ID = intval($product);   
                        $strProduct = strval($product);                                              
                    }
                    catch(Exception $exProduct){
                        $exmsg = $exProduct;
                        //$isNumber = 0;
                    }

                    if ($PRODUCTO_ID > 0)
                        $query = "CALL GetProductDiscount($empresa_id, '$client', '$strProduct',1)";
                    else if (strlen(trim($linea)) == 0){
                        $strProduct = strval($product). "%";                                            
                        $query = "CALL GetProductDiscount($empresa_id, '$client', '$strProduct',0)";
                    }
                    else if ($linea == ""){
                        $query = "CALL GetProductLinea($empresa_id, '$client', '$linea')";
                    }
                    else
                        $query = "CALL GetProductLinea($empresa_id, '$client', '$linea')";

                    //var_dump($PRODUCTO_ID);
                    return $this->dmlStoreProcedure($query); //Get result from select        
                    //var_dump($this->dmlStoreProcedure($query));
                }
                else{//Buscar productos por empresa
                    //var_dump("sin cliente");
                    try{
                        $PRODUCTO_ID = intval($product);            
                        $strProduct = strval($product);
                    }
                    catch(Exception $exProduct){
                        $exmsg = $exProduct;
                        //$isNumber = 0;
                        $strProduct = strval($product). "%";
                    }
                    
                    if ($PRODUCTO_ID > 0)
                        $query = "CALL GetProductDiscount($empresa_id, '$client', '$strProduct',1)";
                    else 
                        $query = "CALL GetProductDiscount($empresa_id, '$client', '$strProduct',0)";
    
                    //var_dump($query);
                    //var_dump("sin cliente y producto");
                    return $this->dmlStoreProcedure($query); //Get result from select   
                }               
            }
            catch(Exception $exProduct){
                $exmsg = $exProduct;

                try{
                    $PRODUCTO_ID = intval($product);            
                }
                catch(Exception $exProduct){
                    $exmsg = $exProduct;
                    //$isNumber = 0;
                }
                $strProduct = strval($product). "%";                                            

                if ($PRODUCTO_ID > 0)
                    $query = "CALL GetProductDiscount($empresa_id, '$client', '$strProduct',1)";
                else 
                    $query = "CALL GetProductDiscount($empresa_id, '$client', '$strProduct',0)";

                //var_dump($query);
                //var_dump("sin cliente y producto");
                return $this->dmlStoreProcedure($query); //Get result from select        
                //var_dump($this->dmlStoreProcedure($query));
            }
        }

        public function getProducstCondition($product, $empresa_id, $vendedor_id, $client){
            //var_dump($product);
            //var_dump($vendedor_id);
            //var_dump($client);
            $CLIENT_ID = intval($client);
            //var_dump($CLIENT_ID);
            if ($CLIENT_ID > 0)
            {
                $PRODUCTO_ID = 0;

                try
                {
                    $PRODUCTO_ID = intval($product);

                    /*$query = 
                    "   SELECT p.*, MAX(ds.PORC_DSCTO) PORC_DSCTO
                        FROM `inv_producto_proyecto` p
                        LEFT JOIN `VW_DSCTOS` ds
                        ON ((TIPO = 'LINEA' AND COD_DSCTO = p.COD_LINEA)
                        OR (TIPO = 'MARCA' AND COD_DSCTO = p.COD_MARCA))
                        AND p.EMPRESA = ds.EMPRESA
                        AND CLIENTE = '".$CLIENT_ID."'
                        WHERE p.EMPRESA = '".$empresa_id."'                        
                        AND PRODUCTO = '".$PRODUCTO_ID."'                        
                    "; */             
                }
                catch(Exception $exProduct)
                {
                    $exmsg = $exProduct;
                }


                if ($PRODUCTO_ID > 0){
                    //var_dump($this->getProducsDscto($empresa_id, $client, $product));
                    $vdsctopr = "0";
                    try{
                        $dsctopr = $this->getProducsDscto($empresa_id, $client, $product);
                        //$dsctopr = $dsctopr["data"][0]["PORC_DSCTO"];
                        //var_dump($dsctopr["data"][0]["PORC_DSCTO"] != NULL);
                        //if (!isset($dsctopr["data"]))
                        if ($dsctopr["error"] == 0)
                            $vdsctopr = ($dsctopr["data"][0]["PORC_DSCTO"] != NULL ? $dsctopr["data"][0]["PORC_DSCTO"] : 0);                             
                        else
                            $vdsctopr = "0";       
                            
                            //var_dump($vdsctopr);
                    }
                    catch(Exception $errstock){
                        $vdsctopr = "0";
                    }

                    $query = 
                    "   SELECT p.*, " . $vdsctopr . " PORC_DSCTO
                        FROM `inv_producto_proyecto` p
                        WHERE p.EMPRESA = '".$empresa_id."'                        
                        AND PRODUCTO = '".$PRODUCTO_ID."'                        
                    ";                        
                }
                else if ($PRODUCTO_ID == 0)
                    $query = 
                    "   SELECT p.*, 0 PORC_DSCTO
                        FROM `inv_producto_proyecto` p
                        WHERE p.EMPRESA = '".$empresa_id."'                        
                        AND (UPPER(DESCRIPCION) LIKE UPPER('%".$product."%')
                        OR UPPER(MARCA) LIKE UPPER('%".$product."%')
                        OR UPPER(LINEA) LIKE UPPER('%".$product."%'))
                    ";                    

                    /*$query = 
                    "   SELECT p.*, MAX(ds.PORC_DSCTO) PORC_DSCTO
                        FROM `inv_producto_proyecto` p
                        LEFT JOIN `vw_dsctos` ds
                        ON ((TIPO = 'LINEA' AND COD_DSCTO = p.COD_LINEA)
                        OR (TIPO = 'MARCA' AND COD_DSCTO = p.COD_MARCA))
                        AND p.EMPRESA = ds.EMPRESA
                        AND CLIENTE = '".$CLIENT_ID."'
                        WHERE p.EMPRESA = '".$empresa_id."'                        
                        AND UPPER(DESCRIPCION) LIKE UPPER('%".$product."%')
                        OR UPPER(MARCA) LIKE UPPER('%".$product."%')
                        OR UPPER(LINEA) LIKE UPPER('%".$product."%')
                    ";*/                    

            
        //var_dump($query);

            }
            else
                if (strlen(trim($product)) > 0)
                {
                    $PRODUCTO_ID = 0;

                    try
                    {
                        $PRODUCTO_ID = intval($product);


                        $query = 
                        "   SELECT p.*, 0 PORC_DSCTO
                            FROM `inv_producto_proyecto` p
                            WHERE p.EMPRESA = '".$empresa_id."'                        
                            AND PRODUCTO = '".$PRODUCTO_ID."'                        
                        ";                    
                    }
                    catch(Exception $exProduct)
                    {
                        $exmsg = $exProduct;
                    }


                    if ($PRODUCTO_ID == 0)
                        $query = 
                        "   SELECT p.*, 0 PORC_DSCTO
                            FROM `inv_producto_proyecto` p
                            WHERE p.EMPRESA = '".$empresa_id."'                        
                            AND (UPPER(DESCRIPCION) LIKE UPPER('%".$product."%') 
                            OR UPPER(MARCA) LIKE UPPER('%".$product."%')
                            OR UPPER(LINEA) LIKE UPPER('%".$product."%'))
                        ";                    
                }
                else
                    $query = 
                    "   SELECT *, 0 PORC_DSCTO
                        FROM `inv_producto_proyecto` p
                        WHERE p.EMPRESA = '".$empresa_id."'
                    ";
            //var_dump($query);
            return $this->dmlSelectArray($query); //Get result from select        
        }

        public function getProducsDscto($empresa, $client, $product){
            $query = 
            "   SELECT MAX(IFNULL(ds.PORC_DSCTO,0)) PORC_DSCTO
                FROM `inv_producto_proyecto` p
                LEFT JOIN `vw_dsctos` ds
                ON ((TIPO = 'LINEA' AND COD_DSCTO = p.COD_LINEA)
                OR (TIPO = 'MARCA' AND COD_DSCTO = p.COD_MARCA))
                AND p.EMPRESA = ds.EMPRESA
                AND CLIENTE = '".$client."'
                WHERE p.EMPRESA = '".$empresa."'                        
                AND PRODUCTO = '".$product."'                        
            ";                    

            //var_dump($query);
            return $this->dmlSelectArray($query); //Get result from select        
        } 
        
        public function setProducStock($empresa, $product, $stock){
            $query = 
            "   UPDATE `inv_producto_proyecto`
                SET SALDO_INV = ".$stock."
                WHERE EMPRESA = '".$empresa."'                        
                AND PRODUCTO = '".$product."'                        
            ";                    

            return $this->dmlSelectArray($query); //Get result from select        
            //$obj = new EntidadBase("", $this->cnn);
            //$obj->getAllQuery($query);
            //return $query;
            //var_dump($query);
        } 
        
        public function getProducsMarca($empresa){
            /*$query = 
            "   SELECT DISTINCT COD_MARCA, MARCA
                FROM vw_marca_linea
                WHERE COD_MARCA <> 11
                AND EMPRESA = $empresa
                ORDER BY MARCA
            ";  */
            $query =
            "
                SELECT DISTINCT MARCA, COD_MARCA 
                  FROM inv_producto_proyecto 
                 WHERE EMPRESA = $empresa
                 AND COD_MARCA <> 11
            ";            

            //var_dump($query);
            return $this->dmlSelectArray($query); //Get result from select        
        }         

        public function getProducsLinea($cod_marca, $empresa){
            /*$query = 
            "   SELECT DISTINCT COD_LINEA, LINEA
                FROM vw_marca_linea
                WHERE COD_MARCA = $cod_marca
                AND EMPRESA = $empresa
                ORDER BY LINEA
            ";  */
            $query =
            "
            SELECT DISTINCT LINEA, COD_LINEA
              FROM inv_producto_proyecto 
             WHERE EMPRESA = $empresa  
               AND COD_MARCA = $cod_marca
            ";

            //var_dump($query);
            return $this->dmlSelectArray($query); //Get result from select        
        }   
    }
?>