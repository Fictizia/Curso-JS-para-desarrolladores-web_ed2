
console.log(" prototypal Pattern ---------------------");
var Hero1 = function(){}

Hero1.prototype.name = function(name){
  this.name = name;
}

Hero1.prototype.fly = function(){
  console.log ("Tu superheroe " + this.name  + " vuela");
}

var hero = new Hero1;
hero.name("conan");
hero.fly();


console.log(" Module Pattern ---------------------");
var Hero2 = function() {
  var _name = function(name){
    this.name = name
  }
  var _fly = function(){
    console.log ("Tu superheroe " + this.name  + " vuela");
  }
  return {
    fly: _fly,
    name : _name
  }
}

var hero2 = Hero2();
hero2.name("Spiderman 2");
hero2.fly();

console.log(" Module pattern with cached functions ---------------------");

var _name = function(name){
    this.name = name
}
var _fly = function(){
    console.log ("Tu superheroe " + this.name  + " vuela");
}

var Hero3 = function () {
  return {
    fly: _fly,
    name : _name
  }
}

var hero3 = Hero3();
hero3.name("Lobezno");
hero3.fly();

console.log(" Class conscructor ---------------------");
(function(){
    var exports = {};

    exports.name = function(name) {
            this.name = name;
    };
    exports.fly = function() {
            console.log ("Tu superheroe " + this.name  + " vuela");
    };

    return exports;
})();
