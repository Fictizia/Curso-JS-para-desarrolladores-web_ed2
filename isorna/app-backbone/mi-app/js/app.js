/* global Backbone, $, _ */
/*
    Estructura de datos:
    Listado de cursos
     - N cursos
      - cada curso tiene M temarios
    Listado de profesores
     - N profesores
      - cada profesor imparte M cursos
    Listado de estudiantes
     - N estudiantes
      - cada estudiante asiste a M cursos

    */



$(function(){
    'use strict';
    
    var oAcademia = {};
    
    oAcademia.clases = {};
    oAcademia.clases.Estudiante = Backbone.Model.extend({});
    oAcademia.clases.Curso = Backbone.Model.extend({
        defaults: {
            nombre: 'curso no descrito',
            alumnos: 0
        }
    });
    oAcademia.clases.Profesor = Backbone.Model.extend({});
    oAcademia.clases.ListadoEstudiantes = Backbone.Collection.extend({
        model: oAcademia.clases.Estudiante
    });
    oAcademia.clases.ListadoCursos = Backbone.Firebase.Collection.extend({
        url: 'https://fictizia-backbone.firebaseio.com/cursos',
        model: oAcademia.clases.Curso
    });
    oAcademia.clases.ListadoProfesores = Backbone.Collection.extend({
        model: oAcademia.Profesor
    });
    oAcademia.clases.FichaEstudiante = Backbone.View.extend({});
    oAcademia.clases.FichaCurso = Backbone.View.extend({});
    oAcademia.clases.FichaProfesor = Backbone.View.extend({});
    oAcademia.clases.App = Backbone.View.extend({
        el: $('#miApp'),
        events: {
            // aqui iran los eventos de la app
            'click .page-title': '_fTitleClick',
            'click .menu-item': '_fMenuClick'
        },
        initialize: function () {
            console.log('inicializo mi app');
            $('.page-footer', this.$el).html(this._tFooterTemplate({
                fecha: new Date()
            }));
        },
        render: function () {
            console.log('renderizo mi app');
        },
        // eventos de mi app
        _fTitleClick: function (poEvent) {
            console.log('hice click en el title');
        },
        _fMenuClick: function (poEvent) {
            var cURL = poEvent.currentTarget.href.split('#')[1];
            
            console.log('click del menu', cURL);
            
            poEvent.preventDefault();
            poEvent.stopPropagation();
        },
        // templates de mi app
        _tFooterTemplate: _.template($('#footer-template').html())
    });
    
    oAcademia.modelos = {};
    
    oAcademia.modelos.misCursos = new oAcademia.clases.ListadoCursos();
    
    oAcademia.modelos.misCursos.on('sync', function(collection) {
        console.log('collection is loaded', collection);
    });
    oAcademia.modelos.misCursos.on('all', function(event) {
      // if autoSync is true this will log add and sync
      // if autoSync is false this will only log add
      console.log(event);
    });
    
    oAcademia.vistas = {};
    
    oAcademia.vistas.miApp = new oAcademia.clases.App;
    
    window.goAcademia = oAcademia;
});