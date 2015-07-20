<?php
//session_start(); ya no hace falta porque la sesion esta iniciada
require_once('check_session.php'); 
//sin pageTitle NO FUNCIONA!!!!!!!!!!!
$pageTitle='Gestion de usuarios'; 
require_once('head.php');
require_once('menu_administrador.php');  
include 'funciones.php';      
?>
<div class="container">
    <div class="row">
        <div class="col-md-12">
              <h3>Creación de nuevos Usuarios</h3>
          <form class="form-horizontal">    
            

                <div class="form-group">
                    <input type="text" placeholder="Nombre de usuario" id="userName">
                    <input type="text" placeholder="Password" id="userPass">
                    <input type="text" placeholder="Nombre" id="userNombre">
                    <input type="text" placeholder="Apellidos" id="userApellidos">
                    <input type="text" placeholder="Direccion" id="userDireccion">
                    <input type="text" placeholder="Email" id="userEmail">
                    <input type="text" placeholder="Telefono" id="userTelefono">
                    <input type="text" placeholder="Foto" id="userFoto">
                </div> 

          
          </form>

              <div class="btn btn-success ooo" id="formBtn">Crear Nuevo Usuario</div>
        </div>
        <div class="col-md-3">
            <div class="limpiarBtn" id="limpiarBtn">X</div>
            <div id="resultados"></div>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-bordered table-hover">

                  <thead>
                    <tr>
                      <th id="reload">#</th>
                      <th>ID</th>
                      <th>Usuario</th>
                      <th>Password</th>
                      <th>Creado</th>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>Direccion</th>
                      <th>Email</th>
                      <th>Telefono</th>
                      <th>Foto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                
                  <tbody id="tableBody">

                  </tbody>
            </table>

        </div>        
    </div>
</div>

<script type="text/javascript">





function pintaUsers(){

  var request = $.ajax({
        url: "adminActions.php",
        method: "POST",
        data: { 
          act:"GETALL" 
        },
        dataType: "json" //porque es un dato de la BD con cierta estructura
      });
 
      request.done(function( msg ) {
          
          var losUsuarios=msg; //la matriz devuelta con toda la info de mi query
  
          var miTableBody=''; //string vacio que rellenaremos con la info de la matriz
  

  //recorremos el array que me ha devuelto mi consulta
              for(var i=0;i<losUsuarios.length;i++){
                
                //los botones de editar/borrar van a tener un numero "i" añadido a su id para que el click
                //de cada boton haga referencia a ese usuario concreto
                //en el "onclick" de los botones hacemos la llamada a las funciones editaUser/borraUser, y les
                //pasamos el id del usuario
                var editarBTN='<button class="btn btn-warning" onclick="editaUser(\''+losUsuarios[i].id+'\')" id="edita_'+losUsuarios[i].id+'">EDITAR</button>';
                var borrarBTN='<button class="btn btn-danger" onclick="borraUser(\''+losUsuarios[i].id+'\')" id="borra_'+losUsuarios[i].id+'">BORRAR</button>';

                    miTableBody+='<tr>';
                 
                    miTableBody+='<td>'+(i+1)+'</td>';
                    miTableBody+='<td>'+losUsuarios[i].id+'</td>';
                    miTableBody+='<td id="user_'+losUsuarios[i].id+'">'+losUsuarios[i].usuario+'</td>';
                    miTableBody+='<td id="pass_'+losUsuarios[i].id+'">'+losUsuarios[i].password+'</td>';
                    miTableBody+='<td>'+cleanFecha(losUsuarios[i].creado)+'</td>';

                    miTableBody+='<td id="nombre_'+losUsuarios[i].id+'">'+losUsuarios[i].nombre+'</td>';
                    miTableBody+='<td id="apellidos_'+losUsuarios[i].id+'">'+losUsuarios[i].apellidos+'</td>';
                    miTableBody+='<td id="direccion_'+losUsuarios[i].id+'">'+losUsuarios[i].direccion+'</td>';
                    miTableBody+='<td id="email_'+losUsuarios[i].id+'">'+losUsuarios[i].email+'</td>';
                    miTableBody+='<td id="telefono_'+losUsuarios[i].id+'">'+losUsuarios[i].telefono+'</td>';
                    miTableBody+='<td id="foto_'+losUsuarios[i].id+'">'+losUsuarios[i].foto+'</td>';
                    miTableBody+='<td>'+editarBTN +' ' + borrarBTN+'</td>';
                  

                    miTableBody+='</tr>';
              }
              
              $('#tableBody').html(miTableBody);


       
      });
 
      request.fail(function( jqXHR, textStatus ) {
          alert(textStatus);
        //alert( "Request failed : " + textStatus );
      });

}
//llamamos a la funcion aqui para que cargue la tabla
//esto me pinta la tabla al entrar a la pagina
pintaUsers();

function cleanFecha(lafecha){
  if(lafecha){
      var fechaen2=lafecha.split(' ');//[fecha,hora]
      var fechaEnPartes=fechaen2[0].split('-');//[a,m,d]
      var fechabien=fechaEnPartes.reverse();//[d,m,a
      var fFinal=fechabien.join('-');
      
      return fFinal +'  ' + fechaen2[1]; 
  }
}


