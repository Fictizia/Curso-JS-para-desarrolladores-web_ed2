/* global Backbone, $, _ */

/*
    Estructura de datos:
    
    Listado de Botes:
        Listado de Activides
            - Actividad 1
            - Actividad 2
            ...
        Listado de Personas
            - Persona 1 
            - Persona 2
            ...
        Listado de Conceptos
            - Comida
            - Gasolina
            ...
        Listado de Transacciones
            - Transaccion 1
            - Transaccion 2
*/

$(function(){
    'use strict';
    
    var oBote = {};    
    
    oBote.clases = {}; //namespace
    
    oBote.clases.Event = Backbone.Model.extend({});
    oBote.clases.User = Backbone.Model.extend({
        defaults:{
            name: 'Pepito',
            lastname: 'Pérez'
        }
    });
    oBote.clasesTransaction = Backbone.Model.extend({});
    oBote.clases.Concepto = Backbone.Model.extend({});
    
    oBote.clases.ListadoEvents = Backbone.Collection.extend({
        model: oBote.Event
    });
    oBote.clases.ListadoUsers = Backbone.Firebase.Collection.extend({ 
        url: 'https://bote.firebaseio.com/users',
        model: oBote.User
    });
    oBote.clases.ListadoConceptos = Backbone.Collection.extend({ 
        model: oBote.Concepto
    });
    
    
    //clase de mi aplicacion
    oBote.clases.App = Backbone.View.extend({
        //enlazo con el elemento del html
        el: $('#miApp'),
        events: {
            //aquí iran los eventos de la app
            'click .page-title': '_fTitleClick',
            'click .logo': '_fLogo',
            'submit #formUsers': '_fFormUsers'
        },
        //se lanza siempre que hacemos una instancia
        initialize: function (){
            console.log('inicializo mi app');
            $('.page-header').html(this._tHeaderTemplate({})),
            $('.page-footer').html(this._tFooterTemplate({
                fecha: new Date()
            }));
        },
        render: function (){
            console.log ('renderizo mi app');
        },
        //eventos de mi app
        _fTitleClick: function() {
            console.log ('hice click en el title');  
        },
        _fLogo: function (e) {
            e.preventDefault();
            console.log ('hice click en el logo');
        },
        _fFormUsers: function (poEvent) {
            console.log('submit');
            poEvent.preventDefault;
        },
        // templates de mi app
        _tHeaderTemplate: _.template($('#header-template').html()),
        _tFooterTemplate: _.template($('#footer-template').html())
    });

    
    oBote.modelos = {};
    
    oBote.modelos.misUsuarios = new oBote.clases.ListadoUsers();
    
    oBote.modelos.misUsuarios.on('sync', function(collection) {
        console.log('collection is loaded', collection);
    });
    
    oBote.vistas = {};
    
    
    oBote.vistas.miApp = new oBote.clases.App;
    
    console.log(oBote);
    
    window.oBote = oBote;

});    