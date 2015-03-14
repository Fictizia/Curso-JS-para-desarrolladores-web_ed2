'use strict'

var Persona = function (){
    var personita = {};
    
    personita.seMueve = andar;
    
    return personita;
};

/* libreria de funciones */

function andar (){
    console.info('Ando 10 metros')
}



var misTextos = {};

misTextos.es = {
    titulo: 'mi web',
    descripcion: 'esta es mi web',
    url: 'www.miweb.com/es'
};

misTextos.en = {
    titulo: 'my web',
    descripcion: 'this is my web',
    url: 'www.miweb.com/en'
};

misTextos[es].titulo = mi web