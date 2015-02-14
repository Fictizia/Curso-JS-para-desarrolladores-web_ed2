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
    oAcademia.clases.Estudiante = Backbone.Model.extend({
        defaults: {
            nombre: 'nombre no descrito',
            edad: 0
        }
    });
    oAcademia.clases.Curso = Backbone.Model.extend({
        defaults: {
            nombre: 'curso no descrito',
            alumnos: 0
        }
    });
    oAcademia.clases.Profesor = Backbone.Model.extend({});
    oAcademia.clases.ListadoEstudiantes = Backbone.Firebase.Collection.extend({
        url: 'https://fictizia-backbone.firebaseio.com/alumnos',
        model: oAcademia.clases.Estudiante
    });
    oAcademia.clases.ListadoCursos = Backbone.Firebase.Collection.extend({
        url: 'https://fictizia-backbone.firebaseio.com/cursos',
        model: oAcademia.clases.Curso
    });
    oAcademia.clases.ListadoProfesores = Backbone.Collection.extend({
        model: oAcademia.Profesor
    });
    oAcademia.clases.FichaEstudiante = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#student-template').html()),
        initialize: function () {
            console.log('view initialized');
        },
        render: function (){
            this.$el.html(this.template(this.model.toJSON()));
            console.log('view rendered');
            
            return this;
        }
    });
    oAcademia.clases.FichaCurso = Backbone.View.extend({});
    oAcademia.clases.FichaProfesor = Backbone.View.extend({});
    oAcademia.clases.App = Backbone.View.extend({
        el: $('#miApp'),
        events: {
            // aqui iran los eventos de la app
            'click .page-title': '_fTitleClick',
            'click .menu-item': '_fMenuClick',
            'submit #formAlumnos': '_fFormAlumnosSubmit'
        },
        initialize: function () {
            console.log('inicializo mi app');
            
            this.listenTo(oAcademia.modelos.misAlumnos, 'add', this._fAddOne);
            //this.listenTo(oAcademia.modelos.misAlumnos, 'reset', this._fAddAll);
            //this.listenTo(oAcademia.modelos.misAlumnos, 'all', this.render);
            
            $('.page-footer', this.$el).html(this._tFooterTemplate({
                fecha: new Date()
            }));
        },
        render: function (poItem) {
            console.log('renderizo mi app', poItem);
        },
        // eventos de mi app
        _fAddOne: function (poModel) {
            var newView = new oAcademia.clases.FichaEstudiante({model: poModel});
            oAcademia.vistas.alumnos.push(newView);
            console.log('add one view for model id: ', poModel.id, newView.cid);
            
            $('#alumn-list').append(newView.render().el);
        },
        _fAddAll: function (poItems) {
            console.log('add all', poItems);
        },
        _fTitleClick: function (poEvent) {
            console.log('hice click en el title');
        },
        _fMenuClick: function (poEvent) {
            var cURL = poEvent.currentTarget.href.split('#')[1];
            
            console.log('click del menu', cURL);
            
            poEvent.preventDefault();
            poEvent.stopPropagation();
        },
        _fFormAlumnosSubmit: function (poEvent) {
            console.log('submit');
            
            oAcademia.modelos.misAlumnos.add({
                nombre: $('[name=Nombre]').val(),
                edad:$('[name=Edad]').val()
            });
            
            poEvent.preventDefault();
        },
        // templates de mi app
        _tFooterTemplate: _.template($('#footer-template').html())
    });
    
    oAcademia.modelos = {};
    
    oAcademia.modelos.misAlumnos = new oAcademia.clases.ListadoEstudiantes();
    
    oAcademia.modelos.misAlumnos.on('sync', function(collection) {
        console.log('ESTUDIANTES collection is loaded', collection.models.length + ' models');
    });
    oAcademia.modelos.misAlumnos.on('all', function(event) {
      // if autoSync is true this will log add and sync
      // if autoSync is false this will only log add
      console.log('Nuevo evento:', event);
    });
    
    oAcademia.modelos.misCursos = new oAcademia.clases.ListadoCursos();
    
    oAcademia.modelos.misCursos.on('sync', function(collection) {
        console.log('CURSOS collection is loaded', collection.models.length + ' models');
    });
    oAcademia.modelos.misCursos.on('all', function(event) {
      // if autoSync is true this will log add and sync
      // if autoSync is false this will only log add
      console.log('Nuevo evento:', event);
    });
    
    oAcademia.vistas = {};
    
    oAcademia.vistas.miApp = new oAcademia.clases.App;
    oAcademia.vistas.alumnos = [];
    
    window.goAcademia = oAcademia;
});