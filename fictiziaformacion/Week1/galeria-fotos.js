var miListaDeFotos = [
    'img/paisajes/paisaje1.jpg',
    'img/paisajes/paisaje2.jpg',
    'img/paisajes/paisaje3.jpg',
    'img/paisajes/paisaje4.jpg',
    'img/retratos/retrato1.jpg',
    'img/retratos/retrato2.jpg',
    'img/retratos/retrato3.jpg',
    'img/retratos/retrato4.jpg'
];

function crearGaleria () {
    var miGaleria = document.querySelector('.galeria'),
        miLI, miIMG;
    
    for (var indice = 0; indice < miListaDeFotos.length; indice++) {
        miLI = document.createElement('li');
        
        if (miListaDeFotos[indice].indexOf('paisajes') >= 0) {
            miLI.className = 'paisaje';
        } else {
            miLI.className = 'retrato';
        }
        
        miIMG = document.createElement('img');
        
        miIMG.src = miListaDeFotos[indice];
        
        miLI.appendChild(miIMG);
        
        miGaleria.appendChild(miLI);
    }
}

crearGaleria ();

function filtrarFotos () {
    var miFiltro = document.getElementsByName('filtro'),
        miSeleccion = '';
    
    if (miFiltro[0].checked == true) {
        miSeleccion = miFiltro[0].value;
    } else if (miFiltro[1].checked == true) {
        miSeleccion = miFiltro[1].value;
    } else if (miFiltro[2].checked == true) {
        miSeleccion = miFiltro[2].value;
    }
    
    console.log('filtrando fotos', miSeleccion);
    
    document.querySelector('.galeria').className = 'galeria mostrar-' + miSeleccion;
}

document.getElementById('botonFiltrar').addEventListener('click', filtrarFotos);