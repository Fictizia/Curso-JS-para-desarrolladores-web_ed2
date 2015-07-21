/* globals requirejs */
'use strict';
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
		backbone: '../bower_components/backbone/backbone',
		text: '../bower_components/requirejs-text/text'
	}
});

requirejs(['jquery', 'modulos/modulo.calendario', 'text!json/datos.json'], function($, calendario, pJSON) {
    // aqui va el js de mi index.html
    var miApp = {};
    
    console.log(JSON.parse(pJSON));
    
    $('html').removeClass('no-js').addClass('js');
    
    miApp = calendario.crearCalendario($('#miCalendario'), JSON.parse(pJSON));
    
});