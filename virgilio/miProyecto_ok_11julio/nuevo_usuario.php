<!DOCTYPE html>
<html>

<head>

<style>

#cont_newUserForm{
    padding-top: 50px;
    border: solid
}
#newUserForm{
  border: solid;
  background: url(4167970218_ce690780e2_b.jpg);
  width: 380px;
  border: 1px solid #4e4d4d; 
  border-radius: 3px;
  box-shadow: inset 0 0 10px #000;
  margin: 0px auto;
}
#newUserForm span{

}
#newUserForm h1{
  text-align: center;
  color: #CC6633;
  font-weight: normal;
  font-size: 40pt;
  margin: 30px 0px;
  font-family: cursive;

}
#newUserForm input{
  width: 280px;
  height: 40px;
  padding: 0px 10px;
  color: #6d6d6d;
  text-align: center;
  margin: 10px 40px;

}
#newUserForm button{
  width: 220px;
  margin:10px 80px 30px 80px;
  height: 50px;

  background: #CC6600;
  color: white;
  border: solid 1px black;
  box-shadow:  0px 2px 0px black;
  border-radius: 3px;
}
#newUserForm button:hover{
  background: black;
  color: white;
}

body{
  background:#333333;

}

#registrar{
  width: 220px;
  margin: auto;
  height: 50px;

  background: #CC6600;
  color: white;
  border: solid 1px black;
  box-shadow:  0px 2px 0px black;
  border-radius: 3px;
  text-align: center;
  line-height: 50px;
}

#registrar:hover{
  background: black;
  color: white;
}

</style>


    <title>PAGINA DE ENTRADA A LA APLICACION</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="css/main.css">
  <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <!--<script src="js\index2.js"></script>-->
   
</head>

<body>
    <div id="mensajes">
        <div class="closebut" id="cerrar">X</div>
        <!--añadimos otro div dentro donde vamos a sacar la respuesta y no me  -->
        <div class="response">RESPONSE</div>
        
    </div>



    <hr>





    <div id="cont_newUserForm">
        <form id="newUserForm" method="POST" action="comprobar3.php">
            <h1>TUS DATOS</h1>
            <input type="text" id="usuario" name="user" max-legth="20" placeholder="Elija un Usuario">
            <input type="password" id="password" name="pass" max-legth="20" placeholder="Elija un Password">
            <input type="text" id="nombre_usuario" name="nombre_usuario" max-legth="20" placeholder="Nombre"> 
            <input type="text" id="apellidos_usuario" name="apellidos_usuario" max-legth="20" placeholder="Apellidos">
            <input type="text" id="direccion" name="direccion" max-legth="20" placeholder="Dirección actual">
            <input type="email" id="email" name="email" max-legth="20" placeholder="Email">
            <input type="text" id="telefono" name="telefono" max-legth="20" placeholder="Teléfono">
<!--<input type="button"  max-legth="20" placeholder="prueba">-->
            
            <div id="registrar" class="registrar" value="registrar">Registrarse</div>
        </form>
    </div>

<br>
<div id="errores" width="100px" height="100px"></div>

<script type="text/javascript">
                                      

    function leeFormulario(){

      if ($.trim($("#usuario").val()) == "" || $.trim($("#password").val()) == "" || $.trim($("#nombre_usuario").val()) == "" || $.trim($("#apellidos_usuario").val()) == "" || $.trim($("#direccion").val()) == "" || $.trim($("#email").val()) == "" || $.trim($("#telefono").val()) == "") {
        alert('LOS CAMPOS NO PUEDEN ESTAR VACIOS!!!!!!!!');
        return false;
      }else{
          return{
                user: $('#usuario').val(),
                pass: $('#password').val(),
                nombre: $('#nombre_usuario').val(),
                apellidos: $('#apellidos_usuario').val(),
                direccion: $('#direccion').val(),
                email: $('#email').val(),
                telefono: $('#telefono').val(),
                act : 'COMPROBAR_FIRST'
                };

      };

        
    }



    function comprobarUsuario(){
        var theData=leeFormulario();

        console.log(theData);

  
        //theData sera null si falla en el if y tambien fallaria aqui(return false en leeCampos)
        if(theData){


            //AJAX

                 var request = $.ajax({
                        url: "comprobar2.php",
                        method: "POST",
                        data: theData,
                        dataType: "html"
                });
 
      request.done(function(msg) {
        console.log(msg);
        
        //alert(msg);
        //alert("done1");

            if (msg==0) {
              alert("si");
              console.log("en breves momentos se creará un usuario nuevo");

                
            };
            if (msg==1) {
              alert("no");
                console.log("ya existe un usuario con ese nombre en la BD, elija otro");
                return;
            };

       
      });

 
      request.fail(function( jqXHR, textStatus ) {
        //$('#errores').html(textStatus);
        console.log("fail1");
        //alert(textStatus);
      });

    }
}




//ponemos onclick

$('#registrar').on('click', function() {
  comprobarUsuario();

      /*setTimeout(function(){
                $('#newUserForm').submit(); //invocamos el comportamiento por defecto de los formularios
                },2000);  */                //que es enviar por POST en este caso a comprobar3.php

});





</script>

    
    <!--<script src="js\index2.js"></script>-->
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    
</body>

</html>



<form  id="miFormReg" action="" method="POST">
    
    <input type="text" name="hola" id="i1">
    <div id="sendCheckName"></div>
    
    
    
    
  </form>
