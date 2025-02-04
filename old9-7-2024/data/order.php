<?php
    /******************** init session ***********************/
    //require_once "../config/inc.php";
    require_once "../database/connectDB.php";
    //require_once "../database/entidadBase.php";

    class csOrder extends connectDB{
        private $PEDI_CODIGO_EMPRESA;
        private $PEDI_TIPO;
        private $PEDI_TIPO_CLIENTE;
        private $PEDI_CODIGO_PEDIDO;
        private $PEDI_ORDEN_COMPRA;
        private $PEDI_CODIGO_CLIENTE;
        private $PEDI_NOMBRE_CLIENTE;
        private $PEDI_DIRECCION;
        private $PEDI_TELEFONO;
        private $PEDI_CEDULA_RUC;
        private $PEDI_CODIGO_BODEGA;
        private $PEDI_CODIGO_VENDEDOR;
        private $PEDI_COMISION;
        private $PEDI_PRECIO_VTA;
        private $PEDI_FECHA;
        private $PEDI_FECHA_ENTREGA;
        private $PEDI_FECHA_ULTIMO_DESP;
        private $PEDI_TIPO_MONEDA;
        private $PEDI_TIPO_CAMBIO;
        private $PEDI_VALOR_PEDIDO;
        private $PEDI_FORMA_PAGO;
        private $PEDI_CODIGO_DSCTO;
        private $PEDI_DESCUENTO_TOTAL;
        private $PEDI_IVA;
        private $PEDI_VALOR_IVA;
        private $PEDI_FECHA_POSTERGA_VCTO;
        private $PEDI_FECHA_COBRO;
        private $PEDI_VALOR_DESCUENTO;
        private $PEDI_FECHA_ANULACION;
        private $PEDI_ESTADO;
        private $PEDI_USUARIO;
        private $PEDI_TERMINAL;
        private $PEDI_FECHA_SISTEMA;
        private $PEDI_OBSERVACION;
        private $PEDI_ALFA;
        private $PEDI_TOTAL_ICE;

        public function __construct(){
            parent::__construct("connectDB");
            $this->PEDI_CODIGO_EMPRESA = 0;
            $this->PEDI_TIPO = 0;
            $this->PEDI_TIPO_CLIENTE = 0;
            $this->PEDI_CODIGO_PEDIDO = 0;
            $this->PEDI_ORDEN_COMPRA = "";
            $this->PEDI_CODIGO_CLIENTE = 0;
            $this->PEDI_NOMBRE_CLIENTE = "";
            $this->PEDI_DIRECCION = "";
            $this->PEDI_TELEFONO = "";
            $this->PEDI_CEDULA_RUC = "";
            $this->PEDI_CODIGO_BODEGA = 0;
            $this->PEDI_CODIGO_VENDEDOR = 0;
            $this->PEDI_COMISION = 0;
            $this->PEDI_PRECIO_VTA = "";
            $this->PEDI_FECHA = "";
            $this->PEDI_FECHA_ENTREGA = "";
            $this->PEDI_FECHA_ULTIMO_DESP = "";
            $this->PEDI_TIPO_MONEDA = "";
            $this->PEDI_TIPO_CAMBIO = "";
            $this->PEDI_VALOR_PEDIDO = "";
            $this->PEDI_FORMA_PAGO = "";
            $this->PEDI_CODIGO_DSCTO = "";
            $this->PEDI_DESCUENTO_TOTAL = "";
            $this->PEDI_IVA = "";
            $this->PEDI_VALOR_IVA = "";
            $this->PEDI_FECHA_POSTERGA_VCTO = "";
            $this->PEDI_FECHA_COBRO = "";
            $this->PEDI_VALOR_DESCUENTO = "";
            $this->PEDI_FECHA_ANULACION = "";
            $this->PEDI_ESTADO = "";
            $this->PEDI_USUARIO = "";
            $this->PEDI_TERMINAL = "";
            $this->PEDI_FECHA_SISTEMA = "";
            $this->PEDI_OBSERVACION = "";
            $this->PEDI_ALFA = "";
            $this->PEDI_TOTAL_ICE = "";

            $this->clase = "csOrder";
        }

        public function getOrderList($empresa_id, $vendedor_id,$asc=0){
            $order = ($asc == 0 ? 'ASC' : 'DESC');

            if ($vendedor_id == 1 || $vendedor_id == 41 || $vendedor_id == 87 || $vendedor_id == 88 || $vendedor_id == 82 || $vendedor_id == 100000 || $vendedor_id == 100001 || $vendedor_id == 100002 || $vendedor_id == 100003 || $vendedor_id == 100004 || $vendedor_id == 100005)
                $query = 
                "   SELECT *, cl.RAZON_SOCIAL
                    FROM ".$this->schema."fa_pedido fp
                    INNER JOIN ".$this->schema."clv_cliente_proyecto cl
                      ON fp.PEDI_CODIGO_EMPRESA = cl.COD_EMPRESA
                     AND fp.PEDI_CODIGO_VENDEDOR = cl.VENDEDOR
                     AND fp.PEDI_CODIGO_CLIENTE = cl.CODIGO                    
                    AND PEDI_CODIGO_EMPRESA = $empresa_id
                    ORDER BY PEDI_CODIGO_PEDIDO $order;
                ";
            else 
                $query = 
                "   SELECT *, cl.RAZON_SOCIAL
                    FROM ".$this->schema."fa_pedido fp
                    INNER JOIN ".$this->schema."clv_cliente_proyecto cl
                      ON fp.PEDI_CODIGO_EMPRESA = cl.COD_EMPRESA
                     AND fp.PEDI_CODIGO_VENDEDOR = cl.VENDEDOR
                     AND fp.PEDI_CODIGO_CLIENTE = cl.CODIGO                    
                    WHERE PEDI_CODIGO_VENDEDOR = $vendedor_id
                    AND PEDI_CODIGO_EMPRESA = $empresa_id
                    ORDER BY PEDI_CODIGO_PEDIDO $order;
                ";
            
            return $this->dmlSelectArray($query); //Get result from select
        }

        public function getOrderListArray($empresa_id, $vendedor_id,$asc=0){
            $order = ($asc == 0 ? 'ASC' : 'DESC');

            if ($vendedor_id == 1 || $vendedor_id == 41 || $vendedor_id == 87 || $vendedor_id == 88 || $vendedor_id == 82 || $vendedor_id == 100000 || $vendedor_id == 100001 || $vendedor_id == 100002 || $vendedor_id == 100003 || $vendedor_id == 100004 || $vendedor_id == 100005)
            
                $query = 
                "   SELECT PEDI_CODIGO_EMPRESA, PEDI_CODIGO_PEDIDO, PEDI_CODIGO_VENDEDOR, concat(VEND_NOMBRE1, ' ', VEND_APELLIDO1) VENDEDOR, 
                           PEDI_CODIGO_CLIENTE, cl.RAZON_SOCIAL, PEDI_FECHA_SISTEMA, CASE WHEN PEDI_ENVIADO = 'C' THEN 'CREADA' WHEN PEDI_ENVIADO = 'N' THEN 'NO ENVIADA' WHEN PEDI_ENVIADO = 'E' THEN 'ENVIADA' END ESTADO  
                    FROM ".$this->schema."fa_pedido fp
                    INNER JOIN ".$this->schema."clv_cliente_proyecto cl
                      ON fp.PEDI_CODIGO_EMPRESA = cl.COD_EMPRESA
                     AND fp.PEDI_CODIGO_VENDEDOR = cl.VENDEDOR
                     AND fp.PEDI_CODIGO_CLIENTE = cl.CODIGO                    
                    AND PEDI_CODIGO_EMPRESA = $empresa_id
                    AND PEDI_FECHA_ANULACION IS NULL
                    INNER JOIN ".$this->schema."fa_vendedor fv
                    ON fp.PEDI_CODIGO_VENDEDOR = fv.VEND_CODIGO
                    AND fp.PEDI_CODIGO_EMPRESA = fv.VEND_EMPRESA  
                    ;
                ";
            else
                $query = 
                "   SELECT PEDI_CODIGO_EMPRESA, PEDI_CODIGO_PEDIDO, PEDI_CODIGO_VENDEDOR, concat(VEND_NOMBRE1, ' ', VEND_APELLIDO1) VENDEDOR, 
                           PEDI_CODIGO_CLIENTE, cl.RAZON_SOCIAL, PEDI_FECHA_SISTEMA, CASE WHEN PEDI_ENVIADO = 'C' THEN 'CREADA' WHEN PEDI_ENVIADO = 'N' THEN 'NO ENVIADA' WHEN PEDI_ENVIADO = 'E' THEN 'ENVIADA' END ESTADOADO
                    FROM ".$this->schema."fa_pedido fp
                    INNER JOIN ".$this->schema."clv_cliente_proyecto cl
                      ON fp.PEDI_CODIGO_EMPRESA = cl.COD_EMPRESA
                     AND fp.PEDI_CODIGO_VENDEDOR = cl.VENDEDOR
                     AND fp.PEDI_CODIGO_CLIENTE = cl.CODIGO                    
                    INNER JOIN ".$this->schema."fa_vendedor fv
                     ON fp.PEDI_CODIGO_VENDEDOR = fv.VEND_CODIGO
                     AND fp.PEDI_CODIGO_EMPRESA = fv.VEND_EMPRESA  
                     WHERE PEDI_CODIGO_VENDEDOR = $vendedor_id
                    AND PEDI_CODIGO_EMPRESA = $empresa_id
                    AND PEDI_FECHA_ANULACION IS NULL
                    
                    ;
                ";

             //var_dump($query)   ;
            return $this->dmlSelectArray($query); //Get result from select

        }

        public function setOrderHeader($empresa_id, $vendedor_id, $client, $valor, $dscto, $porcdscto, $usuario){
            $noOrder = $this->getNoOrder();

            if ($noOrder['error'] == 0)
            {
                $pedido = $noOrder['data'][0]['nOrder'];
                $data = array([$empresa_id, $pedido, $client, $vendedor_id, $valor, $dscto, $porcdscto, $usuario]);

                $query = 
                "   
                    INSERT INTO `fa_pedido`
                    (`PEDI_CODIGO_EMPRESA`,
                    `PEDI_TIPO`,
                    `PEDI_TIPO_CLIENTE`,
                    `PEDI_CODIGO_PEDIDO`,
                    `PEDI_ORDEN_COMPRA`,
                    `PEDI_CODIGO_CLIENTE`,
                    `PEDI_NOMBRE_CLIENTE`,
                    `PEDI_DIRECCION`,
                    `PEDI_TELEFONO`,
                    `PEDI_CEDULA_RUC`,
                    `PEDI_CODIGO_BODEGA`,
                    `PEDI_CODIGO_VENDEDOR`,
                    `PEDI_COMISION`,
                    `PEDI_PRECIO_VTA`,
                    `PEDI_FECHA`,
                    `PEDI_FECHA_ENTREGA`,
                    `PEDI_FECHA_ULTIMO_DESP`,
                    `PEDI_TIPO_MONEDA`,
                    `PEDI_TIPO_CAMBIO`,
                    `PEDI_VALOR_PEDIDO`,
                    `PEDI_FORMA_PAGO`,
                    `PEDI_CODIGO_DSCTO`,
                    `PEDI_DESCUENTO_TOTAL`,
                    `PEDI_IVA`,
                    `PEDI_VALOR_IVA`,
                    `PEDI_FECHA_POSTERGA_VCTO`,
                    `PEDI_FECHA_COBRO`,
                    `PEDI_VALOR_DESCUENTO`,
                    `PEDI_FECHA_ANULACION`,
                    `PEDI_ESTADO`,
                    `PEDI_USUARIO`,
                    `PEDI_TERMINAL`,
                    `PEDI_FECHA_SISTEMA`,
                    `PEDI_OBSERVACION`,
                    `PEDI_ALFA`,
                    `PEDI_TOTAL_ICE`)
                    VALUES(
                        ?,
                        1,
                        1,
                        ?,
                        '',
                        ?,
                        '',
                        '',
                        '',
                        '',
                        7,
                        ?,
                        1,
                        0.0,
                        NOW(),
                        NOW(),
                        null,
                        2,
                        null,
                        ?,
                        5,
                        null,
                        ?,
                        12.0,
                        12.0, 
                        null,
                        null,
                        ?,
                        null,
                        'P',
                        ?,
                        'WEB',
                        NOW(),
                        '',
                        null,
                        0.0);          
                ";
           
                $pedidoNew = $this->dmlInsertTrans($query, $data, "Error al crear nuevo pedido, intente nuevamente!"); //Get result from select
                if ($pedidoNew['error'] == 0)
                    return $noOrder;                
                else
                    return $pedidoNew;
            }
            
            return $noOrder;
            //return array("error"=>0, "data"=>"insert ok");
        }

        public function setOrderItemDetail($data){
            $list = $data;
            $query = $this->getQueryItemTotal();

            //var_dump($list);
            //var_dump($query);

            $item = $this->dmlTrans($query, $list, "Error al agregar el producto al pedido, intente nuevamente!"); //Get result from select
            return $item;
        }

        public function setOrderDetail($noOrder, $empresa_id, $vendedor_id, $client, $product, $qty, $valor, $dscto, $price, $porcdscto){
            $query = 
            "   
                INSERT INTO `fa_detalle_pedido`
                (`DEPE_CODIGO_EMPRESA`,
                `DEPE_CODIGO_BODEGA`,
                `DEPE_CODIGO_PEDIDO`,
                `DEPE_CODIGO_PRODUCTO`,
                `DEPE_CANTIDAD`,
                `DEPE_PRECIO`,
                `DEPE_PAGO_IVA`,
                `DEPE_COSTO`,
                `DEPE_CANT_DSCTO1`,
                `DEPE_PORC_DSCTO1`,
                `DEPE_CODIGO_DSCTO1`,
                `DEPE_CANT_DSCTO2`,
                `DEPE_PORC_DSCTO2`,
                `DEPE_CODIGO_DSCTO2`,
                `DEPE_CANT_DSCTO3`,
                `DEPE_PORC_DSCTO3`,
                `DEPE_CODIGO_DSCTO3`,
                `DEPE_CANT_DSCTO4`,
                `DEPE_PORC_DSCTO4`,
                `DEPE_CODIGO_DSCTO4`,
                `DEPE_CANT_DSCTO5`,
                `DEPE_PORC_DSCTO5`,
                `DEPE_CODIGO_DSCTO5`,
                `DEPE_FECHA_ENTREGA`,
                `DEPE_PRECIO_LISTA`,
                `DEPE_CANTIDAD_PEDIDO`,
                `DEPE_CANTIDAD_OBS`,
                `DEPE_EXTRA`,
                `DEPE_PRECIO_G`,
                `DEPE_NUMERO`,
                `DEPE_NUMERO2`,
                `DEPE_CARACTER`,
                `DEPE_CARACTER2`,
                `DEPE_BACKORDER`,
                `DEPE_ENVIO_MAIL`,
                `DEPE_VALOR_ICE`)
                VALUES
                ($empresa_id,
                7,
                $noOrder,
                $product,
                $qty,
                $price,
                'S',
                $dscto,
                $porcdscto,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NOW(),
                $valor,
                $qty,
                NULL,
                0,
                $valor,
                NULL,
                NULL,
                '',
                '',
                NULL,
                '',
                0.00);
            ";
    
            //var_dump($query);

            $obj = new EntidadBase("", $this->cnn);
            $obj->getAllQuery($query);
            return "Procesado";
        }

        public function setOrderPendingSent($nOrder)
        {
            $query = 
            "   UPDATE `fa_pedido`
                SET PEDI_ENVIADO = 'N'
                WHERE PEDI_CODIGO_PEDIDO = $nOrder;
            ";
    
            return $this->dmlUpdate($query, "Orden procesada exitosamente."); //Get result from select
        }

        public function setTotalsOrder($nOrder, $tot_qty, $tot_dscto, $total)
        {
            $query = 
            "   UPDATE `fa_pedido`
                SET PEDI_PRECIO_VTA = $total,
                    PEDI_VALOR_PEDIDO = $tot_qty,
                    PEDI_DESCUENTO_TOTAL = $tot_dscto
                WHERE PEDI_CODIGO_PEDIDO = $nOrder;
            ";
    
            $obj = new EntidadBase("", $this->cnn);
            return $obj->getAllQuery($query);
        }

        public function getNoOrder(){
            $query = 
            "   SELECT MAX(`PEDI_CODIGO_PEDIDO`)+1 nOrder
                FROM `fa_pedido`
            ";
    
            return $this->dmlSelectArray($query); //Get result from select
        }

        public function getLastOrder(){
            $query = 
            "   SELECT PEDI_CODIGO_PEDIDO nOrder 
                FROM `fa_pedido`
                ORDER BY PEDI_CODIGO_PEDIDO DESC LIMIT 1 
            ";
    
            return $this->dmlSelectArray($query); //Get result from select
        }

        public function getOrder($norder){
            $query = 
            "   SELECT * 
                FROM `fa_detalle_pedido`
                WHERE DEPE_CODIGO_PEDIDO = 19
                AND DEPE_CODIGO_EMPRESA = 1;
            ";
    
            $obj = new EntidadBase("", $this->cnn);
            return $obj->getAllQuery($query);
        }
        
        public function updateHeaderOrder($empresa_id, $norder, $total_items, $total_dscto, $total_pagar){
            $query = 
            "   UPDATE ".$this->schema."fa_pedido
                   SET PEDI_PRECIO_VTA = $total_pagar,
                   PEDI_VALOR_PEDIDO = $total_items,
                   PEDI_DESCUENTO_TOTAL = $total_dscto
                WHERE PEDI_CODIGO_PEDIDO = $norder
                AND PEDI_CODIGO_EMPRESA = $empresa_id
                ;
            ";
            //var_dump($query);
            return $this->dmlUpdate($query, "Pedido $norder"); //Get result from select
        }

        public function deleteOrder($empresa_id, $norder){
            $query = 
            "   UPDATE ".$this->schema."fa_pedido
                   SET PEDI_FECHA_ANULACION = NOW()
                WHERE PEDI_CODIGO_PEDIDO = $norder
                AND PEDI_CODIGO_EMPRESA = $empresa_id
                ;
            ";
            //var_dump($query);
            return $this->dmlUpdate($query, "Pedido $norder"); //Get result from select
        }

        public function deleteItem($empresa_id,$norder,$nitem){
            $query = 
            "   DELETE FROM ".$this->schema."fa_detalle_pedido
                WHERE DEPE_CODIGO_PEDIDO = $norder
                AND DEPE_CODIGO_EMPRESA = $empresa_id
                AND DEPE_CODIGO_PRODUCTO = $nitem
                ;
            ";
            return $this->dmlUpdate($query, "Pedido $norder"); //Get result from select
        }

        public function getQueryItemTotal(){
            $queries = array();

            array_push($queries,"UPDATE `fa_pedido` SET PEDI_PRECIO_VTA = ?, PEDI_VALOR_PEDIDO = ?, PEDI_DESCUENTO_TOTAL = ? WHERE PEDI_CODIGO_PEDIDO = ?");
            array_push($queries,"INSERT INTO `fa_detalle_pedido`
            (`DEPE_CODIGO_EMPRESA`,
            `DEPE_CODIGO_BODEGA`,
            `DEPE_CODIGO_PEDIDO`,
            `DEPE_CODIGO_PRODUCTO`,
            `DEPE_CANTIDAD`,
            `DEPE_PRECIO`,
            `DEPE_PAGO_IVA`,
            `DEPE_COSTO`,
            `DEPE_CANT_DSCTO1`,
            `DEPE_PORC_DSCTO1`,
            `DEPE_CODIGO_DSCTO1`,
            `DEPE_CANT_DSCTO2`,
            `DEPE_PORC_DSCTO2`,
            `DEPE_CODIGO_DSCTO2`,
            `DEPE_CANT_DSCTO3`,
            `DEPE_PORC_DSCTO3`,
            `DEPE_CODIGO_DSCTO3`,
            `DEPE_CANT_DSCTO4`,
            `DEPE_PORC_DSCTO4`,
            `DEPE_CODIGO_DSCTO4`,
            `DEPE_CANT_DSCTO5`,
            `DEPE_PORC_DSCTO5`,
            `DEPE_CODIGO_DSCTO5`,
            `DEPE_FECHA_ENTREGA`,
            `DEPE_PRECIO_LISTA`,
            `DEPE_CANTIDAD_PEDIDO`,
            `DEPE_CANTIDAD_OBS`,
            `DEPE_EXTRA`,
            `DEPE_PRECIO_G`,
            `DEPE_NUMERO`,
            `DEPE_NUMERO2`,
            `DEPE_CARACTER`,
            `DEPE_CARACTER2`,
            `DEPE_BACKORDER`,
            `DEPE_ENVIO_MAIL`,
            `DEPE_VALOR_ICE`)
            VALUES
                    (?,
                    7,
                    ?,
                    ?,
                    ?,
                    ?,
                    'S',
                    ?,
                    NULL,
                    ?,
                    NULL,
                    NULL,
                    NULL,
                    NULL,
                    NULL,
                    NULL,
                    NULL,
                    NULL,
                    NULL,
                    NULL,
                    NULL,
                    NULL,
                    NULL,
                    NOW(),
                    ?,
                    ?,
                    NULL,
                    0,
                    ?,
                    NULL,
                    NULL,
                    '',
                    '',
                    NULL,
                    '',
                    0.00);
                ");

            return $queries;
        }
    }
?>