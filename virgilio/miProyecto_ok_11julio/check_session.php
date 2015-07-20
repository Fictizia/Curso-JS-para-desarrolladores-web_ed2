<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 

session_start(); 
if(!isset($_SESSION['userId'])){
	header('Location: salir.php?motivo=SIN SESION');
	exit;
}

?>