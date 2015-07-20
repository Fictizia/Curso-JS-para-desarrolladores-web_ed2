<?php
$pageTitle = 'Acceso de usuarios';
require_once('head.php');
//require_once('menu.php'); no lo quiero aqui
?>

<style type="text/css">
body{
    background: url(4167970218_ce690780e2_b.jpg);
    background-size: cover;
}
body h2{
  text-align: center;
  font-weight: normal;
  font-size: 40pt;
  color: #333333;
font-family: cursive;
}
header h1{
    padding-left: 50px;
  text-align: left;
  font-weight: normal;
  font-size: 40pt;
  color: #48D1CC;
font-family: cursive;
}
body h3{
  text-align: center;
  font-weight: bold;
  font-size: 40pt;
  color: #FF4500;
font-family: cursive;
}



.rojo {
    background-color: red;
    height: 150px !important;
    line-height: 150px;
    color: white;
}

.closebut {
    position: absolute;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: black;
    color: white;
    font-size: 25px;
    right: 15px;
    top: 15px;
    transition: 0.4s linear all;
}

.closebut:hover {
    background-color: white;
    color: blue;
}

#resultados {
    position: relative;
    width: 100%;
    height: 0px;
    /*asi hacemos que este arriba del todo*/
    
    float: right;
    margin-right: 100px;
    overflow: hidden;
    /*asi hacemos que el div 
    resultados no asome aunque tenga contenido*/
    
    transition: 0.4s linear all;
}

</style>

<header>
        <h1>Bienvenido al mundo de los mapas personalizados</h1>
    </header>


<div class="container">

    <div class="row">
    
        <div class="col-md-9">

        <form id="loginForm" method="POST" action="comprobar.php">
            <h1>LOGIN DE USUARIOS</h1>
            <input type="text" id="usuario" name="user" max-legth="20" placeholder="Ingrese su usuario">
            <input type="password" id="password" name="pass" max-legth="20" placeholder="Ingrese su usuario">
            <input class="btn btn-info" type="submit" value="Registrar">
        </form>










        </div>
    <div class="col-md-3">
        <div id="resultados">

          <div class="closebut" id="cerrar">
          &times;
          </div>
          <div id="response" class="response">
            
          </div>
-
        </div>
    </div>

  </div>


</div>
<br>
<br>
<br>
<br>
<br>
<DIV id="aa">
<h2>Si es tu primera vez pincha en el siguiente enlace</h2>
<h2>te llevará solo unos minutos</h2>
<h3><a href="nuevo_usuario.php">Registrarse</a></h3>
</DIV>
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script src="js\index.js"></script>
    <i class="fa fa-circle-o-notch fa-spin"></i>
              <i class="fa fa-refresh fa-spin"></i>
              <i class="fa fa-cog fa-spin"></i>
              <i class="fa fa-spinner fa-pulse"></i>
</body>

</html>




       