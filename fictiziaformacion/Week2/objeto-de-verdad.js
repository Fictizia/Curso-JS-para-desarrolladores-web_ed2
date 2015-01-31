'use strict';

// declaro mi app

/*
    miApp
        .clases: clases de objetos
        .estudiantes: gestión de estudiantes
        .cursos: gestión de los cursos
*/

var miApp = miApp || {};

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

miApp.clases.Estudiante = {
    nacionalidad: '',
    edad: 18
};

miApp.estudiantes = {
    listadoEstudiantes: [],
    nuevoEstudiante: function (pcNombre) {
        var oNuevaPersona = miApp.clases.Persona2(pcNombre);
        
        miApp.utilidades.mixin(oNuevaPersona, miApp.clases.Estudiante);
        
        console.log('Añade nuevo estudiante', oNuevaPersona);
        
        this.listadoEstudiantes.push(oNuevaPersona);
    }
};

// funciones genericas
miApp.utilidades = {};

miApp.utilidades.mixin = function (poTarget, poSource) {
    function copyProperty (poKey) {
        poTarget[poKey] = poSource[poKey];
    }

    if (arguments.length > 2) {
        // If there are arguments beyond target and source then treat them as
        // keys of the specific properties/methods that should be copied over.
        Array.prototype.slice.call(arguments, 2).forEach(copyProperty);
    } else {
        // Otherwise copy all properties/methods from the source to the target.
        Object.keys(poSource).forEach(copyProperty);
    }
};