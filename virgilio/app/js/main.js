/* globals requirejs */


// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {  //mayusculas-minusculas importante!!!!!!!!!!!!!!!!!!!!!!!!
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone'
	}
});

requirejs(['jquery', 'modulos/modulo.calendario'], function ($, calendario) {
    
    var miApp ={};
    
    
   miApp = calendario.crearCalendario($('#miCalendario'),'mes');
    
    
    
    
    
    
    
    miApp = new AppView;
});