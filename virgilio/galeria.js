var fotos = ['http://todofondos3d.com/wp-content/uploads/images/f3/3d-hd.jpg',
'http://elmundo3d.com/wp-content/uploads/images/fe/3d-hd-0.jpg',
'http://www.pulsarmedia.eu/data/media/70/1920X1200_Zixpk_Hd_Wallpaper_224.jpg'];

var InsertarEtiquetas = function(){
    
    var target1 = document.getElementById('contenedorFotos');
    var target2 = document.getElementsByTagName('li');
    
    for (var i =0;i< fotos.length; i++) {
        document.createElement('li');
        document.createElement('img');
    }
};



  miIMG = document.createElement('img');
        
        miIMG.src = miListaDeFotos[indice];
        
        target2.appendChild(miIMG);
        
        target1.appendChild(target2);