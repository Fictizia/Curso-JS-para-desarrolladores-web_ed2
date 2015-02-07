/* global Backbone, $, _*/

/*Estructura de datos






*/




$(function(){
    'use strict';
    
    var oParty = {};
    
    oParty.clases = {};
    oParty.clases.Session = Backbone.Model.extend({}),
    oParty.clases.Drunk1 = Backbone.Model.extend({}),
    oParty.clases.Drunk2 = Backbone.Model.extend({}),
    oParty.clases.Drink = Backbone.Model.extend({}),
    oParty.clases.DrinkList = Backbone.Collection.extend({
            model: oParty.clases.Drink
    }),
    oParty.clases.App = Backbone.View.extend({
            el: $('#nuApp'),
            events: {
                // aquí irán los eventos de la app
                'click .page-title': '_fTitleClick'
            },
            initialize: function (){
                console.log('inicializo mi app');
                $('.page-footer').html(this._tFooterTemplate({
                    fecha: new Date()
                }));
            },
            render: function (){
                console.log('renderizo mi app');
            },
            // eventos de mi app
            _fTitleClick: function (){
                console.log('click');
            },
            // templates de mi app
            _tFooterTemplate: _.template($('#footer-template').html())
    });

   
    
    oParty.modelos = {};
    
    oParty.vistas = {};
    
    oParty.vistas.nuApp = new oParty.clases.App;
});