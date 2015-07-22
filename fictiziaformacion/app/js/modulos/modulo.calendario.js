'use strict';

define(['backbone', 'underscore', 'text!templates/calendario.html'], function (Backbone, _, pCalendarioHtml) {
    var modulo = {};
    
    modulo.crearCalendario = _crearCalendario.bind(modulo, Backbone, _, pCalendarioHtml);
    
    return modulo;
    
    // libreria de funciones privadas
    // - factoria de objetos
    function _crearCalendario (Backbone, _, pCalendarioHtml, pEtiqueta, pJSON) {
        var AppView = {},
            DayModel = {},
            DaysCollection = {},
            miApp = {},
            misDias = {},
            misDatos = {
                nombre: 'Alvaro',
                meses: pJSON.meses,
                mesElegido: null,
                diasDelMesElegido: 0
            },
            miTemplate = _.template(pCalendarioHtml);
        
        // defino el modelo de mi DayModel
        DayModel = Backbone.Model.extend({
            defaults: {
                dia: 1,
                mes: 1,
                anyo: 2015,
                agenda: ''
            }
        });
        
        // defino mi coleccion de modelos
        DaysCollection = Backbone.Collection.extend({
            model: DayModel
        });
        
        misDias = new DaysCollection;
        
        // defino la clase de mi AppView
        AppView = Backbone.View.extend({
            initialize: function appView_initialize () {
                console.log('instancia ok', navigator.language, this.el, this.collection);
                this.idioma = navigator.language;
                this.el.innerHTML = miTemplate(misDatos);
            },
            render: function appView_render () {
                console.log('render');
                
                this.el.innerHTML = miTemplate(misDatos);
                
                return this;
            },
            events: {
                'change #mes': 'mes_onChange',
                'click p': 'p_onClick'// similar a $('#miApp p').on('click', p_onClick)
            },
            mes_onChange: function (pEvent) {
                console.log('cambiaste de mes', pEvent.target.value);// el value del select es el value del option elegido
                misDatos.mesElegido = pEvent.target.value;
                misDatos.diasDelMesElegido = pJSON.diasPorMes[pEvent.target.value];
                this.render();
            },
            p_onClick: function (pEvent) {
                // el "this" dentro de un evento en una clase de Backbone cambia a la instancia de la clase AppView
                console.log('hiciste click en un P', pEvent.target);
            }
        });
        
        // asignar collection!
        miApp = new AppView({
            el: pEtiqueta,
            collection: misDias
        });
        
        return miApp;
    }
});