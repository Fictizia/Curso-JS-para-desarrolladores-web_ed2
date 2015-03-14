





function funcionQueDevuelveObjeto(){
    return {
        todoOk: true
    };
};

var objeto = funcionQueDevuelveObjeto();

var otroObjeto = (function devuelveObjeto(){
    return {
        todoOk: true
    };
}());