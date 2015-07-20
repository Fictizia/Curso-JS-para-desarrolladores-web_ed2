<?php

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);
require_once("conexion/conn.php"); 
//echo $msg;
//echo "<br>";



function getIconos($dbObject){  
                                

      $stmt=$dbObject->prepare("SELECT * FROM iconos");//sentencia preparada
      $stmt->execute(); //ejecutamos la sql y a continuacion
      $stmt->bind_result($id,$nombre,$url); //mapeado


      while ($stmt->fetch()){  
      $iconos[]= array('id'=>$id,'nombre'=>$nombre,'url'=>$url);
      
      }

       if (isset($iconos) && isset($iconos[0])) {
           
            return json_encode($iconos); 
            //return $iconos;
      }else{
            //FAIL DATA no cuadra ERROR
            echo 'ERROR EN LA GALERIA';
      }


      $stmt->close(); 
}



function getCoordinates($dbObject){  
                                

      $stmt=$dbObject->prepare("SELECT * FROM pruebaleercsv");//sentencia preparada
      $stmt->execute(); //ejecutamos la sql y a continuacion
      $stmt->bind_result($id,$distrito,$nombre,$latitud,$longitud); //mapeado


      while ($stmt->fetch()){  
      $puntos[]= array('id'=>$id,'distrito'=>$distrito,'nombre'=>$nombre,'latitud'=>$latitud,'longitud'=>$longitud);
      
      }

       if (isset($puntos) && isset($puntos[0])) {
           
            return json_encode($puntos); 
      }else{
            //FAIL DATA no cuadra ERROR
            echo 'ERROR';
      }


      $stmt->close(); 
}


