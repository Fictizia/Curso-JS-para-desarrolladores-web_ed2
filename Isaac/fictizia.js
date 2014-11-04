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

var persona = (function() {
  return{
    nombre: '',
    apellidos: ''
  }
}());



var idClient = WEB.SERV.isaacsc@hotmail.com;
var passKey = 9BFC4324-06FD-4C2C-ADFD-F84F03421725;

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send({
          idClient: idClient,
          pass: passKey,
        });
    }
}

aClient = new HttpClient();
aClient.get('https://openbus.emtmadrid.es:9443/emt-proxy-server/last/bus/GetRouteLines.php', function(answer) {
    // do something with answer
});

