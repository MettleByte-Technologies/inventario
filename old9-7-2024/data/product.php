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

            $obj = new EntidadBase("", $this->cnn);
            $obj->getAllQuery($query);
            //return $query;
            //var_dump($query);
        } 
        

    }
?>