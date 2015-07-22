'use strict';

define(['backbone', 'underscore', 'text!templates/calendario.html'], function (Backbone, _, pCalendarioHtml) {
    var modulo = {};
    
    modulo.crearCalendario = _crearCalendario.bind(modulo, Backbone, _, pCalendarioHtml);
    
    return modulo;
    
    // libreria de funciones privadas
    // - factoria de objetos
    function _crearCalendario (Backbone, _, pCalendarioHtml, pEtiqueta, pJSON, alcobendas) {
        var AppView = {},
            instancia = {},
            misDatos = {
                nombre: 'Alvaro',
                meses: pJSON.meses,
                alcobendas: alcobendas
            },
            miTemplate = _.template(pCalendarioHtml);
        
        // si el parametro pJSON fuera 'mes' haria ...
        // si fuera 'semana' haria ...
        AppView = Backbone.View.extend({
            el: pEtiqueta,
            initialize: function appView_initialize () {
                console.log('instancia ok', navigator.language, this.el);
                this.idioma = navigator.language;
                this.el.querySelector('#cabecera').innerHTML = miTemplate(misDatos);
            },
            events: {
                'click p': 'p_onClick'// similar a $('#miApp p').on('click', p_onClick)
            },
            p_onClick: function (pEvent) {
                // el "this" dentro de un evento en una clase de Backbone cambia a la instancia de la clase AppView
                console.log('hiciste click en un P', pEvent.target);
            }
        });
        
        instancia = new AppView;
        
        return instancia;
    }
});