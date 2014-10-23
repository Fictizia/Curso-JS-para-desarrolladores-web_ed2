/*global $,_*/
(function(w){
    'use strict';

    var FooFunction = function () {
      console.log('foo');
    };
    var BarFunction = function () {
      console.log('bar');
    };
    
    var app = function () {
      return {
          foo: FooFunction,
          bar: BarFunction
      };
    };
    $(document).ready(function document_ready(){
        
    })
}(window));
