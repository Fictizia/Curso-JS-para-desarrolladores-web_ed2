<?php
    /*ini_set('display_errors',1);
    ini_set('display_startup_errors',1);
    error_reporting(-1);*/ 

    include 'funciones.php'; 


    if(isset($_POST["user"]) &&  isset($_POST["pass"])){
                  
      
      $resultado = comprobar($mysqli,$_POST["user"],$_POST["pass"]);



      //echo $resultado;  lo quitamos porque no puede haber NADA pintado antes
      //de redireccionar
      if($resultado !== 0){ //asi sabemos que no nos esta devolviendo un cero
          //echo 'LOKIN OK';
        //comennzamos la sesion
        //ponemos un parametro clave a la sesion
        //para usarlo como comprobacion

          session_start();

          //definimos los parametros de la sesion que nos interesen
          $_SESSION['loginTime'] = time();
          $_SESSION['userId'] = $resultado[0]["id"];
          $_SESSION['userName'] = $resultado[0]["usuario"];

          $_SESSION['UserPassword'] = $resultado[0]["password"];
          //$_SESSION['UserCreado'] = $resultado[0]["creado"];
          //$_SESSION['UserNombre'] = $resultado[0]["nombre"];//url de la foto del usuario
          //$_SESSION['UserApellidos'] = $resultado[0]["apellidos"];
          //$_SESSION['UserDireccion'] = $resultado[0]["direccion"];
          //$_SESSION['UserEmail'] = $resultado[0]["email"];
          //$_SESSION['UserTelefono'] = $resultado[0]["telefono"];
          //$_SESSION['UserFoto'] = $resultado[0]["foto"];


          header('Location: administrador_zone.php');

        //redirigimos a la zona de usuarios
          exit;


      }else{
        //echo "<script>alert('no funciona');</script>";
        header('Location: index.php');
        exit;
      }

      
	    

    }

      
?>
