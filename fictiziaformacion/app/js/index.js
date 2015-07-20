/* globals requirejs */

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
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

requirejs(['jquery', 'modulos/modulo.calendario'], function($, calendario) {
    // aqui va el js de mi index.html
    var miApp = {};
    
    $('html').removeClass('no-js').addClass('js');
    //pModuloElTiempo.traerInformacionDelTiempo();
    
    miApp = calendario.crearCalendario($('#miCalendario'), 'mes');
    
});