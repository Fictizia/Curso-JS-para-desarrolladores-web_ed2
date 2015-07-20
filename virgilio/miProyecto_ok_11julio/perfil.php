<?php
require_once('check_session.php');
//SIN PAGE TITLE ESTO NO ANDA
$pageTitle = 'Mi Perfil';
require_once('head.php');
require_once('menu.php');
include 'funciones.php';

$miPerfil=pintaMiPerfil($mysqli,$_SESSION['userName'],$_SESSION['UserPassword']);
//print_r($miPerfil); funciona
?>
<style type="text/css">
   #fotoP{
    border: solid;
    background-color: green;
    width: 40%;
    margin-left: 0px;
   } 

</style>
<div class="container">
    <div class="row"> 
       <div class="col-md-offset-3 col-md-6">

            <h2>
             zona privada.mi perfil
        

             
            </h2>
            <div>
            Welcome señor <?php echo $_SESSION['userName']; ?>
            </div>
            <a href="salir.php">SALIR</a>

       </div>

    </div>
</div>

<div class="container">
    <div>
       BIENVENIDO
    </div>
    <div>
    Tu usuario es: <?php echo $_SESSION['userName']; ?>
    </div>
    
</div>


<div class="container">
    <div class="row"> 
       <div class="col-md-3">

            <img id="uf" width="100%" src="<?php echo $miPerfil[0]['foto'];?>"/>





            <div id="res"></div>
       </div>

            


            
                        
        <div class="col-md-9">












            <form method="POST" action="" class="form-horizontal">

                <div class="form-group">
                    <label for="campo1" class="control-label col-md-3">Usuario</label>
                    <div class=" col-md-5">
                                                    <!--onchange / onfocus ="updateCampo('campo1')" mismo resultado-->
                                                    <!__elcampo es un campo creado para almacenar el nombre del campo de la tabla a la que hace referencia-->
                       <input type="text" id="campo1" class="form-control" onchange="muestraMensaje('campo1')" name="usuario" value="<?php if (isset($_SESSION['userName'])) {                          
                       echo $_SESSION['userName'];} ?>"> 
                    </div>
                        <div id="campo1_msg" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                            tu nuevo usuario es <script type="text/javascript">$('#campo1').val();</script>
                        </div>
                        <div id="campo1_msg_vacio" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                                el campo esta vacio,introduzca un valor
                        </div>
                </div> 

                <div class="form-group">  
                    <label for="campo2" class="control-label col-md-3">Password</label>
                    <div class=" col-md-5">
                        <input type="text" id="campo2" class="form-control col-md-5" onchange="muestraMensaje('campo2')" name="password" value="<?php if (isset($_SESSION['UserPassword'])) {                          
                       echo $_SESSION['UserPassword'];} ?>">
                    </div>
                        <div id="campo2_msg" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                            tu nuevo password es <script type="text/javascript">$('#campo2').val();</script>
                        </div>
                        <div id="campo2_msg_vacio" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                                el campo esta vacio,introduzca un valor
                        </div>
                </div> 



                <div class="form-group">
                    <label for="campo3" class="control-label col-md-3">nombre</label>
                    <div class=" col-md-5">
                        <input type="text" id="campo3" class="form-control col-md-5" onchange="muestraMensaje('campo3')" name="nombre" value="<?php echo $miPerfil[0]['nombre'];?>"> 
                    </div>

                        <div id="campo3_msg" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                            tu nombre es <script type="text/javascript">$('#campo3').val();</script>
                        </div>
                        <div id="campo3_msg_vacio" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                                el campo esta vacio,introduzca un valor
                        </div>
                </div> 

                <div class="form-group">
                    <label for="campo4" class="control-label col-md-3">apellidos</label>
                    <div class=" col-md-5">
                        <input type="text" id="campo3" class="form-control col-md-5" onchange="muestraMensaje('campo3')" name="apellidos" value="<?php echo $miPerfil[0]['apellidos'];?>"> 
                    </div>

                        <div id="campo4_msg" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                            tus apellidos son <script type="text/javascript">$('#campo3').val();</script>
                        </div>
                        <div id="campo4_msg_vacio" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                                el campo esta vacio,introduzca un valor
                        </div>
                </div> 

                  <div class="form-group">
                    <label for="campo5" class="control-label col-md-3">direccion</label>
                    <div class=" col-md-5">
                        <input type="text" id="campo3" class="form-control col-md-5" onchange="muestraMensaje('campo3')" name="direccion" value="<?php echo $miPerfil[0]['direccion'];?>">
                    </div>

                        <div id="campo5_msg" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                            tu nueva dirección es <script type="text/javascript">$('#campo3').val();</script>
                        </div>
                        <div id="campo5_msg_vacio" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&ti3es;</a>
                                el campo esta vacio,introduzca un valor
                        </div>
                </div> 

                <div class="form-group">
                    <label for="campo6" class="control-label col-md-3">email</label>
                    <div class=" col-md-5">
                        <input type="text" id="campo3" class="form-control col-md-5" onchange="muestraMensaje('campo3')" name="email" value="<?php echo $miPerfil[0]['email'];?>">
                    </div>

                        <div id="campo6_msg" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                            tu nuevo email es <script type="text/javascript">$('#campo3').val();</script>
                        </div>
                        <div id="campo6_msg_vacio" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                                el campo esta vacio,introduzca un valor
                        </div>
                </div> 


                <div class="form-group">
                    <label for="campo7" class="control-label col-md-3">telefono</label>
                    <div class=" col-md-5">
                        <input type="text" id="campo3" class="form-control col-md-5" onchange="muestraMensaje('campo3')" name="telefono" value="<?php echo $miPerfil[0]['telefono'];?>">
                    </div>

                        <div id="campo7_msg" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                            tu nuevo telefono es <script type="text/javascript">$('#campo3').val();</script>
                        </div>
                        <div id="campo7_msg_vacio" class="col-md-4 hidden">
                            <a href="#" class="close" data-dismiss="modal">&times;</a>
                                el campo esta vacio,introduzca un valor
                        </div>
                </div> 
                    <label for="creado" class="control-label col-md-3">fecha de registro</label>
                    <div class=" col-md-5">
                        <input type="text" id="campo8" class="form-control col-md-5" name="creado" readonly="readonly" value="cleanFecha('<?php echo $miPerfil[0]['creado'];?>')">
                    
                    </div>
            </form>
            














       </div>

    </div>
