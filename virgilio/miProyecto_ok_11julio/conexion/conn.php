<?php


$db_host = "localhost";   //host
$db_name = "miproyecto";   //database name
$db_user = "virgilio2";  //database user_error!!!!!!!!!!!!!!!!!!!!
$db_pass = "virgilio2";  //password!!!!!!!!!!!!!!!!!!!!!!!!!

GLOBAL $errors;  //declaramos 2 variables globales para guardar 
GLOBAL $successes;  //los errores en caso de salir

$errors=array();  //cuando funciona la conexion se pueden borrar
$successes=array();

//las siguientes dos lineas me van a dar 
$err_level=error_reporting(0); //toda la informacion posible en caso de error
error_reporting($err_level);

$mysqli=new mysqli($db_host,$db_user,$db_pass,$db_name);
//mysqli -- funcion de php inerna para conectar con mysql
//la vamos a usar siempre
GLOBAL $mysqli;

$msg='parece que conecta bien';  
//echo $msg;  FUNCIONA
?>