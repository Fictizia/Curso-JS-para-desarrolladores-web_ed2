'use strict';

// mi codigo ...

var gMiVariable1 = [
        'Alvaro',
        'Virgilio',
        'Elena'
    ],
    gMiVariable2 = 22;

var filtrar = function () {
    'use strict';
    var miVariable1 = 111,
        miVariable2 = 22;
    // ...
};

var miFuncion = ejecutarBusqueda;

// libreria de funciones

function ejecutarBusqueda () {
    var i;
    
    for (i = 0; i < gMiVariable1.length; i++) {
        mostrarLog(gMiVariable1[i]);
    }
}

function mostrarLog (pMiNombre) {
    console.log('Hola ' + pMiNombre.toUpperCase() + '!');
}

function hacerAlgoComplejo () {
    var returnValue = hacerOtraCosa();
    // ...
    
    return returnValue;
    
    function hacerOtraCosa () {
        return 'ok';
    }
}