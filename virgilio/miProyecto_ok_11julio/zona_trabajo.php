<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 
require_once("conexion/conn.php");
//session_start(); ya no hace falta porque la sesion esta iniciada
require_once('check_session.php'); 
//sin pageTitle NO FUNCIONA!!!!!!!!!!!
$pageTitle='Area de trabajo'; 

require_once('head.php');
require_once('menu_zona_trabajo.php');  
include 'funciones.php'; 
   
?>

<style type="text/css">
  #mapa {

/*z-index: 100;*/
border: solid;
width: 700px;
height: 700px;
position: relative;
background: linear-gradient( 90deg, #008080, #ffebcd);

  }
#myLocation{

border: solid;
width: 100%;
height: 50px;
margin-bottom: 30px;
 background: linear-gradient( 90deg, #008080, #ffebcd);
}
#wrapper_i{

position: relative;

}
#icono1{
position: absolute;
top: 50%;
left:50%;
}

span{
  padding: auto;
  color: white;
  font-size: medium;
}

#html5{
  text-align: center;
  background-color: blue;
  width: 90%;
  margin: auto;
  margin-bottom: 30px;
  background: linear-gradient( 90deg, #008080, #ffebcd);
}

#magia{
  background-color: #3f3f3f;
  padding: 20px 10px 20px 10px;
}

.icono_oculto{
height: 0px;
overflow: hidden;
padding: 0; /*para mo empujar hacia abajo*/
border: 0;
}

.icono_oculto2{
height: 0px;
overflow: hidden;
padding: 0; /*para mo empujar hacia abajo*/
border: 0;
}

                
</style>

<div class="container">
    <div class="row">
        <div class="col-md-9">
              <h3>Edición de campos de la tabla</h3>
              <input type="text" placeholder="Distrito" id="distrito">
              <input type="text" placeholder="Nombre" id="nombre">
              <div class="btn btn-success ooo" id="formBtn">Edición</div>
        </div>
        <div class="col-md-3">
            <div class="limpiarBtn" id="limpiarBtn">X</div>
            <div id="resultados"></div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-bordered table-hover">

                  <thead>
                    <tr>
                      <th id="reload">#</th>
                      <th>ID</th>
                      <th>Distrito</th>
                      <th>Nombre</th> 
                      <th>Latitud</th>
                      <th>Longitud</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                
                  <tbody id="tableBody">

                  </tbody>
            </table>

        </div>        
    </div>
</div>
<div class="container">
<hr>
<h1 id="html5"><em>Todavía no sabes donde estás? Soluciónalo dando al botón...</em></h1>

<div class="row">
        <div class="col-md-8">
          <div  id="mapa">
            <div id="wrapper_i"></div>
              <i id="icono1" class="fa fa-spinner fa-spin fa-5x"></i>
              
          </div>
        </div>
        <div class="col-md-4">
          <!--<div  id="myLocation"><h3>HTML5 - GEOLOCALIZACION</h3></div>-->
          

          <form id = "magia" method="POST" action="" class="form-vertical">
<div class="form-group">
            <input id="show" type="button" value="DAME MI POSICION" class="btn btn-info">
   </div>         
<div class="form-group">
          <span>Latitud</span><div id="lat1" class="form-control"  name="lat1" readonly="readonly"></div> 
          <br>
          <span>Longitud</span><div id="long1" class="form-control"  name="long1" readonly="readonly"></div> 
        </div>
      </form>
<hr>
        </div>
<div id="muestra_icono" class="icono_oculto"><h2>Posición actual</h2>
  <br>
<img src="yellow_MarkerL.png" width="5%" height="4%" />
</div>

<hr>

<div id="muestra_icono2" class="icono_oculto2"><h2>Puntos más cercanos</h2>
  <br>
<img src="map-pin-red-th.png" width="5%" height="4%" />
</div>
    </div>
</div>
<br>
<div class="container"> 
        <div class="row"> 
            <div class="col-md-8">
                <div class="form-group">
                    <label for="Añadir comentarios" class="control-label"><h3>Información interesante</h3></label>
                    <textarea id="Añadir comentarios" onkeyup="updateCampo('Añadir comentarios')" elcampo="bio" class="form-control" name="bio"></textarea>
                </div>
                        
            </div>
       </div>
    </div>

<i class="fa fa-circle-o-notch fa-spin fa-5x"></i>
              <i class="fa fa-refresh fa-spin fa-5x"></i>
              <i class="fa fa-cog fa-spin fa-5x"></i>
              <i class="fa fa-spinner fa-pulse fa-5x"></i>
<!-- ------------------------------------------------------------------- -->

     
            
    