</div>
<br>
<br>
<br>
                    <input type="text" id="fotoP" value="<?php echo $miPerfil[0]['foto']; ?>">

    <div class="container"> 
        <div class="row"> 
            <div class="col-md-12">
                <div class="form-group">
                    <label for="campo9" class="control-label">Cuentanos algo sobre ti</label>
                    <textarea id="campo9" elcampo="bio" class="form-control" name="bio"  value="<?php echo $miPerfil[0]['telefono'];?>"></textarea>
                </div>
                        
            </div>
       </div>
    </div>


<div id="errores">
    
</div>

  <div class="container"> 
        <div class="row"> 
            <div class="col-md-offset-10 col-md-2">
                <button class="btn btn-primary" id="actualizaPerfil" value="ACTUALIZAR" width="">ACTUALIZAR</button>
            </div>
       </div>
    </div>




<script type="text/javascript">


function cleanFecha(lafecha){
  if(lafecha){
      var fechaen2=lafecha.split(' ');//[fecha,hora]
      var fechaEnPartes=fechaen2[0].split('-');//[a,m,d]
      var fechabien=fechaEnPartes.reverse();//[d,m,a
      var fFinal=fechabien.join('-');
      
      return fFinal +'  ' + fechaen2[1]; 
  }
}


//var a=cleanFecha("<?php echo $miPerfil[0]['creado'];?>");
//alert(a);  funciona











    
    function leeCampos(){
console.log($('#campo1').val());
        if ($('#campo1').val() && $('#campo2').val() && $('#campo3').val() && $('#campo4').val() && $('#campo5').val() && $('#campo6').val() && $('#campo7').val() && $('#campo9').val()     ) {
            
            return{
                uId: <?php echo $_SESSION['userId'];?>,
                uName: $('#campo1').val(),
                uPass: $('#campo2').val(),
                uNombre: $('#campo3').val(),
                uApellidos: $('#campo4').val(),
                uDireccion: $('#campo5').val(),
                uEmail: $('#campo6').val(),
                uTelefono: $('#campo7').val(),
                uBio: $('#campo9').val(),

                act : 'UPDATE4'
            };


        }
        alert('NO PUEDEN ESTAR VACIOS NI EL USUARIO NI EL PASSWORD!!!!!!!!');
        return false;
    }









    function updatePerfil(){
        var theData=leeCampos();
        alert(theData);
        //theData sera null si falla en el if y tambien fallaria aqui(return false en leeCampos)
        if(theData){


            //AJAX

                         var request = $.ajax({
                                url: "userActions.php",
                                method: "POST",
                                data: theData,
                                dataType: "html"
                        });
         
              request.done(function( msg ) {
                alert(msg);
                $('#errores').html(msg);
                //alert(msg);
              });

         
              request.fail(function( jqXHR, textStatus ) {
                $('#errores').html(textStatus);
                alert(textStatus);
              });
        }
    
    }



//ponemos onclick

$('#actualizaPerfil').on('click', function() {
    updatePerfil();
});



function muestraMensaje(campoId){
        if ($('#'+campoId).val()!==''){
            $('#'+campoId+'_msg_vacio').addClass("hidden");
            $('#'+campoId+'_msg').removeClass("hidden");


        }

        if ( $('#'+campoId).val()==='') {
            $('#'+campoId+'_msg').addClass("hidden");
            $('#'+campoId+'_msg_vacio').css({'color':'red'});
            $('#'+campoId+'_msg_vacio').removeClass("hidden");

            return false;
        }
}





</script>





<?php
require_once ('footer.php');
?>