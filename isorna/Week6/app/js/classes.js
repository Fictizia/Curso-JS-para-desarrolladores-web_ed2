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