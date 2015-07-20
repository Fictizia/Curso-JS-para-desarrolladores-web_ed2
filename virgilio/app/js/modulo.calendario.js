/*globals require*/
'use strict';

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
    return modulo;
});