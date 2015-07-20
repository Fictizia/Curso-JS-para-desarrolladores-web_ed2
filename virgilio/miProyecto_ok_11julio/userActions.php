<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1); 
//require_once('check_session.php');
include 'funciones.php';  


    


//--------------------------------------------ZONA DE TRABAJO-------------------------------------------                                                


//GETALL3   comprobacion para "pintaTabla"
if(isset($_POST["act"]) && $_POST["act"]==='GETALL3'){            
    $resultado = tabla($mysqli);
    echo json_encode($resultado);
    return;
}

//UPDATE3   comprobacion para "pintaTabla"
  if(isset($_POST["act"]) && $_POST["act"]==='UPDATE3' &&  isset($_POST["registroId"]) &&  isset($_POST["uDistrito"]) &&  isset($_POST["uNombre"])){            
        $resultado = updateCampo($mysqli,$_POST["uDistrito"],$_POST["uNombre"],$_POST["registroId"]);
        echo 'USUARIO ACTUALIZADO -->'.$resultado;
      
    } 


 //DELETE
    if(isset($_POST["registroId"]) &&  isset($_POST["act"]) && $_POST["act"]==='DELETE3'){
        $resultado = deleteCampo($mysqli, $_POST["registroId"]);
        //devolvemos un mensaje de borrado correcto
        echo 'REGISTRO '.$_POST["registroId"].' BORRADO';
    }










//--------------------------------------------TODAS LAS OPCIONES------------------------------------------  

//GETALL   comprobacion para "pintaUsers"
        if(isset($_POST["act"]) && $_POST["act"]==='GETALL'){            
            $resultado = getAllUsers($mysqli);
            //como devuelve todos los datos(estructura compleja) hacemos json_encode
            echo json_encode($resultado);
            //echo "pasa el if";
        }

//UPDATE EN MIPERFIL.PHP

 if(isset($_POST["act"]) && $_POST["act"]==='UPDATE4' &&  isset($_POST["uId"]) &&  isset($_POST["uPass"]) &&  isset($_POST["uName"]) && isset($_POST["uEmail"]) && isset($_POST["uNombre"]) && isset($_POST["uApellidos"]) && isset($_POST["uDireccion"]) && isset($_POST["uTelefono"]) && isset($_POST["uBio"]) ){            
        $resultado = updateMiPerfil($mysqli,
            $_POST["uId"],
            $_POST["uName"],
            $_POST["uPass"],
            $_POST["uNombre"],
            $_POST["uApellidos"],
            $_POST["uDireccion"],
            $_POST["uEmail"],
            $_POST["uTelefono"],
            $_POST["uBio"]); 

 


        echo 'USUARIO ACTUALIZADO -->' .$resultado;
        //print_r($_POST);
        
      
    }










    //DELETE
    if(isset($_POST["userId"]) &&  isset($_POST["act"]) && $_POST["act"]==='DELETE'){
        $resultado = deleteUser($mysqli, $_POST["userId"]);
        //devolvemos un mensaje de borrado correcto
        echo 'USUARIO '.$_POST["userId"].' BORRADO';
    }

    if(isset($_POST["act"]) && $_POST["act"]==='UPDATE' &&  isset($_POST["uId"]) &&  isset($_POST["uPass"]) &&  isset($_POST["uName"])){            
        $resultado = updateUser($mysqli,$_POST["uName"],$_POST["uPass"],$_POST["uId"]);
        echo 'USUARIO ACTUALIZADO -->'.$resultado;
      
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
