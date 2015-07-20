<?php
require_once("conexion/conn.php");
?>

<html>
 <head>
 <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
 <title>Google Map API V3 with markers</title>
 <style type="text/css">
 body { font: normal 10pt Helvetica, Arial; }
 #map { width: 350px; height: 300px; border: 0px; padding: 0px; }
 </style>
 <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js"></script>
 <!--<script src="http://maps.google.com/maps/api/js?v=3&sensor=false" type="text/javascript"></script>-->
 <script type="text/javascript">
 //Sample code written by August Li
 var icon = new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/micons/blue.png",
 			new google.maps.Size(32, 32),
 			new google.maps.Point(0, 0),
 			new google.maps.Point(16, 32));
 var center = null;
 var map = null;
 var currentPopup;
 var bounds = new google.maps.LatLngBounds();

 function addMarker(lat, lng, info) {
 	var pt = new google.maps.LatLng(lat, lng);
 	bounds.extend(pt);
 	var marker = new google.maps.Marker({
 	position: pt,
 	icon: icon,
 	map: map
 	});
 	var popup = new google.maps.InfoWindow({
 	content: info,
 	maxWidth: 300
 	});
 	google.maps.event.addListener(marker, "click", function() {
 		if (currentPopup != null) {
 		currentPopup.close();
 		currentPopup = null;
 		}
 		popup.open(map, marker);
 		currentPopup = popup;
 		});
 	google.maps.event.addListener(popup, "closeclick", function() {
 		map.panTo(center);
 		currentPopup = null;
 		});
 }

 function initMap() {
 		map = new google.maps.Map(document.getElementById("map"), {
 		center: new google.maps.LatLng(0, 0),
 		zoom: 14,
 		mapTypeId: google.maps.MapTypeId.ROADMAP,
 		mapTypeControl: false,
 		mapTypeControlOptions: {
 			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
 		},
 		navigationControl: true,
 		navigationControlOptions: {
 			style: google.maps.NavigationControlStyle.SMALL
 		}

 		});

initMap();

 <?php


 $query = mysqli_query("SELECT * FROM pruebaleercsv");
 while ($row = mysqli_fetch_array($query)){
 	//$nombre=$row['nombre'];
 	$latitud=$row['latitud'];
 	$longitud=$row['longitud'];
 	$distrito=$row['distrito'];
 	echo "addMarker($latitud,$longitud,$distrito);";
 }


 ?>

 center = bounds.getCenter();
 map.fitBounds(bounds);
 
 }
 </script>
 </head>
 <!--<body onload="initMap()" style="margin:0px; border:0px; padding:0px;">-->
 <body>
 	<div id="map"></div>
 	
 </body>	
 
<!--https://developers.google.com/maps/articles/phpsqlajax_v3?csw=1      !!!!!!!!!!!!!!!!!!!!!!!!!!!-->
 </html>
