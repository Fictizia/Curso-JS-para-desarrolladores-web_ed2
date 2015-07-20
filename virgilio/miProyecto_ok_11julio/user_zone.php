<?php
//session_start(); ya no hace falta porque la sesion esta iniciada
require_once('check_session.php'); 
//sin pageTitle NO FUNCIONA!!!!!!!!!!!
$pageTitle='Zona de usuarios'; 
require_once('head.php');
require_once('menu.php');      
?>

<div class="container">
   	<div class="row"> 
       <div class="col-md-offset-3 col-md-6">

       	    <h2>
		      Zona de arranque de la aplicacion
		    </h2>
		    <div>
		    Bienvenido   <?php echo $_SESSION['userName']; ?>
		    </div>

       </div>

   	</div>
</div>

<?php
require_once ('footer.php');
?>
