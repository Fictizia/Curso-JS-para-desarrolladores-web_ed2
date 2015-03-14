function comprobarMaximoCaracteres (pcTexto, piNumeroCaracteres) {
    'use strict';
    var bReturnValue = true,
        iNumeroCaracteres = (piNumeroCaracteres > 0) || 10;
    
    if (pcTexto.length > iNumeroCaracteres) {
        bReturnValue = false;
    }
    
    
    return bReturnValue;
}

function validarFormulario (poNombre) {
    'use strict';
    var bReturnValue = true,
        cMiVariableDeClosure = '';// asignar siempre el tipo de variable, no mutar el tipo
    
    if (comprobarMaximoCaracteres(poNombre.value) === false) {
        window.alert('has sobrepasado el maximo de caracteres');
        return false;
    }
    
    // ... arguments, this
    
    
    _validarAlgo(poNombre.id);
    
    // libero la memoria de la variable en la closure:
    cMiVariableDeClosure = null;
    
    
    return bReturnValue;
    // ---------------------- FUNCIONES ----------------------
    
    function _validarAlgo (poMiParametro) {
        cMiVariableDeClosure += poMiParametro;
    }
}

var gcNombreCompleto = String('Alvaro'),
    gcOtroNombre = 'Pepe';

String.prototype.invertir = function () {
  // ...
  return this;
};