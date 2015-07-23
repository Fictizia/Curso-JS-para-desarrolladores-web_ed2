/*globals require*/
'use strict';

define(['backbone','jquery'],function(Backbone,Jquery){ //hay que pasar Backbone como parametro para poder usarla dentro  
////mayusculas-minusculas importante!!!!!!!!!!!!!!!!!!!!!!!!
    
    var modulo2 = {};
    
    modulo2.cambiaTexto = function(pEtiqueta){
        var AppView = {};//ahora declaramos una nueva appview en el modulo
        AppView = Backbone.View.extend({
            
            el : pEtiqueta,
            events : {
                'click p' : 'p_onClick'
            },
            p_onClick : function(pEvent){
                //console.log('hiciste click');
                //alert('hiciste click');
                Jquery(pEvent.target).text('aqui estamos'); //CON THIS NO FUNCIONA PORQUE HARIA REFERENCIA A APPVIEW
                //pEvent.target para hacer referencia a cada p individualmente
                //Jquery(pEtiqueta).css('background-color','red');
            }
        });
        return new AppView;
    };
    return modulo2; //me devuelve un objeto
});