/* global Backbone, $, _*/

/*Estructura de datos

{
  "Bebidas" : {
    "id" : {
      "id", 
      "graduacion",
      "logo",
      "nombre",
      "precio",
      "volumen"
    }
  },
  "Consumiciones" : {
    "id" : {
      "id",
      "cerveza",   relacionar con colección Bebidas
      "hora",
      "usuario"    relacionar con colección Usuarios
    },
  },
  "Usuarios" : {
    "id" : {
      "id",
      "nombre",
      "peso",
      "genero"
    },
  }
}




*/




 $(function(){
    'use strict';
    
    var oParty = {};
    
    oParty.clases = {};
    oParty.clases.Session = Backbone.Model.extend({}),
    
    // Ususarios
    
    oParty.clases.Drunk = Backbone.Model.extend({
        defaults: {
            nombre: "no descrito",
            genero: "no descrito",
            peso: "no descrito"
        }
    }),
    oParty.clases.DrunkList = Backbone.Firebase.Collection.extend({
        url: 'https://nu-bb.firebaseio.com/Usuarios',
        model: oParty.clases.Drunk
    }),
    
    //Bebidas
  
    oParty.clases.Drink = Backbone.Model.extend({
        defaults: {
            nombre: "no descrito",
            graduacion: "no descrito",
            volumen: "no descrito",
            precio: "no descrito",
            logo: "no descrito",
        }
    }),
    oParty.clases.DrinkList = Backbone.Firebase.Collection.extend({
            url: 'https://nu-bb.firebaseio.com/Bebidas',
            model: oParty.clases.Drink
    }),
    
    // Ficha Usuarios
    
     oParty.clases.FichaUsuario = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#usuario-template').html()),
        initialize: function () {
            console.log('ususario view initialized');
        },
        render: function (){
            this.$el.html(this.template(this.model.toJSON()));
            console.log('usuario view rendered');
            
            return this;
        }
    });
    
    // Nu app view
    oParty.clases.App = Backbone.View.extend({
            el: $('#nuApp'),
            events: {
                // aquí irán los eventos de la app
                'click .page-title': '_fTitleClick',
                'submit #formDrunks': '_fFormUsuariosSubmit',
                'submit #formDrinks': '_fFormBebidasSubmit'
                 
            },
            initialize: function (){
                console.log('inicializo mi app');
                $('.page-footer').html(this._tFooterTemplate({
                    fecha: new Date()
                }));
                this.listenTo(oParty.modelos.Drunk, 'add', this._fAddOne);
            },
            render: function (){
                console.log('renderizo mi app');
            },
            // eventos de mi app
             _fAddOne: function (poModel) {
                var newView = new oParty.clases.FichaUsuario({model: poModel});
                oParty.vistas.usuarios.push(newView);
                console.log('add one', poModel, newView);
                
                $('#drunk-list').append(newView.render().el);
            },
            _fTitleClick: function (){
                console.log('click');
            },
            _fFormUsuariosSubmit: function (poEvent) {
            console.log('submitUsusario');
            
             oParty.modelos.Drunk.add({
                nombre: $('[name=nombre]').val(),
                genero: $('[name=genero]').val(),
                peso:$('[name=peso]').val()
            });
            
            poEvent.preventDefault();
            },
             _fFormBebidasSubmit: function (poEvent) {
            console.log('submitBebidas');
            
             oParty.modelos.Drink.add({
                nombre: $('[name=nombre]').val(),
                graduacion:$('[name=graduacion]').val(),
                volumen:$('[name=volumen]').val(),
                precio:$('[name=precio]').val(),
                logo:$('[name=logo]').val(),
            });
            
            poEvent.preventDefault();
            },
            // templates de mi app
            _tFooterTemplate: _.template($('#footer-template').html())
    });

   
    
    oParty.modelos = {};
    
    //Modelo Usuarios
    
    oParty.modelos.Drunk = new oParty.clases.DrunkList();
    
    oParty.modelos.Drunk.on('sync', function(collection){
        console.log('collection is loaded', collection);
    })
    
    //Modelo Bebidas
    
    oParty.modelos.Drink = new oParty.clases.DrinkList();
    
    oParty.modelos.Drink.on('sync', function(collection){
        console.log('collection is loaded', collection);
    })
    
    
    oParty.vistas = {};
    
    oParty.vistas.nuApp = new oParty.clases.App;
    oParty.vistas.usuarios = [];
    
    //creamos variable global para poder exponerla fuera de la función y poder trabajar con ella desde la consola
    window.goParty = oParty;
});