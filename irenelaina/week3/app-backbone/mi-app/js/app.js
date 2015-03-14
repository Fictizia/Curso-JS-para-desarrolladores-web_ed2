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
    
    oBote.clases.ListadoEvents = Backbone.Firebase.Collection.extend({
        url: 'https://bote.firebaseio.com/events',
        model: oBote.clases.Event
    });
    oBote.clases.ListadoUsers = Backbone.Firebase.Collection.extend({ 
        url: 'https://bote.firebaseio.com/users',
        model: oBote.clases.User
    });
    oBote.clases.ListadoConceptos = Backbone.Collection.extend({ 
        model: oBote.clases.Concepto
    });
    
    
    oBote.clases.FichaUsers = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#users-template').html()),
        initialize: function () {
            console.log('view initialized');
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            console.log('view rendered');
            
            return this;
        }
    });
    
    
    //clase de mi aplicacion
    oBote.clases.App = Backbone.View.extend({
        //enlazo con el elemento del html
        el: $('#miApp'),
        events: {
            //aquí iran los eventos de la app
            'click .page-title': '_fTitleClick',
            'click .logo': '_fLogo',
            'click .menu-link' : '_fMenuClick',
            'submit #formUsers': '_fFormUsersSubmit',
            'submit #formActividad': '_fFormActividadSubmit',
            'click [href="#login"]': '_fLogin'
        },
        //se lanza siempre que hacemos una instancia
        initialize: function (){
            console.log('inicializo mi app');
            
            this.listenTo(oBote.modelos.misUsuarios, 'add', this._fAddOne);
            
           // $('.page-header').html(this._tHeaderTemplate({})),
            $('.page-footer').html(this._tFooterTemplate({
                fecha: new Date()
            }));
        },
        render: function (){
            console.log ('renderizo mi app');
        },
        
        // eventos de mi app
        _fAddOne: function (poModel) {
            var newView = new oBote.clases.FichaUsers({model: poModel});
            oBote.vistas.users.push(newView);
            console.log('add one', poModel, newView);
            
            $('#users-list').append(newView.render().el);
        },
        _fTitleClick: function() {
            console.log ('hice click en el title');  
        },
        _fLogo: function (poEvent) {
            poEvent.preventDefault();
            console.log ('hice click en el logo');
        },
        _fMenuClick: function (poEvent) {
            poEvent.preventDefault();
            poEvent.stopPropagation();
            
            var cURL = poEvent.currentTarget.href.split('#')[1];
            console.log('click del menu', cURL);
        },
        _fFormActividadSubmit: function (poEvent) {
            poEvent.preventDefault();
            console.log('Actividad añadida');
            
            oBote.modelos.misEventos.add({
                concept: $('[name=Concepto]').val(),
                amount: $('[name=Cantidad]').val(),
                date: $('[name=Fecha]').val()
            });
        },
        _fFormUsersSubmit: function (poEvent) {
            poEvent.preventDefault();
            console.log('Usuario añadido');
            
            oBote.modelos.misUsuarios.add({
                name: $('[name=Nombre]').val(),
                lastname: $('[name=Apellidos]').val()
            });
        },
        _fLogin: function(poEvent){
            
            $('#login').slideToggle();
            
            var oRef = new Firebase("https://bote.firebaseio.com");
                oRef.createUser({
                  email    : "aaa@firebase.com",
                  password : "correcthorsebatterystaple"
                }, function(error, userData) {
                  if (error) {
                    console.log("Error creating user:", error);
                } else {
                    console.log("Successfully created user account with uid:", userData.uid);
                }
            });
        },
        // templates de mi app
        //_tHeaderTemplate: _.template($('#header-template').html()),
        _tFooterTemplate: _.template($('#footer-template').html())
    });

    
    oBote.modelos = {};
    
    oBote.modelos.misUsuarios = new oBote.clases.ListadoUsers();
    
    oBote.modelos.misUsuarios.on('sync', function (collection) {
        console.log('USUARIOS collection is loaded', collection);
    });
    
    oBote.modelos.misEventos = new oBote.clases.ListadoEvents();
    
    oBote.modelos.misEventos.on('sync', function (collection) {
        console.log('EVENTS collection is loaded', collection);
    });
    
    oBote.vistas = {};
    
    
    oBote.vistas.miApp = new oBote.clases.App;
    oBote.vistas.users = [];
    
    //console.log(oBote);
    
    window.goBote = oBote;

});    