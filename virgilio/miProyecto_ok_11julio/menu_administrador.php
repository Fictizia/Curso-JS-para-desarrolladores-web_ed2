<body>
<style type="text/css">
	h1{
		color: white;
	}

</style>
<div class="container-fluid">
    <nav class="navbar navbar-inverse">
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    

	    <!-- Collect the nav links, forms, and other content for toggling -->
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav">



                <li><a href="#"><h3>ADMINISTRACION DE USUARIOS</h3></a></li>
	            
	            


	            <li role="separator" class="divider"></li>
	            
	      </ul>
	      <ul class="nav navbar-nav navbar-right">
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Menu <span class="caret"></span></a>
	          <ul class="dropdown-menu">
	            <li><a href="salir.php">Cerrar sesión de Administrador</a></li>
	            <li><a href="user_zone.php">Acceder como usuario</a></li>
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