'use strict';

var Persona = function FichaPersona (pNombre, pApellidos) {
    var nuevaPersona = {};
    
    nuevaPersona.nombre = pNombre;
    nuevaPersona.apellidos = pApellidos;
    
    return nuevaPersona;
};
// constructor de modulo con funciones en cache:
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
    nuevoMonigote.mover = moverMonigote;
    
    document.getElementById('casillaDeSalida-' + pTipo).appendChild(nuevoMonigote);
    
    return nuevoMonigote;
};

// libreria de funciones
function moverMonigote (pX, pY) {
    this.style.top = pY + 'px';
    this.style.left = pX + 'px';
}

// call, bind & apply
var miOtroObjeto = document.getElementById('otraEtiqueta'),
    miX = 100,
    miY = 200;

moverMonigote.call(miOtroObjeto, miX, miY);
moverMonigote.apply(miOtroObjeto, [miX, miY]);

var pacmanRosa = new Monigote('pacman', 'rosa');

var iniciarPosicionPacmanRosa = pacmanRosa.mover.bind(pacmanRosa, 0, 0);

iniciarPosicionPacmanRosa();