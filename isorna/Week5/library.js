/* globals: Firebase */
// Vehicle Constructor
function Vehicle (pHeading, pId, pRouteTag, pVtype) {
    var dNow = new Date();
    
    this.heading = pHeading;
    this.id = pId;
    this.lat = 0;
    this.long = 0;
    this.routeTag = pRouteTag;
    this.secsSinceReport = 0;
    this.speedKmHr = 0;
    this.timestamp = dNow.getTime();
    this.vtype = pVtype;
}
// Vehicle Methods
Vehicle.prototype.moveTo = function (pLat, pLong) {
    this.lat = pLat;
    this.long = pLong;
};
Vehicle.prototype.updateFromDB = function (pHeading, pLat, pLong) {
    var dNow = new Date();
    
    this.secsSinceReport = dNow.getTime() - this.timestamp;
    this.timestamp = dNow.getTime();
    this.moveTo(pLat, pLong);
};

// Route Constructor
function Route (pId) {
    this.id = pId;
    this.vehicles = {};
}
// Route Methods
Route.prototype.updateFromDB = function (pVehicles) {
    var pVehicle = {}, newVehicle = {};
    
    this.vehicles = [];
    
    for (pVehicle in pVehicles) {
        newVehicle = new Vehicle(pVehicle.heading, pVehicle.id, pVehicle.routeTag, pVehicle.vtype);
        pVehicles.push(newVehicle);
    }
};

// DB Configuration
var gcDB_URL = 'https://js-web-developers.firebaseio.com';

// Singleton Module
var myApp = (function (Firebase, pcDB_URL) {
    var oInstance = {};
    
    function initModule () {
        var cDB_URL = pcDB_URL;
        
        function db_connect () {
            // https://www.firebase.com/docs/web/guide/user-auth.html
            this.oRef = new Firebase(cDB_URL);
        }
        
        function db_auth (pcEmail, pcPassword) {
            // https://www.firebase.com/docs/web/guide/login/password.html
            this.oRef.authWithPassword({
                email    : pcEmail,
                password : pcPassword
            }, function(error, authData) {
                if (error === null) {
                    console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
                } else {
                    console.log("Error authenticating user:", error);
                }
                console.log(authData);
            }, {
                remember: "sessionOnly"
            });
        };
        
        function db_loadRoutes () {
            // ...
        };
        
        function db_loadVehicles () {
            // ...
        };
        
        function app_initialize () {
            // ...
            console.log('App initialized');
        };
        
        return {
            connect: db_connect,
            auth: db_auth,
            initialize: app_initialize
        };
    }
    
    return {
        getInstance: function () {
            if (!oInstance) {
                oInstance = initModule();
            }
            
            return oInstance;
        }
    };
})(Firebase, gcDB_URL);

myApp.initialize();