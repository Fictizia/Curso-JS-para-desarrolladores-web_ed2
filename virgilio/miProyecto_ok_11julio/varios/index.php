<!DOCTYPE html>
<html>
<!--
  Created using 3boll.com:4444
  Source can be edited via http://3boll.com:4444/faqo/1/edit
-->

<head>
    <title>Nuevo Ajax</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="css/main.css">
</head>

<body>
    <div id="resultados">
        <div class="closebut" id="cerrar">X</div>
        <!--añadimos otro div dentro donde vamos a sacar la respuesta y no me  -->
        <div class="response">RESPONSE</div>
        
    </div>
    <hr>
    <div id="contenedor">
        <form id="loginForm" method="POST" action="comprobar.php">
            <h1>LOGIN DE USUARIOS</h1>
            <input type="text" id="usuario" name="user" max-legth="20" placeholder="Ingrese su usuario">
            <input type="password" id="password" name="pass" max-legth="20" placeholder="Ingrese su usuario">
            <button type="submit" class="registrar" value="registrar">Iniciar sesion</button>
        </form>
    </div>








    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script src="js\index.js"></script>
</body>

</html>