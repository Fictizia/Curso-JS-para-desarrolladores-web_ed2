<?php
include 'funciones.php'; 

 if(isset($_POST["user"]) &&  trim($_POST["user"])!== NULL &&  isset($_POST["pass"]) &&  trim($_POST["pass"])!== NULL &&  isset($_POST["nombre_usuario"]) &&  trim($_POST["nombre_usuario"])!== NULL &&  isset($_POST["apellidos_usuario"]) &&  trim($_POST["apellidos_usuario"])!== NULL &&  isset($_POST["direccion"]) && trim($_POST["direccion"])!== NULL &&  isset($_POST["email"]) &&  trim($_POST["email"])!== NULL &&  isset($_POST["telefono"]) && trim($_POST["telefono"])!== NULL ){
              

      $resultado2 = crearUsuario($mysqli,$_POST["user"],$_POST["pass"],$_POST["nombre_usuario"],$_POST["apellidos_usuario"],$_POST["direccion"],$_POST["email"],$_POST["telefono"]);
      //echo $resultado2;  NUNCA SE PUEDE PONER UN echo/print ANTES DE session_start(); !!!!!!!!!!!!!!!!!!!!!!!!


        //echo 'LOGIN OK USUARIO INSERTADO' .$resultado2;

        session_start();
        //echo 'Welcome to page #1';
        //definimos los parametros de la sesion que nos interesen
        $_SESSION['loginTime'] = time();
        $_SESSION['userId'] = $resultado2[0]["id"];
        $_SESSION['userName'] = $resultado2[0]["usuario"];

        header('Location: user_zone.php');
        exit;

         }else{
        echo "fallooooooooooooooooooooooooooooooo";
        header('Location: index.php');
        exit;
      }


  

      
?>
