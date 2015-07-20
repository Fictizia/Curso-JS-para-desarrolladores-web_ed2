<?php
require_once("conexion/conn.php"); 
//echo $msg;
//echo "<br>";


#funciones añadidas para sanear el html que introducimos en php
function clean($data){
      return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

#funciones añadidas para evitar inyecciones de SQL
function cleanSQL($data,$mysqli){  //respetar ese orden al pasar los parametros en la llamada a la función
      return mysqli_real_escape_string($mysqli,$data);  //el orden aqui si importa porque es el que nos da la especificación de PHP
}


function getAlumnos($dbObject){  
                                

      $stmt=$dbObject->prepare("SELECT * FROM alumnos");//sentencia preparada
      $stmt->execute(); //ejecutamos la sql y a continuacion
      $stmt->bind_result($id,$nombre,$apellidos,$edad,$especialidad); //mapeado
      $count=0;

      while ($stmt->fetch()){  
      $alumnos[$count]= array('id'=>$id,'nombre'=>$nombre,'apellidos'=>$apellidos,'edad'=>$edad,'especialidad'=>$especialidad);
      $count=$count + 1;  
      }

      $stmt->close(); 
      #print_r($reservas);
      return $alumnos;
}




//comprobamos los datos del usuario
function comprobar($dbObject,$usuario,$password){  
                                
      $query="SELECT * FROM `usuarios` WHERE `usuario` LIKE '".$usuario."' AND `password` LIKE '".$password."' LIMIT 1";
      $stmt=$dbObject->prepare($query);
      $stmt->execute(); 
      $stmt->bind_result($id,$usuario,$password,$creado,$nombre,$apellidos,$direccion,$email,$telefono); 
      //$count=0;



      
      while ($stmt->fetch()){  
            $user[]= array('id'=>$id, 'usuario'=>$usuario,'password'=>$password,'creado'=>$creado,'nombre'=>$nombre,'apellidos'=>$apellidos,'direccion'=>$direccion,'email'=>$email,'telefono'=>$telefono);
      }//acaba de crear un array asociativo



      
      if (isset($user) && isset($user[0])) {
            
            return $user; 
      }else{
            //FAIL DATA no cuadra ERROR
            return 0;
      }


      $stmt->close(); 
      
      
} 




function getAllUsers($dbObject){  
                                
      $query="SELECT * FROM `usuarios`";
      $stmt=$dbObject->prepare($query);
      $stmt->execute(); 
      $stmt->bind_result($id,$usuario,$password,$creado); 
      //$count=0;



      
      while ($stmt->fetch()){  
            $user[]= array('id'=>$id, 'usuario'=>$usuario,'password'=>$password,'creado'=>$creado);
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

function deleteUser($dbObject,$userId){
      //"DELETE FROM `usuarios` WHERE `id` = ????"


      $query="DELETE FROM `usuarios` WHERE `id`=".$userId;
      $stmt=$dbObject->prepare($query);
      $stmt->execute(); 

      $stmt->close();     

}

//deleteUser($mysqli,2);  borramos un usuario para ver que funciona


function updateUser($dbObject,$uName,$uPass,$uId){


      $query="UPDATE usuarios SET usuario=? ,password=? WHERE id=?";
      $stmt=$dbObject->prepare($query);
      $stmt->bind_param('ssi',$user,$pass,$id); 
      $user=$uName;
      $pass=$uPass;
      $id=$uId;
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



//FUNCIONES ESPECIFICAS PARA EL PROYECTO
function UsuarioYaCreado($dbObject,$usuario,$password){  
                                
      $query="SELECT * FROM `usuarios` WHERE `usuario` LIKE '".$usuario."' AND `password` LIKE '".$password."' LIMIT 1";
      $stmt=$dbObject->prepare($query);
      $stmt->execute(); 
      $stmt->bind_result($id,$usuario,$password,$creado,$nombre,$apellidos,$direccion,$email,$telefono); 
      //$count=0;



      
      while ($stmt->fetch()){  
            $user[]= array('id'=>$id, 'usuario'=>$usuario,'password'=>$password,'creado'=>$creado,'nombre'=>$nombre,'apellidos'=>$apellidos,'direccion'=>$direccion,'email'=>$email,'telefono'=>$telefono);
      }//acaba de crear un array asociativo



      
      if (isset($user) && isset($user[0])) {
            //en caso de exito quiere decir que ya hay un usuario registrado con ese nombre
            return 1; 
      }else{
            
            return 0;
      }


      $stmt->close(); 
      
      
} 
function crearUsuario($dbObject,$uName,$uPass,$uNombre,$uApellidos,$uDireccion,$uEmail,$uTelefono){


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
 

