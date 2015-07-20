<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 

//session_start(); ya no hace falta porque la sesion esta iniciada
require_once('check_session.php'); 
//sin pageTitle NO FUNCIONA!!!!!!!!!!!
$pageTitle='Area de trabajo'; 
require_once('head.php');
require_once('menu_zona_trabajo.php');  
include 'funciones.php';      
?>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script type="text/javascript" src="js/map.js"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&amp;language=es"></script>




<script type="text/javascript">
	
	//variables que contienen las URL de los ficheros a cargar
	var url_1="http://datos.madrid.es/egob/catalogo/201747-0-bibliobuses-bibliotecas.csv";
	var url_2="http://datos.madrid.es/egob/catalogo/212763-0-biblioteca-universitaria.csv";
	var url_3="http://datos.madrid.es/egob/catalogo/206974-0-agenda-eventos-culturales-100.csv";
	var url_4="http://datos.madrid.es/egob/catalogo/206717-0-agenda-eventos-bibliotecas.csv";
	var url_5="http://datos.madrid.es/egob/catalogo/207619-0-farmacias-madrid.csv";
	var url_6="http://datos.madrid.es/egob/catalogo/202105-0-mercadillos.csv";
	var url_7="http://datos.madrid.es/egob/catalogo/200967-0-mercados.csv";
	var url_8="http://datos.madrid.es/egob/catalogo/201105-0-turismo.csv";
	var url_9="http://datos.madrid.es/egob/catalogo/200284-0-puntos-limpios.csv";
	
</script>

<style type="text/css">

#map{
  width: 500px;
  height: 500px;
  border: solid;
}
#html5{
  width: 40%;
  border: solid;
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
                    </tr>
                  </thead>
                
                  <tbody id="tableBody">

                  </tbody>
            </table>

        </div>        
    </div>
</div>








<script type="text/javascript">


//funcion a sustituir por "pintaTabla"
function pintaUsers(){

  var request = $.ajax({
        url: "userActions.php",
        method: "POST",
        data: { 
          act:"GETALL" 
        },
        dataType: "json" //porque es un dato de la BD con cierta estructura
      });
 
      request.done(function( msg ) {
          
          var losUsuarios=msg; //la matriz devuelta con toda la info de mi query
  
          var miTableBody=''; //string vacio que rellenaremos con la info de la matriz
  

  //recorremos el array que me ha devuelto mi consulta
              for(var i=0;i<losUsuarios.length;i++){
                
                //los botones de editar/borrar van a tener un numero "i" añadido a su id para que el click
                //de cada boton haga referencia a ese usuario concreto
                //en el "onclick" de los botones hacemos la llamada a las funciones editaUser/borraUser, y les
                //pasamos el id del usuario
                var editarBTN='<button class="btn btn-warning" onclick="editaUser(\''+losUsuarios[i].id+'\')" id="edita_'+losUsuarios[i].id+'">EDITAR</button>';
                var borrarBTN='<button class="btn btn-danger" onclick="borraUser(\''+losUsuarios[i].id+'\')" id="borra_'+losUsuarios[i].id+'">BORRAR</button>';

                    miTableBody+='<tr>';
                 
                    miTableBody+='<td>'+(i+1)+'</td>';
                    miTableBody+='<td>'+losUsuarios[i].id+'</td>';
                    miTableBody+='<td id="user_'+losUsuarios[i].id+'">'+losUsuarios[i].usuario+'</td>';
                    miTableBody+='<td id="pass_'+losUsuarios[i].id+'">'+losUsuarios[i].password+'</td>';
                    miTableBody+='<td>'+cleanFecha(losUsuarios[i].creado)+'</td>';
                    miTableBody+='<td>'+editarBTN +' ' + borrarBTN+'</td>';
                  

                    miTableBody+='</tr>';
              }
              
              $('#tableBody').html(miTableBody);


       
      });
 
      request.fail(function( jqXHR, textStatus ) {
          alert(textStatus);
        //alert( "Request failed : " + textStatus );
      });

}
//llamamos a la funcion aqui para que cargue la tabla
//esto me pinta la tabla al entrar a la pagina
//pintaUsers();




