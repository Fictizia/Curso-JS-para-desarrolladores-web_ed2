<?php
include 'funciones.php'; 
//print_r($_POST);
    if(isset($_POST["act"]) && $_POST["act"]==='COMPROBAR_FIRST' && isset(trim($_POST["user"])) &&  isset(trim($_POST["pass"])) &&  isset(trim($_POST["nombre"])) &&  isset(trim($_POST["apellidos"])) &&  isset(trim($_POST["direccion"])) &&  isset(trim($_POST["email"])) &&  isset(trim($_POST["telefono"])) ){
                  
 
      $resultado = UsuarioYaCreado($mysqli,$_POST["user"]);
      echo $resultado; //SIEMPREEEEEEEEEEEEEE PINTAR ALGO PARA LA VUELTA DEL AJAX

  }

 /*if(isset($_POST["user"]) &&  isset($_POST["pass"]) &&  isset($_POST["nombre_usuario"]) &&  isset($_POST["apellidos_usuario"]) &&  isset($_POST["direccion"]) &&  isset($_POST["email"]) &&  isset($_POST["telefono"]) ){
              
echo "hola";
//print_r($_POST);

      /*$resultado2 = crearUsuario($mysqli,$_POST["user"],$_POST["pass"],$_POST["nombre_usuario"],$_POST["apellidos_usuario"],$_POST["direccion"],$_POST["email"],$_POST["telefono"]);
      //echo $resultado2;


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
        
        header('Location: index.php');
        exit;
      }*/


  

      
?>
