/* global Firebase, Backbone, $, _ */
// EMT APP

$(function document_onReady () {
    var TransportApp = window.TransportApp = {};
    
    TransportApp.cache = {};
    TransportApp.ref = new Firebase('https://js-web-developers.firebaseio.com');
    TransportApp.bIsNewUser = true;
    
    $('#login-button').on('click', function loginButton_onClick (event) {
        TransportApp.ref.authWithOAuthPopup('facebook', function ref_authWithOAuthPopup(err, authData) {
            if (err) {
                // see: https://www.firebase.com/docs/web/guide/user-auth.html#section-handling-errors
                throwStack(err.message);
                return;
            }
            TransportApp.authData = authData;
            console.log('login ok');
        });
    });
    
    $('#logout-button').on('click', function logoutButton_onClick (event) {
        TransportApp.ref.unauth();
        TransportApp.authData = null;
    });
    
    TransportApp.ref.onAuth(function ref_onAuth (authData) {
      if (authData) {
        // user authenticated with Firebase
        console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
        
        // store user data
        if (TransportApp.bIsNewUser) {
            TransportApp.ref.child('authUsers').child(authData.uid).set(authData);
        }
        
        $('#login-button').hide();
        $('#logout-button').show();
      } else {
        // user is logged out
        console.log('user is logged out');
        
        $('#login-button').show();
        $('#logout-button').hide();
      }
    });
    
    TransportApp.getVehicleLocations = function app_getVehicleLocation () {
        /*var cURL_routes = '/lines.json' + '?' + Date.now();
        
        $.ajax({
            dataType: 'json',
            url: cURL_routes,
            success: function ajax_getVehicleLocation_success (poData) {
                TransportApp.cache.routes = poData;
                TransportApp.saveRoutes();
            }
        });*/
        var transitRef = new Firebase('https://publicdata-transit.firebaseio.com/'),
        lineIndex = transitRef.child('sf-muni/vehicles').limit(200);
   
        /*lineIndex.on('child_changed', function lineIndex_onChildChanged (snapshot) {
            console.log('child_changed', snapshot.val());
        });*/
        
        lineIndex.on('child_added', function lineIndex_onChildAdded (snapshot) {
            console.log('child_added', snapshot.val());
        });
        
        lineIndex.on('child_removed', function lineIndex_onChildRemoved (snapshot) {
            console.log('child_removed', snapshot.val());
        });
        
        lineIndex.once('value', function lineIndex_onValue (snapshot) {
            console.log('value', snapshot.val());
        });
    };
    
    /*TransportApp.saveRoutes = function app_saveRoutes () {
        TransportApp.ref.child('routes-db').set(TransportApp.cache.routes, function saveRoutes_onError (error) {
            if (error) {
                throwStack("Data could not be saved." + error);
            } else {
                console.info("Data saved successfully.");
            }
        });
    };*/
    
    $('#load-data-button').on('click', function loadDataButton_onClick (event) {
        TransportApp.getVehicleLocations();
    });
});

function throwStack (pcErrorMessage){
    var oError = new Error(pcErrorMessage);
    
    return oError.stack;
}