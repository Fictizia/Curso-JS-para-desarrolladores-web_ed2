// Prototypal pattern
Klass1 = function () {}
Klass1.prototype.foo = function () {
  log('foo');
}
Klass1.prototype.bar = function () {
  log('bar');
}

// Module pattern
Klass2 = function () {
  var foo = function () {
      log('foo');
  },
  bar = function () {
      log('bar');
  };

  return {
      foo: foo,
      bar: bar
  }
}


// Module pattern with cached functions
var FooFunction = function () {
  log('foo');
};
var BarFunction = function () {
  log('bar');
};

Klass3 = function () {
  return {
      foo: FooFunction,
      bar: BarFunction
  }
}

// Class conscructor
var oClassConstructor = (function(){
    var exports = {};

    function privateUtil() {
      console.log('private method');
    };

    exports.publicUtil = function() {
      console.log('public method');
      privateUtil();
    };

    return exports;
})();