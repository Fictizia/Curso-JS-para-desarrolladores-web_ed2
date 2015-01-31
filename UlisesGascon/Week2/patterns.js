var a1Function = function (foo) {
  console.log(foo + 15);
};
var a2Function = function (bar) {
  console.log(bar - 16);
};
var a3Function = function() {
  console.log("TextodEMO" + 6);        
};






// Prototypal pattern
var C1 = function () {}
C1.prototype.var1 = function () {
  console.log('var1');
}
C1.prototype.var2 = function () {
  console.log('var2');
}


var MyKlass1 = new C1;

// Module pattern
var C2 = function () {
  var var1 = function () {
      console.log('var1');
  },
  var2 = function () {
      console.log('var2');
  };

  return {
      value1: var1,
      value2: var2
  }
}


// Module pattern with cached functions
var C3 = function () {
  var bar = 16;
  var foo = 152047;
  
  return {
      fun1: a1Function,
      fun2: a2Function,
      fun3: a3Function
  }
}


//llamada
var MyKlass = C3;




// Class conscructor
(function(){
    var exports = {};
    function privateUtil() {
            var privada1 = 23;
            console.log("Esta función es privada y añado el valor de la funcion privada1 que es", privada1);
    }

    exports.publicUtil = function() {
            console.log("Esta función es pública");
    };

    return exports;
})();