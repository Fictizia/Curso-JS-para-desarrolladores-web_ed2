'use strict';

var Persona = function (pcNombre){
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