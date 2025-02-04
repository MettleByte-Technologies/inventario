<?php 
    /******************** init session ***********************/
    require_once "../config/inc.php";

    include("../database/connectDB.php");

    if(isset($_POST['username']) && $_POST['username'] != '' && isset($_POST['password']) && $_POST['password'] != '') 
    {
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);

        if($username != "" )//&& $password != "") 
        {
            try {
                
                $query = "SELECT tuser.username user_id, tuser.username user_nickName, ".
                         "CONCAT(VEND_NOMBRE1, ' ', VEND_APELLIDO1) person_fullName, ".
                         "tuser.vend_codigo, tuser.vend_empresa, em.EMPR_NOMBRE ".
                         "FROM tbl_user_proyecto tuser ".
                         "INNER JOIN fa_vendedor tperson ".
                         "ON tuser.VEND_CODIGO = tperson.VEND_CODIGO ".
                         "AND tuser.VEND_EMPRESA = tperson.VEND_EMPRESA ".
                         "INNER JOIN in_empresa em ".
                         "ON tuser.VEND_EMPRESA = em.EMPR_CODIGO_EMPRESA ".
                         //"WHERE user_nickName = :username and user_password = AES_ENCRYPT(:password,'m@9@13')";
                         "WHERE username = :username and password = :password";
                         //"WHERE username = :username";
                
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
                    $_SESSION['sess_empresa']   = $row['EMPR_NOMBRE'];
                    $_SESSION['sess_vend_codigo']   = $row['vend_codigo'];
                    $_SESSION['sess_vend_empresa']   = $row['vend_empresa'];
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
        else 
        {
            echo "Both fields are required!";
        }
    } 
    else 
    {
        header('location:./');
    }
?>