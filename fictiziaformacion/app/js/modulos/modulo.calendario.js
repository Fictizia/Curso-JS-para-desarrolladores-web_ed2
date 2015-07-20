define(['backbone'], function (Backbone) {
    var modulo = {};
    
    // factoria de objetos
    modulo.crearCalendario = function (pEtiqueta, pFormato) {
        var AppView = {};
        
        // si el parametro pFormato fuera 'mes' haria ...
        // si fuera 'semana' haria ...
        AppView = Backbone.View.extend({
            el: pEtiqueta,
            events: {
                'click p': 'p_onClick'// similar a $('#miApp p').on('click', p_onClick)
            },
            p_onClick: function (pEvent) {
                console.log('hiciste click en un P');
            }
        });
        
        return new AppView;
    };
    
    return modulo;
});