//funcion a sustituir por "pintaTabla"
function pintaTabla(){

  var request = $.ajax({
        url: "userActions.php",
        method: "POST",
        data: { 
          act:"GETALL3" 
        },
        dataType: "html" //porque es un dato de la BD con cierta estructura
      });
 
      request.done(function( msg ) {
        alert("aqui1");
        $( "#resultados" ).html(msg);
        //alert(msg);
      // return;
          
          var losDatos=msg; //la matriz devuelta con toda la info de mi query
  
          var miTableBody=''; //string vacio que rellenaremos con la info de la matriz
  
          
  //recorremos el array que me ha devuelto mi consulta
              for(var i=0;i<losDatos.length;i++){
                
                //los botones de editar/borrar van a tener un numero "i" añadido a su id para que el click
                //de cada boton haga referencia a ese usuario concreto
                //en el "onclick" de los botones hacemos la llamada a las funciones editaUser/borraUser, y les
                //pasamos el id del usuario

                var editarBTN='<button class="btn btn-warning" onclick="editaRegistro(\''+losDatos[i].id+'\')" id="edita_'+losDatos[i].id+'">EDITAR</button>';
                var borrarBTN='<button class="btn btn-danger" onclick="borraUser(\''+losDatos[i].id+'\')" id="borra_'+losDatos[i].id+'">BORRAR</button>';

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
        alert("aqui2");
          $( "#resultados" ).html( textStatus );
          //alert(textStatus);
        //alert( "Request failed : " + textStatus );
      });

}
//llamamos a la funcion aqui para que cargue la tabla
//esto me pinta la tabla al entrar a la pagina
pintaTabla();

//funcion para tablas del proyecto!!!!!!!!!!!!!!!!!!!!!!
function editaRegistro(registroId){
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

  //addUser(uDistrito,uNombre);
}


function cleanFecha(lafecha){
  if(lafecha){
      var fechaen2=lafecha.split(' ');//[fecha,hora]
      var fechaEnPartes=fechaen2[0].split('-');//[a,m,d]
      var fechabien=fechaEnPartes.reverse();//[d,m,a
      var fFinal=fechabien.join('-');
      
      return fFinal +'  ' + fechaen2[1]; 
  }
}


function borraUser(userId){
  //alert('BORRANDO ID:' + userId);
      var request = $.ajax({
        url: "userActions.php",
        method: "POST",
        data: { 
          userId : userId,
          act:"DELETE" 
        },
        dataType: "html"
      });
 
      request.done(function( msg ) {
        //escribo el echo que me ha devuelto en #resultados
        $( "#resultados" ).html( msg );
        pintaUsers(); //refrescamos la base de datos por pantalla
      });
 
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
}

function editaUser(userId){
  //alert('EDITANDO ID:' + userId);
      
      //leemos de la tabla los valores del nombre/password y los guardamos
      var elPass=$('#pass_'+userId).html();
      var elUser=$('#user_'+userId).html();

      //cambiamos el aspecto del boton del formulario,porque ahora estamos editando,no creando
      $('#formBtn').html('actualizar usuario'); //cambiamos el texto al boton
      $('#formBtn').removeClass('btn-success'); //color verde,eliminamos
      $('#formBtn').addClass('btn-warning'); //color naranja,añadimos
      //los fijamos en el formulario de nuevo
      //ponemos el valor leido de la tabla en los dos input
      $('#userPass').val(elPass);
      $('#userName').val(elUser);
      //quitamos el event listener del boton #formBtn, no queremos que tenga activo de momento
      //el evento que tiene asociado por defecto
      $('#formBtn').off('click');  

      //cuando hagamos click en el boton, ahora no va a "crear usuario",sino que va a ejecutar la funcion
      //updateUser, en la que vamos a tener la llamada ajax
      $('#formBtn').on('click',function(){
        updateUser(userId);
      });

      //alert(elUser+'-------->'+elPass);
}

function updateUser(uId){
  //alert('actualizando EL USER ' + $('#userName').val() + 'con password ' + $('#userPass').val() + ' e ID: ' + uId);
  
  var request = $.ajax({
        url: "userActions.php",
        method: "POST",
        data: { 
          uId : uId,
          uName : $('#userName').val(),
          uPass : $('#userPass').val(),
          act:"UPDATE" 
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
         $('#userName').val('');
         $('#userPass').val('');
         //el boton verde y texto antiguo
         $('#formBtn').html('registrar usuario');
        $('#formBtn').removeClass('btn-warning'); //color verde
        $('#formBtn').addClass('btn-success'); //color naranja
         //pintamos los users
         //END
         pintaUsers();
      });

 
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });


}

 
function readForm(){

  if ($('#userName').val()) {
      var uName=$('#userName').val();

  }else{
    $('#resultados').html('el user esta vacio');
    return;
  }


  if ($('#userPass').val()) {
    var uPass=$('#userPass').val();


  }else{
    $('#resultados').html('el password esta vacio');
    return;
  }

  addUser(uName,uPass);
}

