<!doctype html>
<html>      
  <head>
    <meta charset="utf-8">

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
    <title>Geolocation</title>
</head>
    <script type="text/javascript" src="js/map.js"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&amp;language=es"></script>
    
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

/*function mapThisGoogle(latitude,longitude){
  var mapCenter=new GLatLng(latitude,longitude);
  map=new GMap2(document.getElementById("map"));
  map.setCenter(mapCenter,15);
  map.addOverlay(new GMarker(mapCenter));
}*/
    </script>
  
  <body onload="init();">
<div id="html5">
<h1>Your current location is:</h1>
<H1>HTML5</H1>
<p id="myLocation"></p>
</div>
<br>
<br>

<H1>GOOGLEMAPS</H1> 
<div id="map"></div>


</body>

</html>

var sevilla = new google.maps.LatLng(37.38264, -5.996295);  
var opciones = {  
  zoom: 7,
  center: sevilla,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var div = document.getElementById('mapa');  
var map = new google.maps.Map(div, opciones); // Creamos un marcador y lo posicionamos en el mapa  
var marcador = new google.maps.Marker({  
  position: new google.maps.LatLng(34.404, 6.008),
  map: map
});