<?php
//carga los datos en la tabla
/*function curl_cargar($nombre){

    if ($nombre=='bibliotecas') {
      $url = "http://datos.madrid.es/portal/site/egob/menuitem.ac61933d6ee3c31cae77ae7784f1a5a0/?vgnextoid=00149033f2201410VgnVCM100000171f5a0aRCRD&format=csv&file=0&filename=200304-0-centros-culturales&charset=ISO-8859-1&mgmtid=fc8a034270603410VgnVCM1000000b205a0aRCRD";
    }
        
        // create curl resource 
        $ch = curl_init(); 

        // set url 
        curl_setopt($ch, CURLOPT_URL, $url); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch); 

        // close curl resource to free up system resources 
        curl_close($ch);
        //print_r($output); //me trae todo como un string--FUNCIONA

        
        //$Data = str_getcsv($CsvString, "\n"); usamos este ejemplo de base
        //usaremos str_getcsv porque el CSV me lo he traido como un string

        $datos1= str_getcsv($output,"\n"); //partimos todo el string por cada final de linea y me lo devuelve en un array
        //print_r($datos1); cada una de las posiciones del array contiene todos los campos


        
        $cabecera =  str_getcsv($datos1[0],";" ,'"', "\n"); //la primera fila era la correspondiente a la cabecera
        //print_r($cabecera);
        //echo '<br>';
        //echo count($cabecera). ' elementos';

        
        //echo '<br><br>';
        //$result[];


function inserDatosCsv($dbObject,$distrito_,$nombre_,$latitud_,$longitud_){


      $query="INSERT INTO pruebaleercsv (distrito,nombre,latitud,longitud) VALUES (?,?,?,?)";
      $stmt=$dbObject->prepare($query);
                        //$stmt->param('isss',NULL,$uName,$uPass,NULL); asi tambien funciona
      $stmt->bind_param('ssdd',$distrito,$nombre,$latitud,$longitud); 


      $distrito=cleanSQL($distrito_,$dbObject);
      $nombre=cleanSQL($nombre_,$dbObject);    
      $latitud=cleanSQL($latitud_,$dbObject);   
      $longitud=cleanSQL($longitud_,$dbObject);


      $stmt->execute();

      $elIdDeLaFilaInsertada=$stmt->insert_id; //MUY UTIL!!!!!!!!!! tener el ID de la fila insertada

      $stmt->close();     

      return $elIdDeLaFilaInsertada;
}



        for ($i=1; $i < count($datos1)-1; $i++) { 
          //echo 'FILA: '.$i.'<br>';
          $datos2= str_getcsv($datos1[$i],";" ,'"', "\n");  //me devuelve un array por cada una de las "lineas"c anteriores,con todas las celdas separadas por
          if(isset($datos2[1]) && $datos2[1] !== "" && isset($datos2[21]) && $datos2[21] !== "" && isset($datos2[24]) && $datos2[24] !== "" && isset($datos2[25]) && $datos2[25] !== "") {


            inserDatosCsv($mysqli,$datos2[21], utf8_encode($datos2[1]) ,$datos2[24],$datos2[25]);
              
            
          }else{
            echo 'FALTAN DATOS';
          }
          echo '<hr>';

        }

}*/

?>






<script type="text/javascript">

//------------------GOOGLE MAPS / GEOLOCALIZACION------------------------------------

<?php $puntos=getCoordinates($mysqli);?>  //llamamos a la funcion que me devuelve el array donde estan las fotos
var listadoPuntos = <?php echo $puntos; ?>;

//----------------------------------------

//funcion que pinta la tabla "pruebaleercsv"
function pintaTabla(){

  var request = $.ajax({
        url: "userActions.php",
        method: "POST",
        data: { 
          act:"GETALL3" 
        },
        dataType: "json" //porque es un dato de la BD con cierta estructura
      });
 
      request.done(function( msg ) {
        //alert(msg);
       //$( "#resultados" ).html(msg);

        //alert(msg);
         //;
          
          var losDatos=msg; //la matriz devuelta con toda la info de mi query
  
          var miTableBody=''; //string vacio que rellenaremos con la info de la matriz
  
          
  //recorremos el array que me ha devuelto mi consulta
              for(var i=0;i<losDatos.length;i++){

                var editarBTN='<button class="btn btn-warning" onclick="editaCampo(\''+losDatos[i].id+'\')" id="edita_'+losDatos[i].id+'">EDITAR</button>';
                var borrarBTN='<button class="btn btn-danger" onclick="borraCampo(\''+losDatos[i].id+'\')" id="borra_'+losDatos[i].id+'">BORRAR</button>';

                    miTableBody+='<tr>';
                 
                    miTableBody+='<td>'+(i+1)+'</td>';
                    miTableBody+='<td>'+losDatos[i].id+'</td>';
                    miTableBody+='<td id="distrito_'+losDatos[i].id+'">'+losDatos[i].distrito+'</td>';
                    miTableBody+='<td id="nombre_'+losDatos[i].id+'">'+losDatos[i].nombre+'</td>';
                    miTableBody+='<td id="latitud_'+losDatos[i].id+'">'+losDatos[i].latitud+'</td>';
                    miTableBody+='<td id="longitud_'+losDatos[i].id+'">'+losDatos[i].longitud+'</td>';
                    //miTableBody+='<td>'+cleanFecha(losDatos[i].creado)+'</td>';
                    miTableBody+='<td>'+editarBTN +' ' + borrarBTN+'</td>';
                  
                    											
                    miTableBody+='</tr>';
              }
              
              $('#tableBody').html(miTableBody);


       
      });
 
      request.fail(function( jqXHR, textStatus ) {
          $( "#resultados" ).html( textStatus );
          //alert(textStatus);
        //alert( "Request failed : " + textStatus );
      });

}
//llamamos a la funcion aqui para que cargue la tabla
//esto me pinta la tabla al entrar a la pagina


