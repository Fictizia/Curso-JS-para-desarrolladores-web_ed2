window.onload = function(){
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
 
    var map = new google.maps.Map(document.getElementById('map'), options);
 
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