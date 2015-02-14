/* global Backbone, $, _ */

/*
    Estructura de datos:
    
    Listado de Botes:
     - N personas
        - cada persona gasta X
     - Listado de Activides
    Listado de Personas
    
    Listado de Conceptos

*/

$(function(){
    'use strict'
    
    var oBote = {};    
    
    oBote.clases = {};
    
    oBote.clases.Event = Backbone.Model.extend({});
    oBote.clases.User = Backbone.Model.extend({});
    oBote.clasesTransaction = Backbone.Model.extend({});
    oBote.clases.Concepto = Backbone.Model.extend({});
    
    oBote.clases.ListadoEvents = Backbone.Collection.extend({
        model: oBote.Event
    });
    oBote.clases.ListadoUsers = Backbone.Collection.extend({ 
        model: oBote.User
    });
    oBote.clases.ListadoConceptos = Backbone.Collection.extend({ 
        model: oBote.Concepto
    });
    
    oBote.clases.App = Backbone.View.extend({
        el: $('#miApp'),
        events: {
            //aquí iran los eventos de la app
            'click .page-title': '_fTitleClick',
            'click .logo': '_fLogo'
        },
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
        // templates de mi app
        _tHeaderTemplate: _.template($('#header-template').html()),
        _tFooterTemplate: _.template($('#footer-template').html())
    });

    
    oBote.modelos = {};
    oBote.vistas = {};
    
    
    oBote.vistas.miApp = new oBote.clases.App;
    
    console.log(oBote);

});    