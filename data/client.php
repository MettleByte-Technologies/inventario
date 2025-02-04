<?php
    require_once "../database/connectDB.php";
    //require_once "../database/entidadBase.php";

    class csClient extends connectDB{
        private $cod_empresa;
        private $empresa;
        private $regional;
        private $ruc;
        private $zona;
        private $codigo;
        private $razon_social;
        private $direccion;
        private $lista_precio;
        private $email;
        private $nombre_propietario;
        private $cupo_cred;
        private $fecha_ing;
        private $telefono;
        private $forma_pago;
        private $localidad;
        private $tipo;
        private $tipo_cliente;
        private $estado;

        public function __construct(){
            parent::__construct("connectDB");
            $this->cod_empresa = 0;
            $this->empresa = "";
            $this->regional = "";
            $this->ruc = "";
            $this->zona = "";
            $this->codigo = 0;
            $this->razon_social = "";
            $this->direccion = "";
            $this->lista_precio = 0;
            $this->email = "";
            $this->nombre_propietario = "";
            $this->cupo_cred = 0.0;
            $this->fecha_ing = "";
            $this->telefono = "";
            $this->forma_pago = "";
            $this->localidad = "";
            $this->tipo = 0;
            $this->tipo_cliente = "";
            $this->estado = "";
    
            $this->clase = "csClient";
        }

        public function getClients(){
            $obj = new EntidadBase("clv_cliente_proyecto", $this->cnn);
            return $obj->getAll();
        }
    

        public function getClientBySeller($empresa_id, $vendedor_id, $client){
            if (strlen(trim($client)) > 0 )
            {

                $CLIENT_ID = 0;

                try
                {
                    $CLIENT_ID = intval($client);


                    $query = 
                    "   SELECT CODIGO, REGIONAL, RUC, ZONA, RAZON_SOCIAL, DIRECCION, NOMBRE_PROPIETARIO, CUPO_CRED, TELEFONO, FORMA_PAGO, LOCALIDAD
                        FROM `clv_cliente_proyecto`
                        WHERE VENDEDOR = $vendedor_id
                          AND COD_EMPRESA = $empresa_id
                          AND CODIGO = '".$CLIENT_ID."'
                    ";                    
                }
                catch(Exception $exProduct)
                {

                }


                if ($CLIENT_ID == 0)
                    $query = 
                    "   SELECT CODIGO, REGIONAL, RUC, ZONA, RAZON_SOCIAL, DIRECCION, NOMBRE_PROPIETARIO, CUPO_CRED, TELEFONO, FORMA_PAGO, LOCALIDAD
                        FROM `clv_cliente_proyecto`
                        WHERE VENDEDOR = $vendedor_id
                          AND COD_EMPRESA = $empresa_id
                          AND UPPER(RAZON_SOCIAL) LIKE UPPER('%".$client."%')
                    ";                    
            }
            else                
                $query = 
                "   SELECT CODIGO, REGIONAL, RUC, ZONA, RAZON_SOCIAL, DIRECCION, NOMBRE_PROPIETARIO, CUPO_CRED, TELEFONO, FORMA_PAGO, LOCALIDAD
                    FROM `clv_cliente_proyecto`
                    WHERE VENDEDOR = $vendedor_id
                    AND COD_EMPRESA = $empresa_id

                ";



            /*$query = 
            "   SELECT *
                FROM `clv_cliente_proyecto`
                WHERE VENDEDOR = $vendedor_id
                AND COD_EMPRESA = $empresa_id
                AND (UPPER(CODIGO) LIKE UPPER('%".$client."%')
                 OR  UPPER(RUC) LIKE UPPER('%".$client."%')
                 OR  UPPER(NOMBRE) LIKE UPPER('%".$client."%')
                 OR  UPPER(RAZON_SOCIAL) LIKE UPPER('%".$client."%')
                 OR  UPPER(NOMBRE_PROPIETARIO) LIKE UPPER('%".$client."%'))
            ";*/

            return $this->dmlSelectArray($query); //Get result from select
        }

        public function getClientById($empresa_id, $vendedor_id, $client){
            $query = 
            "   SELECT *
                FROM `clv_cliente_proyecto`
                WHERE VENDEDOR = $vendedor_id
                AND COD_EMPRESA = $empresa_id
                AND CODIGO = $client
            ";

            return $this->dmlSelect($query); //Get result from select            
        }


        public function getClientByIdOrder($empresa_id, $vendedor_id, $client, $nOrder){
            $query = 
            "   SELECT cl.CODIGO, cl.NOMBRE, cl.RUC, cl.ZONA, cl.RAZON_SOCIAL, cl.DIRECCION, cl.TELEFONO, cl.ZONA, cl.LOCALIDAD, 
                fh.PEDI_CODIGO_PEDIDO, fd.DEPE_CODIGO_PRODUCTO, fd.DEPE_PRECIO, fd.DEPE_FECHA_ENTREGA, fd.DEPE_CANTIDAD_PEDIDO,
                pr.DESCRIPCION, fd.DEPE_COSTO, fd.DEPE_PRECIO_LISTA
                FROM `clv_cliente_proyecto`  cl
                INNER JOIN `fa_pedido` fh
                 ON cl.COD_EMPRESA = fh.PEDI_CODIGO_EMPRESA
                AND cl.CODIGO = fh.PEDI_CODIGO_CLIENTE
                INNER JOIN `fa_detalle_pedido` fd
                 ON fh.PEDI_CODIGO_EMPRESA = fd.DEPE_CODIGO_EMPRESA
                AND fh.PEDI_CODIGO_PEDIDO = fd.DEPE_CODIGO_PEDIDO
                INNER JOIN `inv_producto_proyecto` pr
                 ON fd.DEPE_CODIGO_PRODUCTO = pr.PRODUCTO
                WHERE cl.VENDEDOR = $vendedor_id
                AND cl.COD_EMPRESA = $empresa_id
                AND cl.CODIGO = $client
                AND fh.PEDI_CODIGO_PEDIDO = $nOrder
            ";
    //var_dump($query);
            $obj = new EntidadBase("", $this->cnn);
            return $obj->getAllQuery($query);
        }

        public function getOrderHeaderListArray($nOrder){
            $query = 
            "   SELECT 
                        PEDI_PRECIO_VTA,
                        PEDI_VALOR_PEDIDO,
                        PEDI_DESCUENTO_TOTAL,
                        PEDI_OBSERVACION,
                        PEDI_ALFA,
                        PEDI_CODIGO_BODEGA,
						PEDI_EXPORTADA
                FROM ".$this->schema."fa_pedido
                WHERE PEDI_CODIGO_PEDIDO IN ($nOrder)     
                ;
            ";
            //var_dump($query);
            return $this->dmlSelectArray($query); //Get result from select
        }

        public function getOrderDetailListArray($nOrder,  $client = 0){
            if ( $client == 0)
                $query = 
                "   SELECT                         
                            DEPE_CODIGO_PRODUCTO,
                            DESCRIPCION,
                            DEPE_CANTIDAD,
                            DEPE_PRECIO,
                            DEPE_COSTO,
                            DEPE_PORC_DSCTO1,
                            DEPE_PRECIO_LISTA,
                            DEPE_FECHA_ENTREGA,
                            DEPE_CANTIDAD_PEDIDO,
                            DEPE_PRECIO_G,
                            DEPE_CARACTER,
                            SALDO_INV
                    FROM ".$this->schema."fa_detalle_pedido od
                    INNER JOIN ".$this->schema."inv_producto_proyecto i
                    ON od.DEPE_CODIGO_PRODUCTO = i.PRODUCTO
                    WHERE depe_CODIGO_PEDIDO IN ($nOrder)
                    ;
                ";
            else
                $query = 
                "   SELECT                         
                            DEPE_CODIGO_PRODUCTO,
                            DESCRIPCION,
                            DEPE_CANTIDAD,
                            DEPE_PRECIO,
                            DEPE_COSTO,
                            DEPE_PORC_DSCTO1,
                            DEPE_PRECIO_LISTA,
                            DEPE_FECHA_ENTREGA,
                            DEPE_CANTIDAD_PEDIDO,
                            DEPE_PRECIO_G,
                            IFNULL(i.COD_LINEA, 0) COD_LINEA,
                            IFNULL(dsl.PORC_DSCTO, 0.0) DSCTO_LINEA,
                            IFNULL(i.COD_MARCA, 0) COD_MARCA,
                            IFNULL(dsm.PORC_DSCTO, 0.0) DSCTO_MARCA,
                            CONCAT('\'', DEPE_CODIGO_PRODUCTO) DEPE_CODIGO_PRODUCTO_XLS,
                            DEPE_CARACTER
                    FROM ".$this->schema."fa_detalle_pedido od
                    INNER JOIN ".$this->schema."inv_producto_proyecto i
                    ON od.DEPE_CODIGO_PRODUCTO = i.PRODUCTO
                    LEFT JOIN clv_dscto_linea_proyecto dsl
                    ON i.COD_LINEA = dsl.COD_LINEA
                    AND dsl.CLIENTE = $client
                    LEFT JOIN clv_dscto_marca_proyecto dsm
                    ON i.COD_MARCA = dsm.COD_MARCA
                    AND dsm.CLIENTE = $client
                    WHERE depe_CODIGO_PEDIDO IN ($nOrder)
                    ;
                ";


            
            return $this->dmlSelectArray($query); //Get result from select
        }
        

    }
?>