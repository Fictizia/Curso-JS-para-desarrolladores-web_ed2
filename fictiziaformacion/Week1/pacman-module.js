'use strict';

var Persona = function FichaPersona (pNombre, pApellidos) {
    var nuevaPersona = {};
    
    nuevaPersona.nombre = pNombre;
    nuevaPersona.apellidos = pApellidos;
    
    return nuevaPersona;
};

var Monigote = function DibujoMonigote (pTipo, pColor) {
    var nuevoMonigote = document.createElement('div'),
        imagenDeFondo = '';
    
    if (pTipo === 'pacman') {
        imagenDeFondo = '/img/pacman-' + pColor + '.gif';
    } else if (pTipo === 'fantasma') {
        imagenDeFondo = '/img/fantasma-' + pColor + '.gif';
    } else {
        console.log('El monigote tiene que ser un pacman o un fantasma');
    }
    
    nuevoMonigote.style.backgroundImage = 'url(' + imagenDeFondo + ')';
    nuevoMonigote.style.width = '50px';
    nuevoMonigote.style.height = '50px';
    
    document.getElementById('casillaDeSalida-' + pTipo).appendChild(nuevoMonigote);
    
    return nuevoMonigote;
};