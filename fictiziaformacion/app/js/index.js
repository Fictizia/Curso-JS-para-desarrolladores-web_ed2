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
		backbonefire: {
			deps: [
				'underscore',
				'backbone'
			],
			exports: 'Backbonefire'
		},
		firebase: {
			exports: 'Firebase'
		}
	},
	paths: {
	    jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
        text: '../bower_components/requirejs-text/text',
		firebase: '../bower_components/firebase/firebase',
		backbonefire: '../bower_components/backbonefire/dist/backbonefire'
	}
});
// importante: inyectar los modulos que vayamos a usar, y los origenes de datos (JSON)
requirejs(['jquery', 'backbone', 'modulos/modulo.calendario', 'modulos/modulo.usuarios', 'text!json/datos.json', 'text!json/BBDD.usuarios.json'], 
	function($, Backbone, calendario, usuarios, pJSON, pBBDD) {
    // aqui va el js de mi index.html
    var miCalendario, // por defecto, ahora miCalendario === undefined
    	misUsuarios, // por defecto, ahora misUsuarios === undefined
    	unUsuario,
    	etiquetaCalendario = $('#miCalendario'),
    	etiquetaUsuarios = $('#misUsuarios'),
    	ClaseRouter = Backbone.Router.extend({
	    	routes: {
	    		'/': 'cargarHome',
	    		'usuarios': 'cargarUsuarios',
	    		'usuarios/:id': 'cargarUsuarios',
	    		'calendario': 'cargarCalendario'
	    	},
	    	cargarHome: function () {
	    		$('#misUsuarios').addClass('hidden');
	    		$('#unUsuario').addClass('hidden');
	    		$('#miCalendario').addClass('hidden');
	    	},
	    	cargarUsuarios: function (pId) {// este parametro viene de la ruta usuarios/:id
	    		console.log('cargando usuarios', pId);
			    // aqui iria la creacion de mi app lista de usuarios
	    		$('#miCalendario').addClass('hidden');
	    		$('#unUsuario').addClass('hidden');
	    		$('#misUsuarios').addClass('hidden');
	    		
	    		if (pId !== null && pId !== undefined) {// si me llega el ID, cargar la ficha del usuario
	    			$('#unUsuario').removeClass('hidden');
	    			//console.log('cargar la ficha del usuario', pId);
	    			unUsuario = usuarios.crearFichaUsuario(pId);
	    		} else {
	    			$('#misUsuarios').removeClass('hidden');
	    			if (misUsuarios === undefined) {
				    	misUsuarios = usuarios.crearListaUsuarios(etiquetaUsuarios, JSON.parse(pBBDD));
		    		}
	    		}
	    	},
	    	cargarCalendario: function () {
	    		console.log('cargando calendario');
			    // creacion de la instancia de la app de calendario
	    		$('#miCalendario').addClass('hidden');
	    		$('#unUsuario').addClass('hidden');
	    		$('#misUsuarios').addClass('hidden');
	    		
	    		if (miCalendario === undefined) {
	    			$('#miCalendario').removeClass('hidden');
			    	miCalendario = calendario.crearCalendario(etiquetaCalendario, JSON.parse(pJSON));
	    		}
	    	}
	    }),
    	enrutador = {};
    
    $('html').removeClass('no-js').addClass('js');
    
    enrutador = new ClaseRouter();
    
    Backbone.history.start({
    	pushState: false, // el pushState de HTML5 sólo funciona si tienes acceso a la configuracion del servidor
    	root: '/fictiziaformacion/app/'
    });
});