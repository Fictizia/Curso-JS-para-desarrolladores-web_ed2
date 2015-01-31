// Prototypal pattern
Klass1 = function () {}
Klass1.prototype.funcionExterna1 = function () {
  console.log('foo');
}
Klass1.prototype.funcionExterna2 = function () {
  console.log('bar');
}

// Module pattern
Klass2 = function () {
  var _funcionInterna1 = function () {
      console.log('foo');
  },
  _funcionInterna2 = function () {
      console.log('bar');
  };
  var objetoNuevo = {
      funcionExterna1: _funcionInterna1,
      funcionExterna2: _funcionInterna2
  };
  
  return objetoNuevo;
}


// Module pattern with cached functions
var funcionPublica1 = function () {
  console.log('foo');
};
var funcionPublica2 = function () {
  console.log('bar');
};

Klass3 = function () {
  return {
      funcionExterna1: funcionPublica1,
      funcionExterna2: funcionPublica2
  }
}

// Class conscructor
(function(){
    var exports = {};

    function privateUtil() {
            //...
    }

    exports.publicUtil = function() {
            //...
    };

    return exports;
})();