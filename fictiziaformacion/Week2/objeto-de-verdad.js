'use strict';

// declaro mi app

var miApp = {};

// declaro el namespace de clases

miApp.clases = {};

// 1. patron de modulos con funciones en memoria
miApp.clases.Persona = function (pcNombre){
    var personita = {};
    
    personita.nombre = pcNombre;
    personita.seMueve = andar;
    personita.saluda = saludar;
    
    return personita;
};

/* libreria de funciones */

function andar (piMetros) {
    console.info('Ando ' + piMetros + ' metros');
}

function saludar () {
    console.log('Hola!, me llamo ' + this.nombre);
}

// 2. patron de constructor de clase
miApp.clases.Persona2 = function (pcNombre){
    var oPersonita = {},
        _cNombre = pcNombre;
    
    oPersonita.seMueve = _fAndar;
    oPersonita.saluda = _fSaludar;
    oPersonita.getNombre = _getNombre;
    oPersonita.setNombre = _setNombre;
    
    return oPersonita;
    
    /* libreria de funciones */
    
    function _getNombre () {
        return _cNombre;
    }
    
    function _setNombre (pcNuevoNombre) {
        _cNombre = pcNuevoNombre;
    }

    function _fAndar (piMetros) {
        console.info('Ando ' + piMetros + ' metros');
    }
    
    function _fSaludar () {
        console.log('Hola!, me llamo ' + _getNombre());
    }
};

var miYo = miApp.clases.Persona2('Alvaro');
