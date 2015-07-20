<?php
require_once('check_session.php');
    include 'funciones.php';  


    //GETALL   comprobacion para "pintaUsers2"
        if(isset($_POST["act"]) && $_POST["act"]==='GETALL'){            
            $resultado = getAllUsers($mysqli);
            //como devuelve todos los datos(estructura compleja) hacemos json_encode
            echo json_encode($resultado);
        }










    if(isset($_POST["act"]) && $_POST["act"]==='UPDATE_ADMIN' &&  isset($_POST["userId"]) &&  isset($_POST["uPass"]) &&  isset($_POST["uName"]) &&  isset($_POST["uNombre"]) &&  isset($_POST["uApellidos"]) &&  isset($_POST["uDireccion"]) &&  isset($_POST["uEmail"])  &&  isset($_POST["uTelefono"]) &&  isset($_POST["uFoto"]) &&  isset($_POST["uBio"]) ){            
        $resultado = updateUser_Admin($mysqli,$_POST["uName"],$_POST["uPass"],$_POST["userId"],$_POST["uNombre"],$_POST["uApellidos"],$_POST["uDireccion"],$_POST["uEmail"],$_POST["uTelefono"],$_POST["uFoto"],$_POST["uBio"] );
        echo 'USUARIO ACTUALIZADO -->'.$resultado;
      
    } 























//GETALL3   comprobacion para "pintaTabla"
        if(isset($_POST["act"]) && $_POST["act"]==='GETALL3'){            
            $resultado = tabla($mysqli);
            //como devuelve todos los datos(estructura compleja) hacemos json_encode
            echo json_encode($resultado);
        }


//UPDATE3   comprobacion para "pintaTabla"
  if(isset($_POST["act"]) && $_POST["act"]==='UPDATE3' &&  isset($_POST["registroId"]) &&  isset($_POST["uDistrito"]) &&  isset($_POST["uNombre"])){            
        $resultado = updateUser3($mysqli,$_POST["uDistrito"],$_POST["uNombre"],$_POST["registroId"]);
        echo 'USUARIO ACTUALIZADO -->'.$resultado;
      
    } 



//nueva funcion update4

 if(isset($_POST["act"]) && $_POST["act"]==='UPDATE4' &&  isset($_POST["uId"]) &&  isset($_POST["uPass"]) &&  isset($_POST["uName"]) && isset($_POST["uEmail"]) && isset($_POST["uNombre"]) && isset($_POST["uApellidos"]) && isset($_POST["uDireccion"]) && isset($_POST["uTelefono"])          ){            
        $resultado = updateMiPerfil($mysqli,
            $_POST["uId"],
            $_POST["uName"],
            $_POST["uPass"],
            $_POST["uNombre"],
            $_POST["uApellidos"],
            $_POST["uDireccion"],
            $_POST["uEmail"],
            $_POST["uTelefono"]); 




        echo 'USUARIO ACTUALIZADO -->' .$resultado;
        //print_r($_POST);
        
      
    }










    //DELETE
    if(isset($_POST["userId"]) &&  isset($_POST["act"]) && $_POST["act"]==='DELETE'){
        $resultado = deleteUser($mysqli, $_POST["userId"]);
        //devolvemos un mensaje de borrado correcto
        echo 'USUARIO '.$_POST["userId"].' BORRADO';
    }







    if(isset($_POST["act"]) && $_POST["act"]==='INSERT' &&  isset($_POST["uPass"]) &&  isset($_POST["uName"])){            
        $resultado = insertUser($mysqli,$_POST["uName"],$_POST["uPass"]);
        echo 'USUARIO INSERTADO -->'.$resultado;
      
    } 



//updateUser2 de casa
/*
    if(isset($_POST["email"]) && ($_POST["email"] !=="") && isset($_POST["bio"]) && ($_POST["bio"] !=="") && isset($_POST["usuario"]) && ($_POST["usuario"] !=="") && isset($_POST["password"]) && ($_POST["password"] !=="")){
          
      $resultado = updateUser2($mysqli,$_POST["usuario"],$_POST["password"],$_POST["email"],$_POST["bio"],$_SESSION['userId']);
}
*/




//nueva funcion update2

 if(isset($_POST["act"]) && $_POST["act"]==='UPDATE2' &&  isset($_POST["uId"]) &&  isset($_POST["uPass"]) &&  isset($_POST["uName"]) && isset($_POST["uEmail"]) && isset($_POST["uBio"])){            
        $resultado = updateUser2($mysqli,
            $_POST["uName"],
            $_POST["uPass"],
            $_POST["uEmail"],
            $_POST["uBio"],
            $_POST["uId"]); 




        echo 'USUARIO ACTUALIZADO -->' .$resultado;
        //print_r($_POST);
        
      
    }

//miniupdate caso 'usuario'
if(isset($_POST["act"]) && $_POST["act"]==='MINIUPDATE' &&  isset($_POST["uId"]) &&  isset($_POST["campo"]) &&  isset($_POST["valor"])){            
        
        //print_r($_POST); funciona!!!!!!!

        $resultado = updateusersetcampolikevalorwhereid($mysqli,
            $_POST["campo"],
            $_POST["valor"],
            $_POST["uId"]); 

        if ($_POST["campo"] === 'userFoto') { ////el error esta aqui!!!!!!!
            echo $_POST["valor"];
        }else{
            echo 'ACTUALIZADO FAST -->' .$_POST["campo"] .' --> '. $_POST["valor"];
        } 
        //print_r($_POST);  muy util!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
    }




?>
