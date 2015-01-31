"use strick";

var Persona = function (){
    var personita = {};
    
    personita.seMueve = andar;
    
    return personita;
};



//librería de funciones

function andar(){
    console.info('Ando 10 metros');
}