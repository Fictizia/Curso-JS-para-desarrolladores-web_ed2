/*global $,_ */
(function document_ready() {
'use strict';
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
   

 $( document ).ready(function() {
      
  
    });
     
}(window));