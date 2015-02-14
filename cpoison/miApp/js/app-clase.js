/*  global Backbone, $, _ */

$(function(){
   'use strict';
   
   var oAcademia = {};
   
    oAcademia.clases = {};
    oAcademia.clases.Estudiante = Backbone.Model.extend({}), /* declaramos las clases*/
    oAcademia.clases.Curso = Backbone.Model.extend({}),
    oAcademia.clases.Profesor = Backbone.Model.extend({}),
    oAcademia.clases.FichaEstudiante = Backbone.Collection.extend({    /* declaramos la coleccion*/
       model: oAcademia.clases.Estudiante    /* el modelo que tiene en cuenta para la lista es oEstudiantes*/
    }),
    oAcademia.clases.FichaCurso = Backbone.Collection.extend({
       model: oAcademia.clases.Curso
    }),
    oAcademia.clases.FichaProfesor = Backbone.Collection.extend({
       model: oAcademia.clases.Profesor
    }),
    oAcademia.clases.ListadoEstudiantes = Backbone.View.extend({   /* declaramos las vistas*/
           
    }),   
    oAcademia.clases.ListadoCursos = Backbone.View.extend({}),
    oAcademia.clases.ListadoProfesores = Backbone.View.extend({}),
    oAcademia.clases.App = Backbone.View.extend({
        el: $('#miApp'),
        events: {
           // aqui iranlos eventgos de la app
           'click .page-title': '_TitleClick'  // en el evento click del elemento con clase .page-title lanza la funcion _TitleClick 
        },
        initialize: function() {    // funcion con la que arrancamos nuestra app
            console.log('inicializo mi app');
            $('.footer').html(this.footerTemplate({  // añadimos el contenido de footerTemplate a el elemento con clase .footer
                fecha: new Date()   // añadimos uno de los datos que podemos añadir en el template
            }));
         },
        render: function(){      // renderiza nuestra app
            console.log('renderiza la app');
        },
       // eventos de mi app
        _TitleClick: function(){
            console.log('click en titulo');
        },
       // templates de mi app
        footerTemplate: _.template($('#footer-template').html())
    });

   
   oAcademia.modelos = {};
   
   oAcademia.vistas = {};
   
   oAcademia.vistas.miApp = new oAcademia.clases.App;
   
       
       
       
       
  // var oApp = new App;  /* Declaramos la instancia de la App*/
});


