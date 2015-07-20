'use strict';
$(document).ready(function() {

//validacion del formulario de index.php
    $('#loginForm').on('submit', function() {
        //añadimos la comprobacion para evitar que haya campos vacios
        //ahorro trabajo al servidor, hago la validación en el lado del cliente
        if (!$('#usuario').val() || $('usuario').val() === '') {
            $('#resultados').addClass('rojo');
            $('.response').html('EL USER NO ESTA COMPLETO, COMPLETA!!!');
            //alert('EL USER NO ESTA COMPLETO, COMPLETAL!!!');
            return false;
        }

        if (!$('#password').val() || $('password').val() === '') {
            $('#resultados').addClass('rojo');
            //el contenido lo sacamos en response para que #resultados no lo tape
            $('.response').html('EL PASSWORD NO ESTA COMPLETO, COMPLETA!!!');

            //alert('EL PASSWORD NO ESTA COMPLETO, COMPLETA!!!');
            return false;
        }
      
        return true;
        

    });


    //no hace falta ponerle height=0px, eliminamos cualquiera de las clases que
    //pudieramos haber añadido(rojo o verde) y recupera su tamaño orignal(height=0px)
    $('#cerrar').on('click', function() {
        $('#resultados').removeClass('verde');
        $('#resultados').removeClass('rojo');
    });


    
});
