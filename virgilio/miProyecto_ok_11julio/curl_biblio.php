<?php
//require_once("../conexion/conn.php"); 
include 'funciones.php'; 
//$url = "http://datos.madrid.es/portal/site/egob/menuitem.c05c1f754a33a9fbe4b2e4b284f1a5a0/?vgnextoid=bec8611e09fd4410VgnVCM1000000b205a0aRCRD&vgnextchannel=374512b9ace9f310VgnVCM100000171f5a0aRCRD";

$url="http://datos.madrid.es/egob/catalogo/200077-1-zona-ser.csv";


//http://datos.madrid.es/egob/catalogo/200077-1-zona-ser.csv






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
        print_r($output); //me trae todo como un string--FUNCIONA

    /*
        //$Data = str_getcsv($CsvString, "\n"); usamos este ejemplo de base
        //usaremos str_getcsv porque el CSV me lo he traido como un string

        $datos1= str_getcsv($output,"\n"); //partimos todo el string por cada final de linea y me lo devuelve en un array
        //print_r($datos1); cada una de las posiciones del array contiene todos los campos


        
        $cabecera =  str_getcsv($datos1[0],";" ,'"', "\n"); //la primera fila era la correspondiente a la cabecera
        //print_r($cabecera);
        echo '<br>';
        //echo count($cabecera). ' elementos';

        
        echo '<br><br>';
        //$result[];


        for ($i=1; $i < count($datos1)-1; $i++) { 
          //echo 'FILA: '.$i.'<br>';
          $datos2= str_getcsv($datos1[$i],";" ,'"', "\n");  //me devuelve un array por cada una de las "lineas"c anteriores,con todas las celdas separadas por
          if(isset($datos2[1]) && $datos2[1] !== "" && isset($datos2[21]) && $datos2[21] !== "" && isset($datos2[24]) && $datos2[24] !== "" && isset($datos2[25]) && $datos2[25] !== "") {


            //inserDatosCsv($mysqli,$datos2[21], utf8_encode($datos2[1]) ,$datos2[24],$datos2[25]);
              
            
            
          }else{
            echo 'FALTAN DATOS';
          }
          echo '<hr>';


        }

       
       

     



















/*      
If you're going to use array_push() to insert a "$key" => "$value" pair into an array, it can be done using the following:

    $data[$key] = $value;

It is not necessary to use array_push.













        //echo count($datos2). ' elementos';
        //echo $datos[1];


/*   ESTO TE DA EL CSV EN UN ARRAY MULTIDIMENSIONAL $misResult[fila][campo]
        $cabecera =  str_getcsv($datos1[0],";" ,'"', "\n"); //la primera fila era la correspondiente a la cabecera
        print_r($cabecera);
        echo '<br>';
        //echo count($cabecera). ' elementos';

        $resultadoEnArray = [];

        echo '<br><br>';
        for ($i=1; $i < count($datos1)-1; $i++) { 

          $resultadoEnArray[] = str_getcsv($datos1[$i],";" ,'"', "\n");
        }
          
          print_r($resultadoEnArray); 






*/

?>