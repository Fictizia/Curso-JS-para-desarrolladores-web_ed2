var gMiBBDD = [
    {
        nombre: 'alvaro',
        apellidos: 'isorna'
    },
    {
        nombre: 'virgilio',
        apellidos: 'fernandez'
    }
    // 100 registros...
];

function ejecutarFiltro (pMiBBDD) {
    var miBusqueda = {},
        campos = document.getElementsByTagName('INPUT'),
        i = 0;
    
    // ... coger datos del formulario
    for (i = 0; i < campos.length; i++){
        miBusqueda[campos[i].name] = campos[i].value;
        
        // equivale a: miBusqueda['nombre'] = 'alvaro';
    }
    
    return filtrar(pMiBBDD, miBusqueda);
}

function filtrar (pMiBBDD, pBusqueda) {
    var resultado;
    
    // ... filtrar de la BBDD a partir de los datos de busqueda
    // mirar los que coincidan nombre y/o apellido
    // for...
    //    if ...
    // resultado <- pMiBBDD + pBusqueda
    
    return resultado;
}