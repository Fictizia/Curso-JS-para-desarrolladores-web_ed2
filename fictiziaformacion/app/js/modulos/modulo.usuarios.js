'use strict';

// recibe la inyeccion de Backbone, underscore y el template de la lista de usuarios
define(['backbone', 'underscore', 'firebase', 'backbonefire', 'text!templates/usuario.html', 'text!templates/usuarios.html'], function (Backbone, _, Firebase, Backbonefire, pUsuarioHtml, pUsuariosHtml) {
    var modulo = {};// creamos la variable modulo que llegara a index.js
    
    // creamos la funcion publica que sera accesible desde fuera
    // con los parametros preconfigurados Backbone, _ y la plantilla pUsuariosHtml
    modulo.crearListaUsuarios = _crearListaUsuarios.bind(modulo, Backbone, _, pUsuarioHtml, pUsuariosHtml);
    
    return modulo;// devolvemos el modulo ya compuesto
    
    // funcion original con todos los parametros
    function _crearListaUsuarios (Backbone, _, pUsuarioHtml, pUsuariosHtml, pEtiqueta, pJSON) {
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
        UserModel = Backbone.Model.extend(/*{
            defaults: {
                nombre: '',
                apellidos: ''
            },
        }*/);
        /*
            Las security rules de Firebase nos permiten configurar qué permitimos guardar y cómo en la BBDD
            {
                "rules": {
                    ".read": true,
                    ".write": true,
                    "usuarios": {
                      "$usuario": {
                        ".validate": "newData.hasChildren(['nombre', 'apellidos']) && newData.child('nombre').isString() && newData.child('apellidos').isString()"
                      }
                    }
                    
                }
            }
        */
        
        
        // clase de la vista del modelo de datos de un usuario
        // pinta el HTML de un modelo de datos de un usuario
        UserView = Backbone.View.extend({
            tagName: 'li',
            className: 'usuario',
            // template: _.template('<%= nombre %> <%= apellidos %>')
            // se puede añadir funcionalidad en la vista del template
            template: _.template(pUsuarioHtml),
            render: function () {
                // combina los datos del modelo de usuario con su template
                this.$el.html(this.template(this.model.toJSON()));
                
                return this;// devuelve la instancia del UserView
            },
            events: {
                'click a[href="#editar"]': 'a_onClick_editar',
                'click a[href="#borrar"]': 'a_onClick_borrar'
            },
            a_onClick_editar: function (pEvent) {
                var nuevosDatos = {};
                
                nuevosDatos.nombre = prompt('Nuevo nombre:', this.model.attributes.nombre);
                nuevosDatos.apellidos = prompt('Nuevos apellidos:', this.model.attributes.apellidos);
                
                console.log('Nuevos datos', nuevosDatos);
                
                this.model.set(nuevosDatos);
                this.render();
                
                pEvent.preventDefault();
                pEvent.stopPropagation();
            },
            a_onClick_borrar: function (pEvent) {
                //console.log(this.model);
                this.model.destroy();
                this.$el.remove();
                pEvent.preventDefault();
                pEvent.stopPropagation();
            }
        });
        // clase de la colección de modelos de usuarios
        // la colección se encarga de gestionar los modelos
        UsersCollection = Backbone.Firebase.Collection.extend({
            model: UserModel,
            url: 'https://js-web-developers.firebaseio.com/usuarios'
        });
        // instancia de la colección de modelos de usuarios
        misUsuarios = new UsersCollection();
        // puedo comprobar cuándo termina de leer los datos de la BBDD con el evento sync de Firebase
        misUsuarios.on('sync', function(collection) {
            console.log('collection is loaded', collection);
        });
        
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
                // insertamos en la colección el JSON simulando la BBDD
                //this.collection.add(pJSON);
            },
            // repinto el HTML con el template de la AppView
            render: function () {
                // this.el es la etiqueta HTML del DOM
                this.el.innerHTML = miTemplate();
                // this.$el es el objeto jquery que contiene la etiqueta del DOM
            },
            // recibe el modelo correspondiente cada vez que es llamada
            crearVistaUsuario: function (pModel) {
                var nuevaVista = new UserView({
                    model: pModel
                });
                
                // console.log('creando vista del usuario', pModel);
                // añadimos al UL el HTML de la nuevaVista creada
                this.$('ul').append(nuevaVista.render().el);
            },
            // para poder insertar en la coleccion, tiene que ser desde la AppView
            // porque el modelo debe insertar en su propia coleccion
            events: {
                'submit form': 'form_onSubmit'
            },
            form_onSubmit: function (pEvent) {
                var nuevosDatos = {};
                
                nuevosDatos.nombre = $('#nombre').val();
                nuevosDatos.apellidos = $('#apellidos').val();
                
                if (nuevosDatos.nombre !== '' && nuevosDatos.apellidos !== ''){
                    console.log('Nuevos datos', nuevosDatos);
                    this.collection.add(nuevosDatos);
                }
                
                //this.model.set(nuevosDatos);
                //this.render();
                
                pEvent.preventDefault();
                pEvent.stopPropagation();
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