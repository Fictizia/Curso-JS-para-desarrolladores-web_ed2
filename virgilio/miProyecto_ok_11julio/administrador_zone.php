<?php
//session_start(); ya no hace falta porque la sesion esta iniciada
require_once('check_session.php'); 
//sin pageTitle NO FUNCIONA!!!!!!!!!!!
$pageTitle='Zona de administración del sistema'; 
require_once('head.php');
require_once('menu_administrador.php');    
include 'funciones.php';  
?>

<div class="container">
   	<div class="row"> 
       <div class="col-md-4">

       	    <h2>
		      Zona de administración de la aplicacion
		    </h2>
		    <div>
		    Bienvenido administrador:  <?php echo $_SESSION['userName']; ?>
		    </div>

       </div>

   	</div>
</div>


<div class="container">
    <div class="row">
        <div class="col-md-8">
              <h3>Creación de nuevos Usuarios</h3>
          <form class="form-horizontal">    
            

                <div class="form-group has-warning col-xs-8">
                    <input type="text" class="form-control" placeholder="Nombre de usuario" id="userName">
                    <input type="text" class="form-control" placeholder="Password" id="userPass">
                    <input type="text" class="form-control" placeholder="Nombre" id="userNombre">
                    <input type="text" class="form-control" placeholder="Apellidos" id="userApellidos">
                    <input type="text" class="form-control" placeholder="Direccion" id="userDireccion">
                    <input type="text" class="form-control" placeholder="Email" id="userEmail">
                    <input type="text" class="form-control" placeholder="Telefono" id="userTelefono">
                    <input type="text" class="form-control" placeholder="Foto" id="userFoto">
                    <br>
                    <div class="btn btn-success ooo" id="formBtn">Crear Nuevo Usuario</div>
                </div> 

          <textarea class="form-control" rows="5"></textarea>
          </form>

              
        </div>
        <div class="col-md-4">
            <div class="limpiarBtn" id="limpiarBtn">X</div>
            <label for="resultados">INFO</label>
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
                      <th>Biografía</th>
                      
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



function pintaUsers2(){

  var request = $.ajax({
        url: "adminActions.php",
        method: "POST",
        data: { 
          act:"GETALL" 
        },
        dataType: "json" //porque es un dato de la BD con cierta estructura
      });
 

      request.done(function( msg ) {
          
          //var miTableBody=''; //string vacio que rellenaremos con la info de la matriz
          $('#tableBody').html('');

          var losUsuarios=msg; //la matriz devuelta con toda la info de mi query
  
          

              //recorremos el array que me ha devuelto mi consulta
              for(var i=0;i<losUsuarios.length;i++){
                
                var miTableRow=''; //ahora lo haremos fila a fila
                var fid=losUsuarios[i].id; 

                var editarBTN='<button class="btn btn-warning" id="edita_'+losUsuarios[i].id+'">EDITAR</button>';
                var borrarBTN='<button class="btn btn-danger" id="borra_'+losUsuarios[i].id+'">BORRAR</button>';

                    miTableRow+='<tr>';
                 
                    miTableRow+='<td>'+(i+1)+'</td>';
                    miTableRow+='<td>'+losUsuarios[i].id+'</td>';
                    miTableRow+='<td id="user_'+losUsuarios[i].id+'">'+losUsuarios[i].usuario+'</td>';
                    miTableRow+='<td id="pass_'+losUsuarios[i].id+'">'+losUsuarios[i].password+'</td>';
                    miTableRow+='<td>'+cleanFecha(losUsuarios[i].creado)+'</td>';

                    miTableRow+='<td id="nombre_'+losUsuarios[i].id+'">'+losUsuarios[i].nombre+'</td>';
                    miTableRow+='<td id="apellidos_'+losUsuarios[i].id+'">'+losUsuarios[i].apellidos+'</td>';
                    miTableRow+='<td id="direccion_'+losUsuarios[i].id+'">'+losUsuarios[i].direccion+'</td>';
                    miTableRow+='<td id="email_'+losUsuarios[i].id+'">'+losUsuarios[i].email+'</td>';
                    miTableRow+='<td id="telefono_'+losUsuarios[i].id+'">'+losUsuarios[i].telefono+'</td>';
                    miTableRow+='<td id="foto_'+losUsuarios[i].id+'">'+losUsuarios[i].foto+'</td>';
                    miTableRow+='<td id="bio_'+losUsuarios[i].id+'">'+losUsuarios[i].bio+'</td>';
                    miTableRow+='<td>'+editarBTN +' ' + borrarBTN+'</td>';
                  

                    miTableRow+='</tr>';
                    $('#tableBody').append(miTableRow);
              
              
              

              //despues añado los eventos del boton editar y borrar
              $('#edita_'+fid).on('click',{fid:fid},function(e){ //"e" es el evento
                editaUser2(e.data.fid);
                console.log(e);
              });

              $('#borra'+fid).on('click',{fid:fid},function(e){ // guardamos el identificador "fid" dentro del evento
                borraUser2(e.data.fid);
              });

            }
        });
             
              console.log('todo pintado');

       

      request.fail(function( jqXHR, textStatus ) {
          alert(textStatus);
        //alert( "Request failed : " + textStatus );
      });

}
//llamamos a la funcion aqui para que cargue la tabla
//esto me pinta la tabla al entrar a la pagina
pintaUsers2();






