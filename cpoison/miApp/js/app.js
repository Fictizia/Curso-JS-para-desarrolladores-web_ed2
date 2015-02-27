/*  global Backbone, $, _ */

$(function(){
   'use strict';
   
   var oTienda = {};
   
    oTienda.clases = {};
    oTienda.clases.Producto = Backbone.Model.extend({
        defaults:{
            nombre: '',
            precio: '',
            descripcion: '',
            tipo: 0
        }
    }); /* declaramos las clases*/
    oTienda.clases.Usuario = Backbone.Model.extend({});
      
    oTienda.clases.FichaProducto = Backbone.Firebase.Collection.extend({    /* declaramos la coleccion y lo enlazamos con la base de datos*/
       url: 'https://fictiziabackbone.firebaseio.com/listadoProductos',
       model: oTienda.clases.Producto    /* el modelo que tiene en cuenta para la lista es oEstudiantes*/
       
    }),
    
    oTienda.clases.FichaUsuario = Backbone.Collection.extend({   
       model: oTienda.clases.Usuario    
    }),
   
    oTienda.clases.ListadoProductos = Backbone.View.extend({  // declaramos las vistas
        
        tagName: 'li',
        template: _.template($('#listado-template').html()),
        initialize: function(){
            console.log("vista inicializada");
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            console.log("vista renderizada");
            return this;
        }
        
    }),  
    
    oTienda.clases.ListadoUsuarios = Backbone.View.extend({}),

    oTienda.clases.App = Backbone.View.extend({
        el: $('#miApp'),
        events: {
           // aqui iranlos eventos de la app
           'click .page-title': '_TitleClick',  // en el evento click del elemento con clase .page-title lanza la funcion _TitleClick 
           'submit #formProductos': '_Enviar'
            
        },
        initialize: function() {    // funcion con la que arrancamos nuestra app
            console.log('inicializo mi app');
            
            this.listenTo(oTienda.modelos.misProductos, 'add', this._AnadirVista);
            
            
            $('.footer').html(this.footerTemplate({  // añadimos el contenido de footerTemplate a el elemento con clase .footer
                fecha: new Date()   // añadimos uno de los datos que podemos añadir en el template
            }));
            
         },
        render: function(poItem){      // renderiza nuestra app
            console.log('renderiza la app ', poItem);
        },
        
        
        
       // eventos de mi app
        _TitleClick: function(){
            console.log('click en titulo');
        },
        _Enviar: function(evento){
            oTienda.modelos.misProductos.add({
                nombre: $('[name=nombre]').val(),
                precio: $('[name=precio]').val(),
                descripcion: $('[name=descripcion]').val(),
                tipo: $('[name=tipo]').val()
                })
            evento.preventDefault();
            
        },
        _AnadirVista: function(modelo){ // buscar por aqui
            console.log(modelo);
            var nuevaVista = new oTienda.clases.ListadoProductos({model:modelo});
            oTienda.clases.ListadoProductos.push(nuevaVista);
            
            $('#listado').append(nuevaVista.render().el);
            
        },
        
        
       // templates de mi app
        footerTemplate: _.template($('#footer-template').html())
    });

   
   oTienda.modelos = {};
   
   oTienda.vistas = {};
   
   //oTienda.modelos.miProducto =  new oTienda.clases.Producto();
   
    oTienda.modelos.misProductos = new oTienda.clases.FichaProducto();
   
    oTienda.modelos.misProductos.on('sync', function(collection) {
      console.log('collection is loaded', collection);
    });
    
    oTienda.modelos.misProductos.on('all', function(event) {
      // if autoSync is true this will log add and sync
      // if autoSync is false this will only log add
      console.log('Nuevo evento:', event);
    });
    
   
   oTienda.vistas.miApp = new oTienda.clases.App;
   
   window.goTienda = oTienda;
   

       
  // var oApp = new App;  /* Declaramos la instancia de la App*/
});


