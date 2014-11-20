/* global Firebase, Backbone, $, _ */
$(function document_onReady () {
    'use strict'
    //crear objecto TransportApp
    var TransportApp = window.TransportApp = {};
    
    //Establecer conexión con firebase
    TransportApp.ref = new Firebase('https://fictizia.firebaseio.com/');
    //...
    TransportApp.bIsNewUser = true;
    
    //Evento click botón de login
    $('#login-button').on('click', function loginButton_onClick (event) {
        //abrir popup de login un botón para cada api
        TransportApp.ref.authWithOAuthPopup('facebook', function ref_authWithOAuthPopup(err, authData) {
            //lanzar error si no hay conexión
            if (err) {
                throwStack(err.message);
                return;
            }
            
            //Guardar authData de la conexión en un atributo de authData
            TransportApp.authData = authData;
            console.log(TransportApp.authData);
            console.log('login ok');
        });
    });
    
    //Evento click botón de logout
    $('#logout-button').on('click', function logoutButton_onClick (event) {
        //logOut api y reset transporApp.authData
        TransportApp.ref.unauth();
        
        TransportApp.authData = null;
    });
    
    //Evento onAuth (firebase)
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
        $('#foto img').attr('src',authData.facebook.cachedUserProfile.picture.data.url);
      } else {
        // user is logged out
        console.log('user is logged out');
        
        $('#login-button').show();
        $('#logout-button').hide();
        $('#foto img').attr('src','');
      }
    });
    
    TransportApp.getVehicleLocations = function app_getVehicleLocation () {
        
        //Crear conexiíon con el api de firebase
        var transitRef = new Firebase('https://publicdata-transit.firebaseio.com/'),
        lineIndex = transitRef.child('sf-muni/vehicles').limitToLast(200);//obtener los ultimos 200 hijos de sf-muni/vehicles
        
        //abrir shocket child_added
        lineIndex.on('child_added', function lineIndex_onChildAdded (snapshot) {
            console.log('child_added', snapshot.val());
        });
        ç//abrir shocket child_removed
        lineIndex.on('child_removed', function lineIndex_onChildRemoved (snapshot) {
            console.log('child_removed', snapshot.val());
        });
        
        //abrir shocket value la primrea vez
        lineIndex.once('value', function lineIndex_onValue (snapshot) {
            console.log('value', snapshot.val());
        });
    };
    
    //
    $('#load-data-button').on('click', function loadDataButton_onClick (event) {
        TransportApp.getVehicleLocations();
    });
});

//Función para lanzar errores
function throwStack (pcErrorMessage){
    var oError = new Error(pcErrorMessage);
    
    return oError.stack;
}