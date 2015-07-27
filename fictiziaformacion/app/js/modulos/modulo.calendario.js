'use strict';

define(['backbone', 'underscore', 'localstorage', 'text!templates/calendario.html'], function (Backbone, _, localstorage, pCalendarioHtml) {
    var modulo = {};
    
    modulo.crearCalendario = _crearCalendario.bind(modulo, Backbone, _, pCalendarioHtml);
    
    return modulo;
    
    // libreria de funciones privadas
    // - factoria de objetos
    function _crearCalendario (Backbone, _, pCalendarioHtml, pEtiqueta, pJSON) {
        var AppView = {},
            CitaView = {},
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
            model: DayModel,
            //localStorage: new Backbone.LocalStorage('DaysCollection')
        });
        
        misDias = new DaysCollection;
        
        // defino la vista de mi cita
        
        CitaView = Backbone.View.extend({
            tagName: 'div',
            className: 'cita',
            template: _.template('<em><%=agenda%></em>'),
            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                
                return this;
            },
            events: {
                'click em': 'em_onClick'
            },
            em_onClick: function (pEvent) {
                var datos = this.model.toJSON();
                
                alert('(' 
                        + datos.dia + '/' 
                        + datos.mes + '/' 
                        + datos.anyo + ') ' 
                        + datos.agenda);
                
                pEvent.stopPropagation();
            }
        });
        
        // defino la clase de mi AppView
        AppView = Backbone.View.extend({
            initialize: function appView_initialize () {
                console.log('instancia ok', navigator.language, this.el, this.collection);
                this.idioma = navigator.language;
                this.el.innerHTML = miTemplate(misDatos);
                this.listenTo(this.collection, 'add', this.nuevaCita);
            },
            render: function appView_render () {
                console.log('render', this.collection.models);
                
                this.el.innerHTML = miTemplate(misDatos);
                
                return this;
            },
            // las funciones de listenTo a this.collection
            // siempre reciben el modelo recién creado
            nuevaCita: function (pModel) {
    			var vista = new CitaView({model: pModel}),
    			    selector = '.dia[data-day=' + pModel.attributes.dia + ']'
    			        + '[data-month=' + pModel.attributes.mes + ']'
    			        + '[data-year=' + pModel.attributes.anyo + ']';
    			
    			this.$(selector).append(vista.render().el);
                console.log('has creado un nuevo modelo', pModel);
            },
            events: {
                'change #mes': 'mes_onChange',
                'click .dia': 'dia_onClick',
                'click p': 'p_onClick'// similar a $('#miApp p').on('click', p_onClick)
            },
            dia_onClick: function (pEvent) {
                var agenda = '';
                
                agenda = window.prompt('Pon nombre a tu cita');
                
                if (agenda !== null) {
                    console.log(
                        'Nueva cita: (' 
                        + pEvent.target.dataset.day + '/' 
                        + pEvent.target.dataset.month + '/' 
                        + pEvent.target.dataset.year + ') ' 
                        + agenda);
                    
                    this.collection.add({
                        dia: pEvent.target.dataset.day,
                        mes: pEvent.target.dataset.month,
                        anyo: pEvent.target.dataset.year,
                        agenda: agenda
                    });
                }
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