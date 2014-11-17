/* globals: jQuery, _ */

// 1. Basic module pattern
var myNamespace = (function () {
 
  var myPrivateVar, myPrivateMethod;
 
  // A private counter variable
  myPrivateVar = 0;
 
  // A private function which logs any arguments
  myPrivateMethod = function( foo ) {
      console.log( foo );
  };
 
  return {
 
    // A public variable
    myPublicVar: "foo",
 
    // A public function utilizing privates
    myPublicFunction: function( bar ) {
 
      // Increment our private counter
      myPrivateVar++;
 
      // Call our private method using bar
      myPrivateMethod( bar );
 
    }
  };
 
})();

// 2. Import Mixin

// Global module
var myModule = (function ( jQ, _ ) {
 
    function privateMethod1(){
        jQ(".container").html("test");
    }
 
    function privateMethod2(){
      console.log( _.min([10, 5, 100, 2, 1000]) );
    }
 
    return {
        publicMethod: function(){
            privateMethod1();
        }
    };
 
// Pull in jQuery and Underscore
})( jQuery, _ );
 
myModule.publicMethod();

// 3. Exports pattern
// Global module
var myModule2 = (function () {
 
  // Module object 
  var module = {},
    privateVariable = "Hello World";
 
  function privateMethod() {
    // ...
  }
 
  module.publicProperty = "Foobar";
  module.publicMethod = function () {
    console.log( privateVariable );
  };
 
  return module;
 
})();