function addUser(u,p){

  //alert(u+'--->'+p);

  var request = $.ajax({
        url: "userActions.php",
        method: "POST",
        data: { 
          uName : u,
          uPass:p ,
          act:"INSERT"
        },
        dataType: "html"
      });
 
      request.done(function( msg ) {
        //pintamos el msg resultado
        $( "#resultados" ).html( msg );
        //limpiamos los imputs
        $('#userName').val('');
        $('#userPass').val('');
        //repintamos los users
        pintaUsers(); //refrescamos la base de datos por pantalla
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
  


</script>




<script type="text/javascript">
        
        function init() {
        
          if (navigator.geolocation) {
            document.getElementById("myLocation").innerHTML = "Ready to retrieve location details.";
            var geo = navigator.geolocation;
            geo.getCurrentPosition(showLocation, showError);
          }
          else {
            document.getElementById("myLocation").innerHTML = "Geolocation not supported in this browser.";
          }

        }      

        function showLocation(position) {
          var lng = position.coords.longitude;
          var lat = position.coords.latitude;
          document.getElementById("myLocation").innerHTML = "Lat: " + lat + ", Long: " + lng;
        }
        
        function showError(error) { 
           document.write('ERROR(' + error.code + '): ' + error.message);
          alert("There has been an error");
        }


//watchposition
var watchId;  
 
if (navigator.geolocation) {
  watchId = navigator.geolocation.watchPosition(mostrarPosicion, mostrarErrores, opciones); 
} else {
  alert("Tu navegador no soporta la geolocalización, actualiza tu navegador.");
}
 



var mapa = null;
var mapaMarcador = null;


 
 
function mostrarPosicion(posicion) {
  var latitud = posicion.coords.latitude;
  var longitud = posicion.coords.longitude;
  var precision = posicion.coords.accuracy;
 
  var miPosicion = new google.maps.LatLng(latitud, longitud);
 
  // Se comprueba si el mapa se ha cargado ya 
  if (mapa == null) {
    // Crea el mapa y lo pone en el elemento del DOM con ID mapa
    var configuracion = {center: miPosicion, zoom: 16, mapTypeId: google.maps.MapTypeId.HYBRID};
    mapa = new google.maps.Map(document.getElementById("map"), configuracion);
 
    // Crea el marcador en la posicion actual
    mapaMarcador = new google.maps.Marker({position: miPosicion, title:"Esta es tu posición"});
    mapaMarcador.setMap(mapa);
  } else {
    // Centra el mapa en la posicion actual
    mapa.panTo(miPosicion);
    // Pone el marcador para indicar la posicion
    mapaMarcador.setPosition(miPosicion);
  }


  /*var latitud = posicion.coords.latitude;
  var longitud = posicion.coords.longitude;
  var precision = posicion.coords.accuracy;
  var fecha = new Date(posicion.timestamp);
  $('#posicion').empty();
  $('#posicion').append("<p>Latitud: " + latitud + "</p>");
  $('#posicion').append("<p>Longitud:" + longitud + "</p>");
  $('#posicion').append("<p>Precisión: " + precision + " metros </p>"); 
  $('#posicion').append("<p>Fecha: " + fecha + "</p>");  */
}
 
function mostrarErrores(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
        alert('Permiso denegado por el usuario'); 
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Posición no disponible');
        break; 
      case error.TIMEOUT:
          alert('Tiempo de espera agotado');
          break;
        default:
          alert('Error de Geolocalización desconocido :' + error.code);
  }
}
 
var opciones = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 1000
};
 
function detener() {
  navigator.geolocation.clearWatch(watchId);
}

//mostrar en googlemaps

</script>

<div id="html5">
<h1>Your current location is:</h1>
<H1>HTML5</H1>
<p id="myLocation"></p>
</div>
<br>
<br>

<H1>GOOGLEMAPS</H1> 
<div id="map"></div>
<hr>
<div id="mapa"></div>

<div id="posicion"></div>



<script type="text/javascript">
/*	
var div = document.getElementById('map');  
var map = new google.maps.Map(div, opciones); // Creamos un marcador y lo posicionamos en el mapa  
var marcador = new google.maps.Marker({  
  	position: new google.maps.LatLng(34.404, 6.008),
  	map: map
});
no añade nuevo marcador, me quita el anterior activo del currentposition*/
</script>



  
<!--<script type="text/javascript">

function nuevaPosicion(posicion) {
  var latitud = 40.426687899755734;
  var longitud = -3.6996173701222492;
 
 
  var miPosicion2 = new google.maps.LatLng(latitud, longitud);
 
  // Se comprueba si el mapa se ha cargado ya 
  if (mapa == null) {
    // Crea el mapa y lo pone en el elemento del DOM con ID mapa
    var configuracion = {center: miPosicion2, zoom: 16, mapTypeId: google.maps.MapTypeId.HYBRID};
    mapa = new google.maps.Map(document.getElementById("mapa"), configuracion);
 
    // Crea el marcador en la posicion actual
    mapaMarcador = new google.maps.Marker({position: miPosicion2, title:"Esta es tu posición"});
    mapaMarcador.setMap(mapa);
  } else {
    // Centra el mapa en la posicion actual
    mapa.panTo(miPosicion2);
    // Pone el marcador para indicar la posicion
    mapaMarcador.setPosition(miPosicion2);
  }
nuevaPosicion();
</script>    comentando esto me quita error-->







<?php
require_once ('footer.php');
?>



