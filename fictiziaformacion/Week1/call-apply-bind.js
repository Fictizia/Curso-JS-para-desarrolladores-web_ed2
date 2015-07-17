function ejecutarAlgo () {
    
}

function a_onClick (pEvento) {
    pEvento.preventDefault();
    // algun efecto chulo, o mostrar un tooltip
    alert(this.title);
}

/*
<ul>
    <li><a class="fila" href="#fila1" title="Descripcion ...">fila 1</a></li>
    <li><a class="fila" href="#fila2" title="Descripcion ...">fila 2</a></li>
    ...
</ul>
*/

var enlacesFila = document.querySelectorAll('ul>li>a.fila'),
    i = 0;

for (i = 0; i < enlacesFila.length; i++) {
    enlacesFila[i].addEventListener('click', a_onClick);
}

/*
<p>Texto ... <a id="enlaceFueraDelUL" href="#" title="Blah">blah</a></p>
*/

function enlaceFueraDelUL_onClick (pEvento) {
    a_onClick.call(this, pEvento);
}

document.getElementById('enlaceFueraDelUL').addEventListener('click', enlaceFueraDelUL_onClick);

// call, apply
var miOtroObjeto = document.getElementById('otraEtiqueta'),
    miX = 100,
    miY = 200;

ejecutarAlgo.call(miOtroObjeto, miX, miY);
ejecutarAlgo.apply(miOtroObjeto, [miX, miY]);


// bind
var pacmanRosa = new Monigote('pacman', 'rosa');

var iniciarPosicionPacmanRosa = pacmanRosa.mover.bind(pacmanRosa, 0, 0);

iniciarPosicionPacmanRosa();