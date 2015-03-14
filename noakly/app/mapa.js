  var geocoder;
  var map;
  var markers = [];

  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(40.4378271, -3.6795366);
    var mapOptions = {
      center: latlng,
      zoom: 11
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        //map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title: address
        });
	//save the current markers into a global var
	markers.push(marker);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  
  
  function getShops() {
    //alert("Retrieving data..");
    //clear old markers
    for (var i = 0; i < markers.length; i++ ) {
    	markers[i].setMap(null);
    }

    var ref = new Firebase("https://shop-s.firebaseio.com/Shop");
    var cost = $('input[type=radio]:checked').val();
    //alert("Selected cost: " + cost);
    ref.orderByChild("cost").equalTo(cost).on("child_added", function(snapshot) {
        //alert(snapshot.val().name);
        codeAddress(snapshot.val().address);
    });

  }
  
