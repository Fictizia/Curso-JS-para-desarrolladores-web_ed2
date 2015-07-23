/*globals require*/
'use strict';
//problema--pasamos Backbone como parametro, para que no queded la referencia al parametro abierta, y no consumir recursos
//,se lo deberiamos pasar como parametro a la funcion
define(['backbone'],function(Backbone){ //hay que pasar Backbone como parametro para poder usarla dentro  
////mayusculas-minusculas importante!!!!!!!!!!!!!!!!!!!!!!!!
    
    var modulo = {};
    
    modulo.crearCalendario = function(pEtiqueta,pFormato){
        var AppView = {};//ahora declaramos una nueva appview en el modulo
        AppView = Backbone.View.extend({
            
            el : pEtiqueta,
            events : {
                'click p' : 'p_onClick'
            },
            p_onClick : function(pEvent){
                console.log('hiciste click');
            }
        });
        return new AppView;
    };
    return modulo; //me devuelve un objeto
});

//problema!!!! devolvemos "modulo" pero se queda una referencia interna a Backbone
//solucion--->pasar Backbone como parametro a la funcion--ver ejemplo en directorio padre