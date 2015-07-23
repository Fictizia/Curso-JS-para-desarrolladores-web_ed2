'use strict';

define(['backbone', 'underscore', 'text!templates/usuarios.html'], function (Backbone, _, pUsuariosHtml) {
    var modulo = {};
    
    modulo.crearListaUsuarios = _crearListaUsuarios.bind(modulo, Backbone, _, pUsuariosHtml);
    
    return modulo;
    
    function _crearListaUsuarios (Backbone, _, pUsuariosHtml, pEtiqueta, pJSON) {
        var AppView = {},
            UserModel = {},
            UsersCollection = {},
            miApp = {},
            misUsuarios = {},
            misDatos = {
                usuarios: pJSON
            },
            miTemplate = _.template(pUsuariosHtml);
            
        UserModel = Backbone.Model.extend({
            defaults: {
                nombre: '',
                apellidos: ''
            }
        });
        
        UsersCollection = Backbone.Collection.extend({
            model: UserModel
        });
        
        misUsuarios = new UsersCollection;
        
        AppView = Backbone.View.extend({
            template: miTemplate,
            initialize: function () {
                this.el.innerHTML = miTemplate(misDatos);
            }
        });
        
        miApp = new AppView({
            el: pEtiqueta,
            collection: misUsuarios
        });
        
        console.log('crear lista de usuarios', pUsuariosHtml, pEtiqueta, pJSON);
    }
});