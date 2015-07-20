<?php
function isActive($enlace,$pageTitle){
	if ($enlace === $pageTitle) {
		return 'active';
	}
		return '';
}

/* mejor lo sustituimos en 
	switch ($pageTitle) {
    	case 'Zona de usuarios':
        	//echo "Zona de usuarios";
    		return 1;
        	break; 
     	case 'Mi Perfil':
        	//echo "Mi Perfil";
        	return 1;
        	break;	
    	case 'Gestion de Usuarios':
        	//echo "Gestion de Usuarios";
        	return 1;
        	break;
    	default:
    		return false;  
	}

}
*/

?>
<style type="text/css">
	body{
		padding-top: 50px;
	}
</style>
<body>
<div class="container">
    <nav class="navbar navbar-inverse navbar-fixed-top">
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="/">MappingNow.es</a>
	    </div>

	    <!-- Collect the nav links, forms, and other content for toggling -->
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

	    	 <ul class="nav navbar-nav navbar-left">
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> CARGAR FICHEROS XML<span class="caret"></span></a>
	          <ul class="dropdown-menu">
	            <li><a id="bibliotecas" href="">Crear tabla de "Bibliotecas y bibliobuses" en la ciudad de Madrid</a></li>
	            

	            <li><a href="">nada???</a></li>
	            <li><a href="">nada???</a></li>
	            <li><a href="">nada???</a></li>
	            <li><a href="">nada???</a></li>
	            <li><a href="">nada???</a></li>
	            <li><a href="">nada??</a></li>
	          </ul>
	        </li>
	      </ul>

	       
<ul class="nav navbar-nav navbar-left">
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> CARGAR FICHEROS JSON <span class="caret"></span></a>
	          <ul class="dropdown-menu">
	            <li><a id="bibliotecas" href="">Alcobendas</a></li>
	            <li><a href="">nada???</a></li>
	            <li><a href="">nada???</a></li>
	            <li><a href="">nada???</a></li>
	            <li><a href="">nada???</a></li>
	            <li><a href="">nada???</a></li>
	            <li><a href="">nada??</a></li>
	          </ul>
	        </li>
	      </ul>

	      <ul class="nav navbar-nav nav-center">
	            
	            <li role="separator" class="divider"></li>
	            <li><a href="#">MI MENU</a></li>
	            <li role="separator" class="divider"></li>
	            
	      </ul>

<ul class="nav navbar-nav navbar-right">
<li><a href="salir.php">CERRAR SESION</a></li>
</ul>      
	     
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>
</div>



<?php 
//este es el container para el nombre de la pagina
if(isset($pageTitle)){ 
?>
<div class="container">
	<div class="row">
	    <div class="col-md-12">
			<h1>
				<?php echo $pageTitle; ?>
			</h1>
			<hr>
	    </div>
	</div>
</div>




<?php
} 
?>









