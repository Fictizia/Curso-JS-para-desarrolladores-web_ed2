/*globals require*/

/*
'use strict';
//problema--pasamos Backbone como parametro, para que no queded la referencia al parametro abierta, y no consumir recursos
//,se lo deberiamos pasar como parametro a la funcion
define(['backbone','underscore','text!templates/tabla.html'],function(Backbone,_,pTablaHtml){ //hay que pasar Backbone como parametro para poder usarla dentro  
////mayusculas-minusculas importante!!!!!!!!!!!!!!!!!!!!!!!!
    
    var modulo = {};
    
    modulo.crearTabla = _crearTabla.bind(modulo, Backbone, _, pTablaHtml);

     function _crearTabla (Backbone, _, pTablaHtml,pEtiqueta,pJson) {
        var AppView = {},
            instancia = {},
            misDatos = {
               datos:pJson
            },
            miTemplate = _.template(pTablaHtml);
        
        // si el parametro pFormato fuera 'mes' haria ...
        // si fuera 'semana' haria ...
        AppView = Backbone.View.extend({
            el: pEtiqueta,
            initialize: function appView_initialize () {
                console.log('instancia ok', navigator.language, this.el);
                this.idioma = navigator.language;
                this.el.querySelector('#cabecera').innerHTML = miTemplate(misDatos);
            },
            events: {
                'click p': 'p_onClick'// similar a $('#miApp p').on('click', p_onClick)
            },
            p_onClick: function (pEvent) {
                // el "this" dentro de un evento en una clase de Backbone cambia a la instancia de la clase AppView
                console.log('hiciste click en un P', pEvent.target);
            }
        });
    
      instancia = new AppView;
        
        return instancia;
    
   
});

*/

'use strict';
//lo que vamos a necesitar --- calendario.html es la plantilla sobre la que pintamos el contenido
define(['backbone', 'underscore', 'text!templates/calendario.html'], function (Backbone, _, pCalendarioHtml) {
    var modulo = {};
    
    modulo.crearCalendario = _crearCalendario.bind(modulo, Backbone, _, pCalendarioHtml);
    
    return modulo;
    
    // libreria de funciones privadas
    // - factoria de objetos
    function _crearCalendario (Backbone, _, pCalendarioHtml, pEtiqueta, pJSON) {
        var AppView = {},
        DayModel={},
        DaysCollection={},
            miApp = {},
            misDias={},
            misDatos = {
                nombre: 'Alvaro',
                meses: pJSON.meses,
                mesElegido :null,
                diasDelMesElegido : 0 
              
            },
            miTemplate = _.template(pCalendarioHtml);
        
        // si el parametro pJSON fuera 'mes' haria ...
        // si fuera 'semana' haria ...
        DayModel=Backbone.Model.extend({
            defaults:{
                dia:1,
                mes:1,
                anyo:2015,
                agenda:''
            }
        });
        
        //defino mi coleccion de modelos
        
        DaysCollection=Backbone.Collection.extend({
            model:DayModel
        })
        
        misDias = new DaysCollection; //mis dias es una instancia de mi coleccion
        
        
        
        AppView = Backbone.View.extend({
            el: pEtiqueta, //$('#miCalendario') -- etiqueta que le pasamos,donde colocara la plantilla
            initialize: function appView_initialize () {
                console.log('instancia ok', navigator.language, this.el);
                this.idioma = navigator.language;
                this.el.innerHTML = miTemplate(misDatos); //lo que coloco en #miCalendario es el contenido de mi plantilla
                this.listenTo(this.collection,'add',this.nuevaCita);
            },
            render:function appView_render(){ 
                //console.log('render'); comprobacion para ver si se llamaba correctamente a la funcion
                 this.el.innerHTML = miTemplate(misDatos); //aunque con "initialize" me pinta
                 return this;
            },
            //las funciones de listento a this.collection
            //siempre reciben el modelo recien creado
            nuevaCita:function(pModel){
                console.log("has creado un nuevo modelo");
            },
            events: {
                'change #mes':'mes_onChange', //añadimos el evento que salta al cambiar #mes
                'click p': 'p_onClick',// similar a $('#miApp p').on('click', p_onClick)
                'click .dia':'dia_onClick'
            },
            
            //ahora definimos las funciones que se disparan con esos eventos
            
            mes_onChange: function(pEvent){ //pasamos el evento 
                console.log('cambiaste el mes',pEvent.target.value);
                misDatos.mesElegido = pEvent.target.value; //el contenido al hacer el click del select
                misDatos.diasDelMesElegido = pJSON.diasPorMes[pEvent.target.value]; //selecciono el valor en la posicion [pEvent.target.value]
                //del array "diasPorMes" en pJSON
                this.render(); //llamamos a la funcion "render"
            },
            dia_onClick: function(pEvent){
                var cita="";
                cita = window.prompt("pon nombre a tu cita");
                if(cita !==null){
                    
                 console.log("nueva cita " + pEvent.target.dataset.day +" "+ pEvent.target.dataset.month +" "+ pEvent.target.dataset.year +" "+ cita);   
                 this.collection.add({
                     dia:pEvent.target.dataset.day,
                     mes:pEvent.target.dataset.mes,
                     anyo:pEvent.target.dataset.anyo,
                     agenda:cita
                 })
                }
                
               //console.log(pEvent.target.dataset.day,pEvent.target.dataset.month,pEvent.target.dataset.year);
               
            },
            p_onClick: function (pEvent) { //pasamos el evento 
                
                // el "this" dentro de un evento en una clase de Backbone cambia a la instancia de la clase AppView
                console.log('hiciste click en un P', pEvent.target);
            }
        });
         
         
         
         
        miApp = new AppView({ //creamos instancia que guarda AppView
            collection:misDias //coleccion que va a usar
            
        });
        
        return miApp;  //esto es lo que devuelve a index.js
    }
});