function borraUser2(userId2){
  //alert('BORRANDO ID:' + userId2);
      var request = $.ajax({
        url: "adminActions.php",
        method: "POST",
        data: { 
          userId2 : userId2,
          act:"DELETE" 
        },
        dataType: "html"
      });
 
      request.done(function( msg ) {
        //escribo el echo que me ha devuelto en #resultados
        $( "#resultados" ).html( msg );
        pintaUsers2(); //refrescamos la base de datos por pantalla
      });
 
      request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
      });
}



function editaUser2(userId2){
 
  $('#edita_'+userId2).html('GUARDAR CAMBIOS'); //cambiamos texto del boton

  $('#user_'+userId2).attr('contenteditable','true'); //con "contenteditable" podemos modificar campos
  $('#pass_'+userId2).attr('contenteditable','true');
  $('#nombre_'+userId2).attr('contenteditable','true');
  $('#apellidos_'+userId2).attr('contenteditable','true');
  $('#direccion_'+userId2).attr('contenteditable','true');
  $('#email_'+userId2).attr('contenteditable','true');
  $('#telefono_'+userId2).attr('contenteditable','true');
  $('#foto_'+userId2).attr('contenteditable','true');

  // quita cualquier evento en el elemento,para no ejecutar el que tiene por defecto
  $('#edita_'+userId2).off('click');
  // ponemos el nuevo evento para que haga update
  $('#edita_'+userId2).on('click',function(){
    updateUser2(userId2);
  });


}



function updateUser2(userId2){

  //alert('actualizando EL USER ' + $('#userName').val() + 'con password ' + $('#userPass').val() + ' e ID: ' + uId);
  
//console.log(getUpdateData(userId2));

  var request = $.ajax({
        url: "adminActions.php",
        method: "POST",
        data: getUpdateData(userId2),  //pasamos como dato lo que nos devuelve getUpdateData
        dataType: "html"
      });
 
      request.done(function( msg ) {
      console.log(msg);
      pintaUsers2();
      });

 
      request.fail(function( jqXHR, textStatus ) {
        alert('aqui2');
        alert( "Request failed: " + textStatus );
      });


}



//funcion que recoge los datos modificados y los manda a la BD
function getUpdateData(userId2){

    return{
    uName: $('#user_'+userId2).html(),
    uPass: $('#pass_'+userId2).html(),
    uNombre: $('#nombre_'+userId2).html(),
    uApellidos: $('#apellidos_'+userId2).html(),
    uDireccion: $('#direccion_'+userId2).html(),
    uEmail: $('#email_'+userId2).html(),
    uTelefono: $('#telefono_'+userId2).html(),
    uFoto: $('#foto_'+userId2).html(),
    uBio: $('#bio_'+userId2).html(),
    

    userId:userId2,
    act:'UPDATE_ADMIN'
  };


}


























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











<?php
require_once ('footer.php');
?>
