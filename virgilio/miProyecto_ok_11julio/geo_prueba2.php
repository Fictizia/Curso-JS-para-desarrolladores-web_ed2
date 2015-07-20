<?php
include 'funciones.php'; 
?> 
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <style type="text/css">
    #mapa { height: 500px; }
    </style>
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript">



<?php $puntos=getCoordinates($mysqli);?>  //llamamos a la funcion que me devuelve el array donde estan las fotos
var listadoPuntos = <?php echo $puntos; ?>;


//console.log(listadoPuntos[1]);





    function initialize() {
      /*var listadoPuntoswww = [ //del ejemplo original
        ['León', 42.603, -5.577],
        ['Salamanca', 40.963, -5.669],
        ['Zamora', 41.503, -5.744]
      ];*/
      var map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 7,
        center: new google.maps.LatLng(40.4587618, -3.5841515999999998),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var infowindow = new google.maps.InfoWindow();
      var marker, i;
      for (i = 0; i < listadoPuntos.length; i++) {  
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(listadoPuntos[i]['latitud'], listadoPuntos[i]['longitud']),
          map: map
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(listadoPuntos[i]['distrito']);
            infowindow.setContent('latitud: '+String(listadoPuntos[i]['latitud'])+' '+' longitud: '+String(listadoPuntos[i]['longitud']) );
            //infowindow.setContent(listadoPuntos[i]['longitud']);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
    }

    //google.maps.event.addDomListener(window, 'load', initialize);




<!--geolocalizacion con html5-->


function init2() {
        
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
          //alert(lng); funciona poniendolo por debajo de la api de google
          var lat = position.coords.latitude;
          document.getElementById("myLocation").innerHTML = "Lat: " + lat + ", Long: " + lng;

          initialize_tele(lat,lng);
          
          
}
        
function showError(error) { 
           document.write('ERROR(' + error.code + '): ' + error.message);
          alert("There has been an error");
}



//añade mi posicion sacada de la api de html5, pero borra todo lo anterior
 function initialize2(lat,lng) {
     
      var map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 7,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      
      var infowindow = new google.maps.InfoWindow();
      
      
        marker = new google.maps.Marker({
          position: new google.maps.LatLng([lat],[lng]),
          map: map
        });
        google.maps.event.addListener(marker, 'click', (function(marker) {
          return function() {
            infowindow.setContent('este soy yo');
            
            infowindow.open(map, marker);
          }
        })(marker));
      




    }



function initialize_tele(lat,lng) {
     
var coords=[lat,lng];
var myLatlng = new google.maps.LatLng(lat, lng);
var mapOptions = {
  zoom: 12,
  center: myLatlng,
  mapTypeId: google.maps.mapTypeId.ROADMAP
}

 var map = new google.maps.Map(document.getElementById('mapa'),mapOptions); 

var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'yo'
        });



for (i = 0; i < listadoPuntos.length; i++) {  
        var marker2 = new google.maps.Marker({
          position: new google.maps.LatLng(listadoPuntos[i]['latitud'], listadoPuntos[i]['longitud']),
          map: map
        });

}

google.maps.event.addDomListener(window, 'load', initialize_tele);

}



$('#press').on('click',function(){

        //listadoPuntos[listadoPuntos.length]['latitud']=lat;
        alert("hola");

        //listadoPuntos[listadoPuntos.length]['longitud']=lat;
        //initialize();

});
 
</script>

 









 
  </head>
  <body onload="init2();">
    <div id="mapa" style="width:500px;height:500px;"></div>
    <br>
<hr>
  <br>

   <!--<body onload="init2();">-->

<div id="html5">
    <h1>Your current location is:</h1>
    <H1>HTML5</H1>
    <div id="myLocation">aqui vienen las coordenadas</div>
</div>
<form>
  <input class="btn btn-info"  id="press" type="submit" value="Registrar">
POSICION
</form>
<style type="text/css">
  #press{
    border: solid;
    background-color: red;
    width: 100px;

  }
</style>



         
  </body>
</html>