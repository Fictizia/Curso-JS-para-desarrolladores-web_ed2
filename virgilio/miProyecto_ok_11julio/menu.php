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
	      <ul class="nav navbar-nav">



                <li class="<?php echo isActive('Area de trabajo',$pageTitle);?>"><a href="zona_trabajo.php">AREA DE TRABAJO</a></li>
	            <li><a href="perfil.php">DATOS PERSONALES<?php echo isActive('Mi Perfil',$pageTitle);?></a></li>
	            


	            <li role="separator" class="divider"></li>
	            <li><a href="#">MIS FOTOS</a></li>
	            <li role="separator" class="divider"></li>
	            <li><a href="#">link 2</a></li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right">
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu <span class="caret"></span></a>
	          <ul class="dropdown-menu">
	            <li><a href="salir.php">Salir</a></li>
	            <li><a href="">otro</a></li>
	          </ul>
	        </li>
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