pintaTabla();

//funcion para editar los registros de las tablas del proyecto!!!!!!!!!!!!!!!!!!!!!!
function editaCampo(registroId){
  //alert('EDITANDO ID:' + userId);
      
      //leemos de la tabla los valores del nombre/password y los guardamos
      var elDistrito=$('#distrito_'+registroId).html();
      alert(elDistrito);
      var elNombre=$('#nombre_'+registroId).html();
      alert(elNombre);

      //cambiamos el aspecto del boton del formulario,porque ahora estamos editando,no creando
      $('#formBtn').html('actualizar registro'); //cambiamos el texto al boton
      $('#formBtn').removeClass('btn-success'); //color verde,eliminamos
      $('#formBtn').addClass('btn-warning'); //color naranja,añadimos
      //los fijamos en el formulario de nuevo
      //ponemos el valor leido de la tabla en los dos input
      $('#distrito').val(elDistrito);
      $('#nombre').val(elNombre);
      //quitamos el event listener del boton #formBtn, no queremos que tenga activo de momento
      //el evento que tiene asociado por defecto
      $('#formBtn').off('click');  

      //cuando hagamos click en el boton, ahora no va a "crear usuario",sino que va a ejecutar la funcion
      //updateUser, en la que vamos a tener la llamada ajax
      $('#formBtn').on('click',function(){
        updateCampos(registroId);
      });

      //alert(elUser+'-------->'+elPass);
}



function updateCampos(registroId){
  //alert('actualizando EL distrito ' + $('#distrito').val() + 'con nombre ' + $('#nombre').val() + ' e ID: ' + registroId);
  
  var request = $.ajax({
        url: "userActions.php",
        method: "POST",
        data: { 
          registroId : registroId,
          uDistrito : $('#distrito').val(),
          uNombre : $('#nombre').val(),
          act:"UPDATE3" 
        },
        dataType: "html"
      });
 
      request.done(function( msg ) {
        
        $( "#resultados" ).html( msg );
        //volvemos a hacer que el formulario inserte en vez de update
        $('#formBtn').off('click');
        $('#formBtn').on('click',function(){
          readForm();
        });
        //limpiamos los imputs
         $('#distrito').val('');
         $('#nombre').val('');
         //el boton verde y texto antiguo
         $('#formBtn').html('registrar usuario');
        $('#formBtn').removeClass('btn-warning'); //color verde
        $('#formBtn').addClass('btn-success'); //color naranja
         //pintamos los users
         //END
         pintaTabla();
      });

 
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });


}





function readForm(){

  if ($('#distrito').val()) {
      var uDistrito=$('#distrito').val();

  }else{
    $('#resultados').html('el user esta vacio');
    return;
  }


  if ($('#nombre').val()) {
    var uNombre=$('#nombre').val();


  }else{
    $('#resultados').html('el password esta vacio');
    return;
  }

  
}



function borraCampo(registroId){
  //alert('BORRANDO ID:' + registroId);
      var request = $.ajax({
        url: "userActions.php",
        method: "POST",
        data: { 
          registroId : registroId,
          act:"DELETE3" 
        },
        dataType: "html"
      });
 
      request.done(function( msg ) {
        //escribo el echo que me ha devuelto en #resultados
        $( "#resultados" ).html( msg );
        pintaTabla(); //refrescamos la base de datos por pantalla
      });
 
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
}




 




//al pinchar la 'X' el div resultados se borra
$('#limpiarBtn').on('click',function(){
  $('#resultados').html('');
});

//al dar al # se va a recargar la pagina se vuelven a 'pintar' los usuarios
$('#reload').on('click',function(){
  pintaTabla();
});


$('#formBtn').on('click',function(){
  readForm();
});
 
 $('#show').on('click',function(){
  init2();
      setTimeout(function(){
      $('#muestra_icono').removeClass('icono_oculto');
      },2500);

      setTimeout(function(){
      $('#muestra_icono2').removeClass('icono_oculto2');
      },4500);
      
}); 


</script>


<?php
require_once ('footer.php');
?>



