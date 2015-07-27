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
		},
		backbonefire:{
			deps: [
				'underscore',
				'backbone'
			],
			exports: 'Backbonefire'
		},
		firebase:{
			exports: 'Firebase'
		}
	},
	paths: {
	    jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
        //localstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
		text: '../bower_components/requirejs-text/text',
		backbonefire:'../bower_components/backbonefire/dist/backbonefire',
		firebase:'../bower_components/firebase/firebase'
	}
});
// importante: inyectar los modulos que vayamos a usar, y los origenes de datos (JSON)
requirejs(['jquery', 'modulos/modulo.calendario', 'modulos/modulo.usuarios', 'text!json/datos.json', 'text!json/BBDD.usuarios.json'], 
	function($, calendario, usuarios, pJSON, pBBDD) {
    // aqui va el js de mi index.html
    var miCalendario = {},
    	misUsuarios = {},
    	etiquetaCalendario = $('#miCalendario'),
    	etiquetaUsuarios = $('#misUsuarios');
    
    $('html').removeClass('no-js').addClass('js');
    
    // creacion de la instancia de la app de calendario
    miCalendario = calendario.crearCalendario(etiquetaCalendario, JSON.parse(pJSON));
    
    // aqui iria la creacion de mi app lista de usuarios
    misUsuarios = usuarios.crearListaUsuarios(etiquetaUsuarios, JSON.parse(pBBDD));
});