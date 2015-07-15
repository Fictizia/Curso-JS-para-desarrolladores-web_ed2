'use strict';

// creacion de clases e instancias en base al patron de prototipos
// o prototypal pattern

// clase creada como funcion vacia
var Persona = function FichaPersona () {},
    // "base de datos" de personas
    gPersonas = [];

// propiedades de las instancias de la clase persona
Persona.prototype.datosPersonales = {
    nombre: '',
    apellidos: '',
    edad: 0
};
Persona.prototype.puntuacion = 0;
Persona.prototype.equipo = '';

// métodos de las instancias de la clase persona
Persona.prototype.saludar = function () {
    console.log(this.datosPersonales.nombre + ' dice: ¡Hola!');
};
Persona.prototype.puntuar = function (pPuntos) {
    this.puntuacion += pPuntos;
    
    console.log(this.datosPersonales.nombre + ' tiene ' + this.puntuacion + ' puntos.');
};

// librería de funciones

// crea una instancia de la clase FichaPersona y la guarda en la BBDD
function crearPersona (pNombre, pApellidos, pEdad) {
    var nuevaPersona = new Persona;
    
    nuevaPersona.datosPersonales.nombre = pNombre;
    nuevaPersona.datosPersonales.apellidos = pApellidos;
    nuevaPersona.datosPersonales.edad = pEdad;
    
    gPersonas.push(nuevaPersona);
    console.log('Persona creada', gPersonas[gPersonas.length -1]);
}

// asignar equipo a la persona
function elegirEquipo (pPersona, pEquipo) {
    pPersona.equipo = pEquipo;
    console.log(pPersona.datosPersonales.nombre + ' ha elegido el equipo ' + pEquipo);
}