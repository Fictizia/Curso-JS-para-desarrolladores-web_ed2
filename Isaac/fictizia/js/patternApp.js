function Vehicle(type){
    this.vType = type;
}


function Bus(heading, route, lat, long, timestamp ) {
  //Herencia en ECMA6
  Vehicle.call(this,'Bus');
  
  this.id = new Date().valueOf();
  this.heading = heading;
  this.route = route;
  this.lat = lat;
  this.long = long;
  this.timestamp = new Date(timestamp);
 
}
//Herencia en ECMA5
//Bus.prototype = new Vehicles('Bus');

Bus.prototype = Object.create(Vehicle.prototype);
Bus.prototype.constructor = Bus;

Bus.prototype.moveTo = function (lat,long) {
  this.lat = lat;
  this.long = long;
};


// Usage:
var bus1 = new Bus( 60, 121, 0, 0, 1416300587036);
var bus2 = new Bus( 80, 205, 0, 0, 1416300650258);

function Route(number,busList){
    this.number = number;
    this.busList = busList;
}

Route.prototype.addBus = function(bus){
    this.busList.push(bus);
}

Route.prototype.removeBus = function(bus){
    var busIndex  = this.busList.indexOf(bus);
    this.busList.pop(busIndex);
}

var route1 = new Route(1,[]);

route1.addBus(bus1);
route1.addBus(bus2);




var mySingleton = (function (Firebase) {
 
  // Instance stores a reference to the Singleton
  var instance;
 
  function init() {
      
    var ref = new Firebase('https://fictizia.firebaseio.com/');
    var vauthData = {};
 
    // Singleton
    function logingFacebook(){
        //abrir popup de login un botón para cada api
        ref.authWithOAuthPopup('facebook', function ref_authWithOAuthPopup(err, authData) {
            //lanzar error si no hay conexión
            if (err) {
                throwStack(err.message);
                return;
            }
            
            //Guardar authData de la conexión en un atributo de authData
            vauthData = authData;
            console.log('login ok');
        });    
    };
    
    function loginUserPass(user, pass){
        mySingleton.ref.authWithPassword({
          email    : user,
          password : pass
        }, function(error, authData) {
          if (error === null) {
            // user authenticated with Firebase
            console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
          } else {
            console.log("Error authenticating user:", error);
          }
        });
    };
    
    //Función para lanzar errores
    function throwStack (pcErrorMessage){
        var oError = new Error(pcErrorMessage);
        return oError.stack;
    }
    
 
    return {
        login: function (loginMode, user, pass) {
           (loginMode === "Facebook")?logingFacebook():loginUserPass(user,pass);
        }
     
    };
 
  };
 
  return {
 
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})(Firebase);