//-----------------------------------------FUNCIONES PARA SANITIZAR----------------------------------------------
#funciones añadidas para sanear el html que introducimos en php
function clean($data){
      return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

#funciones añadidas para evitar inyecciones de SQL
function cleanSQL($data,$mysqli){  //respetar ese orden al pasar los parametros en la llamada a la función
      return mysqli_real_escape_string($mysqli,$data);  //el orden aqui si importa porque es el que nos da la especificación de PHP
}

//-----------------------------------------CURL.PHP----------------------------------------------

function inserDatosCsv($dbObject,$distrito_,$nombre_,$latitud_,$longitud_){


      $query="INSERT INTO pruebaleercsv (distrito,nombre,latitud,longitud) VALUES (?,?,?,?)";
      $stmt=$dbObject->prepare($query);
                        //$stmt->param('isss',NULL,$uName,$uPass,NULL); asi tambien funciona
      $stmt->bind_param('ssdd',$distrito,$nombre,$latitud,$longitud); 


      $distrito=cleanSQL($distrito_,$dbObject);
      $nombre=cleanSQL($nombre_,$dbObject);    
      $latitud=cleanSQL($latitud_,$dbObject);   
      $longitud=cleanSQL($longitud_,$dbObject);


      $stmt->execute();

      $elIdDeLaFilaInsertada=$stmt->insert_id; //MUY UTIL!!!!!!!!!! tener el ID de la fila insertada

      $stmt->close();     

      return $elIdDeLaFilaInsertada;
}


function curlcsv(){

      function inserDatosCsv2($dbObject,$distrito_,$nombre_,$latitud_,$longitud_){


            $query="INSERT INTO pruebaleercsv (distrito,nombre,latitud,longitud) VALUES (?,?,?,?)";
            $stmt=$dbObject->prepare($query);
                              //$stmt->param('isss',NULL,$uName,$uPass,NULL); asi tambien funciona
            $stmt->bind_param('ssdd',$distrito,$nombre,$latitud,$longitud); 


            $distrito=cleanSQL($distrito_,$dbObject);
            $nombre=cleanSQL($nombre_,$dbObject);    
            $latitud=cleanSQL($latitud_,$dbObject);   
            $longitud=cleanSQL($longitud_,$dbObject);


            $stmt->execute();

            $elIdDeLaFilaInsertada=$stmt->insert_id; //MUY UTIL!!!!!!!!!! tener el ID de la fila insertada

            $stmt->close();     

            return $elIdDeLaFilaInsertada;
      }
$url = "http://datos.madrid.es/portal/site/egob/menuitem.ac61933d6ee3c31cae77ae7784f1a5a0/?vgnextoid=00149033f2201410VgnVCM100000171f5a0aRCRD&format=csv&file=0&filename=200304-0-centros-culturales&charset=ISO-8859-1&mgmtid=fc8a034270603410VgnVCM1000000b205a0aRCRD";
 
        // create curl resource 
        $ch = curl_init(); 
        // set url 
        curl_setopt($ch, CURLOPT_URL, $url); 
        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        // $output contains the output string 
        $output = curl_exec($ch); 
        // close curl resource to free up system resources 
        curl_close($ch);

        $datos1= str_getcsv($output,"\n"); //partimos todo el string por cada final de linea y me lo devuelve en un array
        //print_r($datos1); cada una de las posiciones del array contiene todos los campos

        $cabecera =  str_getcsv($datos1[0],";" ,'"', "\n"); //la primera fila era la correspondiente a la cabecera
      
     
        for ($i=1; $i < count($datos1)-1; $i++) { 
          $datos2= str_getcsv($datos1[$i],";" ,'"', "\n");  //me devuelve un array por cada una de las "lineas"c anteriores,con todas las celdas separadas por
          if(isset($datos2[1]) && $datos2[1] !== "" && isset($datos2[21]) && $datos2[21] !== "" && isset($datos2[24]) && $datos2[24] !== "" && isset($datos2[25]) && $datos2[25] !== "") {


            inserDatosCsv2($mysqli,$datos2[21], utf8_encode($datos2[1]) ,$datos2[24],$datos2[25]);
              
          }else{
            echo 'FALTAN DATOS';
          }
          echo '<hr>';

        }

}











//-----------------------------------------INDEX.PHP ----------------------------------------------

//funcion para hacer LOGIN en la aplicacion
function comprobar($dbObject,$usuario,$password){  
                                
      $query="SELECT * FROM `usuarios` WHERE `usuario` LIKE '".$usuario."' AND `password` LIKE '".$password."' LIMIT 1";
      $stmt=$dbObject->prepare($query);
      $stmt->execute(); 
      $stmt->bind_result($id,$usuario,$password,$creado,$nombre,$apellido,$direccion,$email,$telefono,$foto,$bio); 
      //$count=0;



      
      while ($stmt->fetch()){  
             $user[]= array('id'=>$id, 'usuario'=>$usuario,'password'=>$password,'creado'=>$creado,'nombre'=>$nombre,'apellidos'=>$apellidos,'direccion'=>$direccion,'email'=>$email,'telefono'=>$telefono,'foto'=>$foto,'bio'=>$bio);
      }//acaba de crear un array asociativo



      
      if (isset($user) && isset($user[0])) {
            //estabas en la base de datos
            //creo la sesion y te redirijo al inicio
            //return 1 no introducimos más informacion para no onsumir recursos
            //en funciones.js-request(done) es donde haremos las acciones que 
            //nos interesen NO AQUI!!!!!!!
            return $user; //ahora devolvemos la fila de la base de datos con la informacion de ese user
      }else{
            //FAIL DATA no cuadra ERROR
            return 0;
      }


      $stmt->close(); 
      
      
} 



//-----------------------------------------NUEVO_USUARIO.PHP  ----------------------------------------------

//FUNCIONES ESPECIFICAS PARA EL PROYECTO
function UsuarioYaCreado($dbObject,$usuario){  
    
                                
      $query="SELECT * FROM `usuarios` WHERE `usuario` LIKE '".$usuario."' LIMIT 1";
      $stmt=$dbObject->prepare($query);
      $stmt->execute(); 
      $stmt->bind_result($id,$usuario,$password,$creado,$nombre,$apellidos,$direccion,$email,$telefono,$foto); 
      //$count=0;



      
      while ($stmt->fetch()){  
            $user[]= array('id'=>$id, 'usuario'=>$usuario,'password'=>$password,'creado'=>$creado,'nombre'=>$nombre,'apellidos'=>$apellidos,'direccion'=>$direccion,'email'=>$email,'telefono'=>$telefono,'foto'=>$foto);
      }//acaba de crear un array asociativo



      
      if (isset($user) && isset($user[0])) {
            //en caso de exito quiere decir que ya hay un usuario registrado con ese nombre
            return 1; 
            //echo "1";
      }else{
            //echo "0";
            return 0;
      }


      $stmt->close(); 
      
      
} 
//UsuarioYaCreado($mysqli,"toni"); //NO FUNCIONA!!!!!!!!!!!!!!!!!

function crearUsuario($dbObject,$uName,$uPass,$uNombre,$uApellidos,$uDireccion,$uEmail,$uTelefono){


      $query="INSERT INTO usuarios (usuario,password,nombre,apellidos,direccion,email,telefono) VALUES (?,?,?,?,?,?,?)";
      $stmt=$dbObject->prepare($query);
                        //$stmt->param('isss',NULL,$uName,$uPass,NULL); asi tambien funciona
      $stmt->bind_param('sssssss',$user,$password,$nombre,$apellidos,$direccion,$email,$telefono); 
      
      
      $user=$_POST['user'];
      $password=$_POST["pass"];
      $nombre=$_POST["nombre_usuario"];
      $apellidos=$_POST["apellidos_usuario"];
      $direccion=$_POST["direccion"];
      $email=$_POST["email"];
      $telefono=$_POST["telefono"];

      $stmt->execute();

      $elIdDeLaFilaInsertada=$stmt->insert_id; //MUY UTIL!!!!!!!!!! tener el ID de la fila insertada

      $stmt->close();     

      return "se ha creado correctamente el uauario ".$elIdDeLaFilaInsertada;
}
 //crearUsuario($mysqli,"toni","b","b","b","b","b","b");  FUNCIONA





//-----------------------------------------ZONA_TRABAJO.PHP ----------------------------------------------
     
//DE MOMENTO NO ACTIVAMOS LA OPCION DE INSERTAR NUEVOS DATOS GEOGRAFICOS A MANO
/*
function actualizaCampos($dbObject){


      $query="INSERT INTO pruebaleercsv (nombre,distrito,latitud,longitud) VALUES (?,?,?,?)";
      $stmt=$dbObject->prepare($query);
                        //$stmt->param('isss',NULL,$uName,$uPass,NULL); asi tambien funciona
      $stmt->bind_param('ssff',$nombre,$distrito,$latitud,$longitud); 

      foreach ($result as $dato) { 

            $nombre=$dato['nombre'];
            $distrito=$dato['distrito'];
            $latitud=$dato['latitud'];
            $longitud=$dato['longitud'];


            $stmt->execute();
      }

      //$elIdDeLaFilaInsertada=$stmt->insert_id; //MUY UTIL!!!!!!!!!! tener el ID de la fila insertada

      $stmt->close();     

      //return $elIdDeLaFilaInsertada;
}
*/

//devuelve un select con todos los datos a pintar
function tabla($dbObject){  
                                
      $query="SELECT * FROM `pruebaleercsv`";
      $stmt=$dbObject->prepare($query);
      $stmt->execute();
      $stmt->bind_result($id,$distrito,$nombre,$latitud,$longitud); 
      //$count=0;

      
      while ($stmt->fetch()){  
            $registros[]= array('id'=>$id,'distrito'=>$distrito,'nombre'=>$nombre,'latitud'=>$latitud,'longitud'=>$longitud);
      }
      //acaba de crear un array asociativo


      if (isset($registros) && isset($registros[0])) {
           
            return $registros; 
      }else{
            //FAIL DATA no cuadra ERROR
            return 0;
      }


      $stmt->close(); 
      
      
} 

//borra el campo seleccionado
function deleteCampo($dbObject,$registroId){
      //"DELETE FROM `usuarios` WHERE `id` = ????"


      $query="DELETE FROM `pruebaleercsv` WHERE `id`=".$registroId;
      $stmt=$dbObject->prepare($query);
      $stmt->execute(); 

      $stmt->close();     

}

//actualiza los cambios de un campo
function updateCampo($dbObject,$uDistrito,$uNombre,$registroId){


      $query="UPDATE pruebaleercsv SET distrito=? ,nombre=? WHERE id=?";
      $stmt=$dbObject->prepare($query);
      $stmt->bind_param('ssi',$distr,$nombr,$id); 
      $distr=$uDistrito;
      $nombr=$uNombre;
      $id=$registroId;
      $stmt->execute();

      $filasAfectadas=$stmt->affected_rows;

      $stmt->close();     

      return $filasAfectadas;
}








//-----------------------------------------PERFIL.PHP ----------------------------------------------

//funcion que me devuelve mis datos para pintarlos automaticamente al entrar en miPeril
function pintaMiPerfil($dbObject,$usuario,$password){  
                                
      $query="SELECT * FROM `usuarios` WHERE `usuario` LIKE '".$usuario."' AND `password` LIKE '".$password."' LIMIT 1";
      $stmt=$dbObject->prepare($query);
      $stmt->execute(); 
      $stmt->bind_result($id,$usuario,$password,$creado,$nombre,$apellidos,$direccion,$email,$telefono,$foto,$bio); 
      //$count=0;

      while ($stmt->fetch()){  
             $user[]= array('id'=>$id, 'usuario'=>$usuario,'password'=>$password,'creado'=>$creado,'nombre'=>$nombre,'apellidos'=>$apellidos,'direccion'=>$direccion,'email'=>$email,'telefono'=>$telefono,'foto'=>$foto,'bio'=>$bio);
      }//acaba de crear un array asociativo
      
      if (isset($user) && isset($user[0])) {
            //estabas en la base de datos
            //creo la sesion y te redirijo al inicio
            //return 1 no introducimos más informacion para no onsumir recursos
            //en funciones.js-request(done) es donde haremos las acciones que 
            //nos interesen NO AQUI!!!!!!!
            return $user; //ahora devolvemos la fila de la base de datos con la informacion de ese user
      }else{
            //FAIL DATA no cuadra ERROR
            return 0;
      }


      $stmt->close(); 
      
      
} 


function updateMiPerfil($dbObject,$uId,$uName,$uPass,$uNombre,$uApellidos,$uDireccion,$uEmail,$uTelefono,$uBio){


      $query="UPDATE usuarios SET usuario=? ,password=? ,nombre=? ,apellidos=? ,direccion=? ,email=? ,telefono=?  ,BIO=?WHERE id=?";
      $stmt=$dbObject->prepare($query);
      $stmt->bind_param('issssss',$id,$user,$pass,$nombre,$apellidos,$direccion,$email,$telefono,$bio); 

      $id=$uId;
      $user=$uName;
      $pass=$uPass;
      $nombre=$uNombre;
      $apellidos=$uApellidos;
      $direccion=$uDireccion;
      $email=$uEmail;
      $telefono=$uTelefono;
      $bio=$uBio;
      
      

      $stmt->execute();

      $filasAfectadas=$stmt->affected_rows;

      $stmt->close();     

      return $filasAfectadas;
}

//-----------------------------------------PERFIL.PHP ----------------------------------------------
//-----------------------------------------PERFIL.PHP ----------------------------------------------
//-----------------------------------------PERFIL.PHP ----------------------------------------------










function getAllUsers($dbObject){  
                                
      $query="SELECT * FROM `usuarios`";
      $stmt=$dbObject->prepare($query);
      $stmt->execute(); 
      $stmt->bind_result($id,$usuario,$password,$creado,$nombre,$apellidos,$direccion,$email,$telefono,$foto,$bio); 
      //$count=0;



      
      while ($stmt->fetch()){  
            $user[]= array('id'=>$id, 'usuario'=>$usuario,'password'=>$password,'creado'=>$creado,'nombre'=>$nombre,'apellidos'=>$apellidos,'direccion'=>$direccion,'email'=>$email,'telefono'=>$telefono,'foto'=>$foto,'bio'=>$bio);
      }
      //acaba de crear un array asociativo



      
      if (isset($user) && isset($user[0])) {
           
            return $user; 
      }else{
            //FAIL DATA no cuadra ERROR
            return 0;
      }


      $stmt->close(); 
      
      
} 

function getAllUsers3($dbObject){  
                                
      $query="SELECT * FROM `pruebaleercsv`";
      $stmt=$dbObject->prepare($query);
      $stmt->execute(); 
      $stmt->bind_result($id,$distrito,$nombre,$latitud,$longitud); 
      //$count=0;



      
      while ($stmt->fetch()){  
            $fila[]= array('id'=>$id, 'distrito'=>$distrito,'nombre'=>$nombre,'latitud'=>$latitud,'longitud'=>$longitud);
      }
      //acaba de crear un array asociativo



      
      if (isset($fila) && isset($fila[0])) {
           
            return $fila; 
      }else{
            //FAIL DATA no cuadra ERROR
            return 0;//fila
      }


      $stmt->close(); 
      
      
} 

function updateUser3($dbObject,$uDistrito,$uNombre,$registroId){


      $query="UPDATE pruebaleercsv SET distrito=? ,nombre=? WHERE id=?";
      $stmt=$dbObject->prepare($query);
      $stmt->bind_param('ssi',$distr,$nombr,$id); 
      $distr=$uDistrito;
      $nombr=$uNombre;
      $id=$registroId;
      $stmt->execute();

      $filasAfectadas=$stmt->affected_rows;

      $stmt->close();     

      return $filasAfectadas;
}






function deleteUser($dbObject,$userId){
      //"DELETE FROM `usuarios` WHERE `id` = ????"


      $query="DELETE FROM `usuarios` WHERE `id`=".$userId;
      $stmt=$dbObject->prepare($query);
      $stmt->execute(); 

      $stmt->close();     

}

//deleteUser($mysqli,2);  borramos un usuario para ver que funciona


function updateUser_Admin($dbObject,$uName,$uPass,$userId,$uNombre,$uApellidos,$uDireccion,$uEmail,$uTelefono,$uFoto,$uBio){


      $query="UPDATE usuarios SET usuario=? ,password=? ,nombre=? ,apellidos=? ,direccion=? ,email=? ,telefono=? ,foto=? WHERE id=?";
      $stmt=$dbObject->prepare($query);
      $stmt->bind_param('ssiSSSSSS',$user,$pass,$id,$nombre,$apellidos,$direccion,$email,$telefono,$foto,$bio); 
      
      $user=$uName;
      $pass=$uPass;
      $id=$userId;
      $nombre=$uNombre;
      $apellidos=$uApellidos;
      $direccion=$uDireccion;
      $email=$uEmail;
      $telefono=$uTelefono;
      $foto=$uFoto;
      $bio=$uBio;







      $stmt->execute();

      $filasAfectadas=$stmt->affected_rows;

      $stmt->close();     

      return $filasAfectadas;
}
//updateUser($mysqli,'editaN','editaN',21);  funciona


function insertUser($dbObject,$uName,$uPass){


      $query="INSERT INTO usuarios (usuario,password) VALUES (?,?)";
      $stmt=$dbObject->prepare($query);
                        //$stmt->param('isss',NULL,$uName,$uPass,NULL); asi tambien funciona
      $stmt->bind_param('ss',$user,$password); 
      $user=$uName;
      $password=$uPass;
      $stmt->execute();

      $elIdDeLaFilaInsertada=$stmt->insert_id; //MUY UTIL!!!!!!!!!! tener el ID de la fila insertada

      $stmt->close();     

      return $elIdDeLaFilaInsertada;
}
//llamamos a la funcion para comprobar que funciona
//insertUsuer($mysqli,'jaghghhgime2','hhhjaime1234');





//actualiza SOLO el usuario de la sesion - funcion hecha en casa
/*function updateUser2($dbObject,$uUsuario,$uPassword,$uEmail,$uBio,$uId){


      $query="UPDATE usuarios SET usuario=? ,password=? ,email=? ,bio=?  WHERE id=?";
      $stmt=$dbObject->prepare($query);
      $stmt->bind_param('ssssi',$usuario,$password,$email,$bio,$id); 


      $email=$uEmail;
      $bio=$uBio;
      $usuario=$uUsuario;
      $password=$uPassword;
      $id=$uId;

      $stmt->execute();

      $filasAfectadas=$stmt->affected_rows;

      $stmt->close();     

      return $filasAfectadas;
}*/


// ESTO FUNCIONA!!!!updateUser2($mysqli,'virgi','123','CHANGE1','CHANGE2',41)
// ESTO FUNCIONA!!!!   updateUser2($mysqli,'selene','2015','dd@ff','aaaaaaaaa',4)

//la misma funcion updateUser2 de Jaime
function updateUser2($dbObject,$uName,$uPass,$uEmail,$uBio,$uId){


      $query="UPDATE usuarios SET usuario=? ,password=? ,email=? ,bio=?  WHERE id=?";
      $stmt=$dbObject->prepare($query);
      $stmt->bind_param('ssssi',$user,$pass,$email,$bio,$id); 


      $email=$uEmail;
      $bio=$uBio;
      $user=$uName;
      $pass=$uPass;
      $id=$uId;

      $stmt->execute();

      $filasAfectadas=$stmt->affected_rows;

      $stmt->close();     

      return $filasAfectadas;
}



//updateusersetcampolikevalorwhereid funcion que actualiza el perfil del usuario "campo a campo"
//asociaremos eventos tipo "onkeyup-onchange-onfocus" para actualizar cada campo

function updateusersetcampolikevalorwhereid($dbObject,$campo,$valor,$uId){

      //echo $_POST; comprobación

      $query="UPDATE usuarios SET $campo=? WHERE id=?";

      
      $stmt=$dbObject->prepare($query);
      $stmt->bind_param('si',$valor_,$id_); 
      //$campo_=$campo;
      $valor_=$valor;
      $id_=$uId;

      $stmt->execute();

      $filasAfectadas=$stmt->affected_rows;

      $stmt->close();     

      return $filasAfectadas;
}
//updateusersetcampolikevalorwhereid($mysqli,'usuario','virgi_4',7);







function crearUsuario_copia($dbObject,$uName,$uPass,$uNombre,$uApellidos,$uDireccion,$uEmail,$uTelefono){


      $query="INSERT INTO usuarios (usuario,password,nombre,apellidos,direccion,email,telefono) VALUES (?,?,?,?,?,?,?)";
      $stmt=$dbObject->prepare($query);
                        //$stmt->param('isss',NULL,$uName,$uPass,NULL); asi tambien funciona
      $stmt->bind_param('sssssss',$user,$password,$nombre,$apellidos,$direccion,$email,$telefono); 
      
      $user=$uName;
      $password=$uPass;
      $nombre=$uNombre;
      $apellidos=$uApellidos;
      $direccion=$uDireccion;
      $email=$uEmail;
      $telefono=$uTelefono;
      $stmt->execute();

      $elIdDeLaFilaInsertada=$stmt->insert_id; //MUY UTIL!!!!!!!!!! tener el ID de la fila insertada

      $stmt->close();     

      return $elIdDeLaFilaInsertada;
}
?>






