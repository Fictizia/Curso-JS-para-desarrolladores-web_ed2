'use strict';

var ghTablaHash = {
    clave1: 'valor1'
};

ghTablaHash.clave2 = 'valor 2';

console.log(ghTablaHash.clave1, ghTablaHash.clave2);

var calcularIRPF = function () {
    
};

function calcularIVA (piTipo, pcNombre) {
    var i = 0, aArray = [1, 2, 3];
    
    (function funcionInterna(){
        console.log(aArray);
    })();
    
    console.log(arguments);
};

calcularIVA(16, 'libros', 5, 'medicinas');

//$('.input').on('click', function input_onClick(){/**/});