<?php 
require_once('check_session.php');
//SIN PAGE TITLE ESTO NO ANDA
$pageTitle = 'Galeria';
require_once('head.php');
require_once('menu.php');
require_once('funciones.php');



//$miGaleria=getGallery($mysqli);
//print_r($miGaleria);
?>

<style type="text/css">

*,
*:before,
*:after {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.galeria{
  width:100%;
  height:350px;
  background:grey;
  position:relative;
  
}
/*.galeryItem{
  position:absolute;
  height: 200px;
  width: 200px;
  width:100%;
  height:100%;
  z-index:10;
  background:url(http://cdn01.wallpapersonweb.com/media/tn5/1/1/71.jpg);
  background-size:100% 100%;
  border: solid;
  background-color: black;*/
  
}*/

.bLeft {
    position:absolute;
    width:50px;
    height:50px;
    background:gold;
    top:50%;
    margin-top:-25px;
    z-index:2;
    text-align:center;
  
}
.bRight {
    position:absolute;
    width:50px;
    height:50px;
    background:gold;
    right:0;
    top:50%;
    margin-top:-25px;
    z-index:2;
    text-align:center;
}


.itemTitle { 
   position:absolute;
   width:150px;
   height:40px;
   top:5px;
   left:50%;
   margin-left:-75px;
   text-align:center;
  color:gold;
   background:rgba(255, 255, 255, 0.3)
  
  
  
}

.itemDesc { 
  padding:10px;
   position:absolute;
   width:250px;
   height: 200px;
   left:50%;
   margin-left:-125px;
   top:100px;
   background:rgba(255, 255, 255, 0.5)
  
  
  
}
.gg{
  
  font-size:30px;
  color:firebrick;
  line-height:50px;
  
  
  
}
.brIzq {
  border-radius: 0;
  transition:0.3s linear all;
  cursor:pointer;
}
.brIzq:hover {
    border-radius: 0 10px 10px 0;
    
}
.brDer {
  border-radius: 0;
  transition:0.3s linear all;
  cursor:pointer;
}
.brDer:hover {
  
    border-radius: 10px 0 0 10px;
  
}



body{
  background-color: Thistle;
}


.imagenes{
  background-size:100% auto;
  overflow: hidden;
}


.noseve_gItem_2{
 
                height: 0 !important;
                overflow: hidden; /*para que si tiene texto no aparezca*/
                padding: 0; /*para mo empujar hacia abajo*/
                border: 0;
                /*display: none;*/           
}



</style>

<script type="text/javascript">
  <?php $iconos=getIconos($mysqli);?>  //llamamos a la funcion que me devuelve el array donde estan las fotos
var laGaleria = <?php echo $iconos; ?>; //guardamos en una variable de javascript lo devuelto por PHP
console.log(laGaleria);





                

</script>



  <div class="container">
      <div class="row">
        <div class="col-md-3">
            <div class="galeryItem" id="gItem_1"><img src="<?php echo $iconos[0]['url']; ?>" width="100%"></div>
        </div>
        <div class="col-md-3">
            <div class="galeryItem noseve_gItem_2" id="gItem_2"><img src="<?php echo $iconos[0]['url']; ?>" width="100%"></div>
        </div>
        <div class="col-md-3">
            <div class="galeryItem" id="gItem_3"></div>
        </div>
        <div class="col-md-3">
            <div class="galeryItem" id="gItem_4"></div>
        </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-3">
            <div class="galeryItem" id="gItem_5"></div>
        </div>
        <div class="col-md-3">
            <div class="galeryItem" id="gItem_6"></div>
        </div>
        <div class="col-md-3">
            <div class="galeryItem" id="gItem_7"></div>
        </div>
        <div class="col-md-3">
            <div class="galeryItem" id="gItem_8"></div>
        </div>
        </div>
      </div>
    </div>





            <div class="bLeft brIzq" id="bIzq">
              <i class="fa fa-arrow-left gg"></i>
            </div>
            <div class="bRight brDer" id="bDer">
              <i class="fa fa-arrow-right gg"></i>
            </div>




       <!-- comprobacion para ver que me trae todas las fotos<div class="col-md-3">-->
       <div class="imagenes">
            
       </div>
       <!--<div class="col-md-3">
            <img src="<?php echo $iconos[1]['url']; ?>" width="100%">
       </div>
       <div class="col-md-3">
            <img src="<?php echo $iconos[2]['url']; ?>" width="100%">
       </div>
       <div class="col-md-3">
            <img src="<?php echo $iconos[3]['url']; ?>" width="100%">-->



<script>
//necesitamos hacer json encode en PHP



var bi = $('#bIzq');
var bd = $('#bDer');

var slide = $('#gItem_1');
//var slideTitle = $('#iTitle');
//var slideDesc = $('#iDesc');

var cSlide=0; //contador

var tSlides=laGaleria.length;  //longitud de mi array con imagenes




bd.on('click', function(){
  cSlide+=1;
  
      if(cSlide>tSlides-1){ //cuando llega a la ultima foto
      cSlide=0; //pone la variable a cero para comenzar por el principio
      }
  
  goto(cSlide);
});



bi.on('click', function(){
   cSlide-=1;

        if(cSlide<0){
        cSlide=tSlides-1;
        
        }
  goto(cSlide);
});  
  

/*var goto = function(num){
  
//---------var slide = $('#gItem');
//--------------var tSlides=laGaleria.length;

for (var i = 0; i < laGaleria.length-1; i++) {
 

//fijamos la opacidad a cero al principio - cargamos todo el contenido
  $('#gItem_'.[i]).animate({opacity:0.5},'fast',function(){
        $('#gItem_'.[i]).css('background', 'url('+laGaleria[num].url+')');
        $('#gItem_'.[i]).css('background-size', '100% 100%');
        //slideTitle.html(laGaleria[num].title);
        //slideDesc.html(laGaleria[num].desc);
//y ahora volvemos a cambiar la opacidad para que todo lo cargado aparezca
        $('#gItem_'.[i]).animate({opacity:1},'fast',function(){
            console.log('SLIDE CAMBIADO');
        });
 
  });
  
    // leer el numero del array que toque!!!!





};



  
};*/
var goto = function(num){
  
//fijamos la opacidad a cero al principio - cargamos todo el contenido
  slide.animate({opacity:0.5},'fast',function(){
        slide.css('background', 'url('+laGaleria[num].url+')');
        slide.css('background-size', '100% 100%');
        //slideTitle.html(laGaleria[num].title);
        //slideDesc.html(laGaleria[num].desc);
//y ahora volvemos a cambiar la opacidad para que todo lo cargado aparezca
        slide.animate({opacity:1},'fast',function(){
            console.log('SLIDE CAMBIADO');
        });
 
  });
  
    // leer el numero del array que toque!!!!
    

  
  
};

//goto(slide);//para que cargue por defecto una imagen al arrancar la pagina

$('#bIzq').on('click',function(){
    setTimeout(function(){
                    $('#gItem_2').removeClass('noseve_gItem_2');
                },3000);
})

</script>
    






<?php
require_once ('footer.php');
?>