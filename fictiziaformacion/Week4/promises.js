var geocode = function( address ) {
    var dfd = new $.Deferred();
    GMaps.geocode({
        address: address,
        callback: function( response, status ) {
            return dfd.resolve( response );
        }
    });
    return dfd.promise();
};
 
var getRoute = function( fromLatLng, toLatLng ) {
    var dfd = new $.Deferred();
    map.getRoutes({
        origin: [ fromLatLng.lat(), fromLatLng.lng() ],
        destination: [ toLatLng.lat(), toLatLng.lng() ],
        travelMode: "driving",
        unitSystem: "imperial",
        callback: function( e ) {
            return dfd.resolve( e );
        }
    });
    return dfd.promise();
};
 
var doSomethingCoolWithDirections = function( route ) {
    // do something with route
};
 
$.when( geocode( fromAddress ), geocode( toAddress ) ).
    then(function( fromLatLng, toLatLng ) {
        getRoute( fromLatLng, toLatLng ).then( doSomethingCoolWithDirections );
    }, function () {
        // avisar de que ha ido mal
        // ...
    });