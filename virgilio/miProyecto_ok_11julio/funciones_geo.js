

    function initialize(lat,lng) {
      /*var listadoPuntoswww = [ //del ejemplo original
        ['León', 42.603, -5.577],
        ['Salamanca', 40.963, -5.669],
        ['Zamora', 41.503, -5.744]
      ];*/
      var map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 15,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var infowindow = new google.maps.InfoWindow();
      var marker, i;
      



      var marker2;
      
      //var lat=40.4587618;
      //var lng=-3.5841515999999998;
        marker2 = new google.maps.Marker({
          position: new google.maps.LatLng([lat],[lng]),
          map: map,
          icon: 'yellow_MarkerL.png'
        });
        google.maps.event.addListener(marker2, 'click', (function(marker2) {
          return function() {
            infowindow.setContent('este soy yo');
            
            infowindow.open(map, marker2);
          }
        })(marker2));





      for (i = 0; i < listadoPuntos.length; i++) {  
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(listadoPuntos[i]['latitud'], listadoPuntos[i]['longitud']),
                map: map,
                //icon: 'yellow_MarkerL.png'
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

  








//geolocalizacion con html5


function init2() {
        
          if (navigator.geolocation) {
            //document.getElementById("myLocation").innerHTML = "Ready to retrieve location details.";
            var geo = navigator.geolocation;
            geo.getCurrentPosition(showLocation, showError);
          }
          else {
            //document.getElementById("myLocation").innerHTML = "Geolocation not supported in this browser.";
}

        }      

function showLocation(position) {
          var lng = position.coords.longitude;
          //alert(lng); funciona poniendolo por debajo de la api de google
          var lat = position.coords.latitude;
          //document.getElementById("myLocation").innerHTML = "Lat: " + lat + ", Long: " + lng;
          document.getElementById("lat1").innerHTML = lat;
          document.getElementById("long1").innerHTML = lng;
            //cargamos desde aqui los markers, y le pasamos a la funcion los valores
            //lat-lng para crear un "marker2"
            google.maps.event.addDomListener(window, 'load', initialize(lat,lng));
          
}
        
function showError(error) { 
           document.write('ERROR(' + error.code + '): ' + error.message);
          alert("There has been an error");
}