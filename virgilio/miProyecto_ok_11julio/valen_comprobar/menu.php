<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&amp;language=es"></script>
<aside>
	<div class="menu">
		<ul class="">
			<li><a href="user_zone.php">userZone</a></li>
			<li><a href="perfil.php">perfil</a></li>
			<li><a href="gusuarios.php">gestion de usuarios</a></li>
			<li><a>ya veremos</a></li>
			<li><a href="salir.php">SALIR</a></li>
		</ul>
	</div>
</aside>
<br>
<h1>
<?php if(isset($pageTitle)){ ?>
<?php echo $pageTitle; ?>
</h1>
<hr>
<script type="text/javascript">
        
        function init() {
        
          if (navigator.geolocation) {
          	
            document.getElementById("contenedor_1").innerHTML = "Ready to retrieve location details.";
            var geo = navigator.geolocation;
            geo.getCurrentPosition(showLocation, showError);
          }
          else {
            document.getElementById("contenedor_1").innerHTML = "Geolocation not supported in this browser.";
          }

        }      

        function showLocation(position) {
        	
          var lng = position.coords.longitude;
          var lat = position.coords.latitude;
          document.getElementById("contenedor_1").innerHTML = "Lat: " + lat + ", Long: " + lng;
        }
        
        function showError(error) { 
        	
           document.write('ERROR(' + error.code + '): ' + error.message);
          alert("There has been an error");
        }

</script>

<script type="text/javascript">

function init2(){
    var options = {
        zoom: 8
        , center: new google.maps.LatLng(18.2, -66.4)
        , mapTypeId: google.maps.MapTypeId.SATELLITE
 
        , backgroundColor: '#ffffff'
        , noClear: true
        , disableDefaultUI: true
        , keyboardShortcuts: false
        , disableDoubleClickZoom: true
        , draggable: false
        , scrollwheel: false
        , draggableCursor: 'move'
        , draggingCursor: 'move'
 
        , mapTypeControl: true
        , mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_MENU
            , position: google.maps.ControlPosition.TOP_LEFT
            , mapTypeIds: [
                google.maps.MapTypeId.SATELLITE
            ]
        }
        , navigationControl: true
        , streetViewControl: true
        , navigationControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
            , style: google.maps.NavigationControlStyle.ANDROID
        }
        , scaleControl: true
        , scaleControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
            , style: google.maps.ScaleControlStyle.DEFAULT
        }
    };
 
    var map = new google.maps.Map(document.getElementById('CONTENEDOR_2'), options);
 
    map.setOptions({
        zoom: 10
        , center: new google.maps.LatLng(18.17, -66.42)
        , mapTypeId: google.maps.MapTypeId.TERRAIN
 
        , keyboardShortcuts: true
        , disableDoubleClickZoom: false
        , draggable: true
        , scrollwheel: true
        , draggableCursor: 'hand'
        , draggingCursor: 'hand'
 
        , mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            , position: google.maps.ControlPosition.TOP_RIGHT
            , mapTypeIds: [
                google.maps.MapTypeId.ROADMAP
                , google.maps.MapTypeId.SATELLITE
            ]
        }
 
        , navigationControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
            , style: google.maps.NavigationControlStyle.ZOOM_PAN
        }
 
        , scaleControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
            , style: google.maps.ScaleControlStyle.DEFAULT
        }
    });
 
    map.setZoom(9);
    var zoomLevel = map.getZoom();
 
    map.setCenter(new google.maps.LatLng(40.45, -3.59));
    var centerOfMap = map.getCenter();
 
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    var mapTypeIdOfMap = map.getMapTypeId();
 
    //alert(zoomLevel + ' -- ' + centerOfMap + ' -- ' + mapTypeIdOfMap);
};

</script>


<div id="contiene_menu">
	<div id='cssmenu'>
	<ul>
	   <li class='active'><a href='#' id ="geolocalizacion"><span>OBTENER POSICION ACTUAL</span></a></li>
	   <li><a href='#' id ="googleMaps"><span>GOOGLE-MAPS</span></a></li>
	   <li><a href='#'><span>INFORMACION DISPONIBLE</span></a></li>
	   <li class='last'><a href='#'><span>EDITAR DATOS</span></a></li>
	</ul>
	</div>
</div>
<div id="contenedor_1">CONTENEDOR_1</div>
<div id="contenedor_2">CONTENEDOR_2</div>

<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&amp;language=es"></script>
<script type="text/javascript">
//cargamos la api de html5
	$('#geolocalizacion').on('click',function(){
		init();
	});


$('#googleMaps').on('click',function(){
		init2();

	});



</script>
<?php }?>