function borraUser(userId){
  //alert('BORRANDO ID:' + userId);
      var request = $.ajax({
        url: "userActions.php",
        method: "POST",
        data: { 
          userId : userId,
          act:"DELETE" 
        },
        dataType: "html"
      });
 
      request.done(function( msg ) {
        //escribo el echo que me ha devuelto en #resultados
        $( "#resultados" ).html( msg );
        pintaUsers(); //refrescamos la base de datos por pantalla
      });
 
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
}

function editaUser(userId){
  //alert('EDITANDO ID:' + userId);
      
      //leemos de la tabla los valores del nombre/password y los guardamos
      var elPass=$('#pass_'+userId).html();
      var elUser=$('#user_'+userId).html();
      var elNombre=$('#nombre_'+userId).html();
      var losApellidos=$('#apellidos_'+userId).html();
      var laDireccion=$('#direccion_'+userId).html();
      var elEmail=$('#email_'+userId).html();
      var elTelefono=$('#telefono_'+userId).html();
      var laFoto=$('#foto_'+userId).html();

      //cambiamos el aspecto del boton del formulario,porque ahora estamos editando,no creando
      $('#formBtn').html('actualizar usuario'); //cambiamos el texto al boton
      $('#formBtn').removeClass('btn-success'); //color verde,eliminamos
      $('#formBtn').addClass('btn-warning'); //color naranja,añadimos
      //los fijamos en el formulario de nuevo
      //ponemos el valor leido de la tabla en los dos input
      $('#userPass').val(elPass);
      $('#userName').val(elUser);

      $('#userNombre').val(elNombre);
      $('#userApellidos').val(losApellidos);
      $('#userDireccion').val(laDireccion);
      $('#userEmail').val(elEmail);
      $('#userTelefono').val(elTelefono);
      $('#userFoto').val(laFoto);
      














      //quitamos el event listener del boton #formBtn, no queremos que tenga activo de momento
      //el evento que tiene asociado por defecto
      $('#formBtn').off('click');  

      //cuando hagamos click en el boton, ahora no va a "crear usuario",sino que va a ejecutar la funcion
      //updateUser, en la que vamos a tener la llamada ajax
      $('#formBtn').on('click',function(){
        updateUser(userId);
      });

      //alert(elUser+'-------->'+elPass);
}

function updateUser(uId){
  //alert('actualizando EL USER ' + $('#userName').val() + 'con password ' + $('#userPass').val() + ' e ID: ' + uId);
  
  var request = $.ajax({
        url: "adminActions.php",
        method: "POST",
        data: { 
          uId : uId,
          uName : $('#userName').val(),
          uPass : $('#userPass').val(),
          uNombre : $('#userNombre').val(),
          uApellidos : $('#userApellidos').val(),
          uDireccion : $('#userDireccion').val(),
          uEmail : $('#userEmail').val(),
          uTelefono : $('#userTelefono').val(),
          uFoto : $('#userFoto').val(),










          act:"UPDATE_ADMIN" 
        },
        dataType: "html"
      });
 
      request.done(function( msg ) {
        
        $( "#resultados" ).html( msg );
        //volvemos a hacer que el formulario inserte en vez de update
        $('#formBtn').off('click');
        $('#formBtn').on('click',function(){
          readForm();
        });
        //limpiamos los imputs
         $('#userName').val('');
         $('#userPass').val('');
         //el boton verde y texto antiguo
         $('#formBtn').html('registrar usuario');
        $('#formBtn').removeClass('btn-warning'); //color verde
        $('#formBtn').addClass('btn-success'); //color naranja
         //pintamos los users
         //END
         pintaUsers();
      });

 
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });


}

 
function readForm(){

  if ($('#userName').val()) {
      var uName=$('#userName').val();

  }else{
    $('#resultados').html('el user esta vacio');
    return;
  }


  if ($('#userPass').val()) {
    var uPass=$('#userPass').val();


  }else{
    $('#resultados').html('el password esta vacio');
    return;
  }

  addUser(uName,uPass);
}

function addUser(u,p){

  //alert(u+'--->'+p);

  var request = $.ajax({
        url: "userActions.php",
        method: "POST",
        data: { 
          uName : u,
          uPass:p ,
          act:"INSERT"
        },
        dataType: "html"
      });
 
      request.done(function( msg ) {
        //pintamos el msg resultado
        $( "#resultados" ).html( msg );
        //limpiamos los imputs
        $('#userName').val('');
        $('#userPass').val('');
        //repintamos los users
        pintaUsers(); //refrescamos la base de datos por pantalla
      });
 
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
}



//al pinchar la 'X' el div resultados se borra
$('#limpiarBtn').on('click',function(){
  $('#resultados').html('');
});

//al dar al # se va a recargar la pagina se vuelven a 'pintar' los usuarios
$('#reload').on('click',function(){
  pintaUsers();
});


$('#formBtn').on('click',function(){
  readForm();
});
  


</script>

<?php
require_once ('footer.php');
?>


}