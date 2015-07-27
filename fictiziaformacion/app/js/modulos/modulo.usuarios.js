'use strict';

// recibe la inyeccion de Backbone, underscore y el template de la lista de usuarios
define(['backbone', 'underscore', 'firebase', 'backbonefire', 'text!templates/usuarios.html'], function (Backbone, _, Firebase, Backbonefire, pUsuariosHtml) {
    var modulo = {};// creamos la variable modulo que llegara a index.js
    
    // creamos la funcion publica que sera accesible desde fuera
    // con los parametros preconfigurados Backbone, _ y la plantilla pUsuariosHtml
    modulo.crearListaUsuarios = _crearListaUsuarios.bind(modulo, Backbone, _, pUsuariosHtml);
    
    return modulo;// devolvemos el modulo ya compuesto
    
    // funcion original con todos los parametros
    function _crearListaUsuarios (Backbone, _, pUsuariosHtml, pEtiqueta, pJSON) {
        var AppView = {},// clase de la vista de la aplicacion
            UserModel = {},// clase del modelo de datos de un usuario
            UserView = {},// clase de la vista del modelo de datos de un usuario
            UsersCollection = {},// clase de la colección de modelos de usuarios
            miApp = {},// instancia de la vista de la aplicación
            misUsuarios = {},// instancia de la colección de modelos de usuarios
            miTemplate = _.template(pUsuariosHtml);// template de la vista de la aplicación
            
        // prueba: modelo enlazado con BBDD firebase
        var ModeloPrueba = Backbone.Firebase.Model.extend({
            url: 'https://js-web-developers.firebaseio.com/prueba'
        });
        // creo la nueva instancia del modelo
        var nuevaPrueba = new ModeloPrueba(),
            nuevaFecha = new Date();
        // actualizo los datos, forzando que se guarde en BBDD
        nuevaPrueba.set({
            porejemplo: 'esto',
            otracosa: 19998,
            fecha: nuevaFecha.getTime(), 
            html: pUsuariosHtml
        });
        
        // clase del modelo de datos de un usuario
        UserModel = Backbone.Firebase.Model.extend({
            defaults: {
                nombre: '',
                apellidos: ''
            }
        });
        // clase de la vista del modelo de datos de un usuario
        // pinta el HTML de un modelo de datos de un usuario
        UserView = Backbone.View.extend({
            tagName: 'li',
            template: _.template('<%= nombre %> <%= apellidos %>'),
            render: function () {
                // combina los datos del modelo de usuario con su template
                this.$el.html(this.template(this.model.toJSON()));
                
                return this;// devuelve la instancia del UserView
            },
        });
        // clase de la colección de modelos de usuarios
        // la colección se encarga de gestionar los modelos
        UsersCollection = Backbone.Firebase.Collection.extend({
            model: UserModel,
            url: 'https://js-web-developers.firebaseio.com/usuarios'
        });
        // instancia de la colección de modelos de usuarios
        misUsuarios = new UsersCollection;
        // clase de la vista de la aplicacion
        AppView = Backbone.View.extend({
            template: miTemplate,
            initialize: function () {
                // en las views que no tienen model asociado,
                // no se ejecuta el render() automaticamente
                this.render();
                // cuando se añada un modelo a la colección, 
                // ejecuta crearVistaUsuario()
                this.listenTo(this.collection, 'add', this.crearVistaUsuario);
                // insertamos en la colección el JSON de la BBDD
                this.collection.add(pJSON);
            },
            // repinto el HTML con el template de la AppView
            render: function () {
                this.el.innerHTML = miTemplate();
            },
            // recibe el modelo correspondiente cada vez que es llamada
            crearVistaUsuario: function (pModel) {
                var nuevaVista = new UserView({
                    model: pModel
                });
                
                // console.log('creando vista del usuario', pModel);
                // añadimos al UL el HTML de la nuevaVista creada
                this.$('ul').append(nuevaVista.render().el);
            }
        });
        // instancia de la vista de la aplicación
        miApp = new AppView({
            el: pEtiqueta, // etiqueta donde se incrusta la vista de la aplicación
            collection: misUsuarios // instancia de la colección de modelos de usuarios
        });
        
        //console.log('crear lista de usuarios', pUsuariosHtml, pEtiqueta, pJSON);
        
        return miApp;
    }
});