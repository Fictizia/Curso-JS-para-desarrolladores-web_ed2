<?php
require_once("conexion/conn.php"); 
include 'funciones.php'; 

//function curl_cargar(){

    //if ($nombre=='biblioteca') {
      //$url = "http://datos.madrid.es/portal/site/egob/menuitem.ac61933d6ee3c31cae77ae7784f1a5a0/?vgnextoid=00149033f2201410VgnVCM100000171f5a0aRCRD&format=csv&file=0&filename=200304-0-centros-culturales&charset=ISO-8859-1&mgmtid=fc8a034270603410VgnVCM1000000b205a0aRCRD";
    //}
        $url="http://datos.alcobendas.org/dataset/5e7777fa-a2e3-4843-a5e2-2c8864c1017c/resource/cdde2c42-7cb2-43a2-b1da-fe0265921f0f/download/paradasbus.json";
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
        //print_r($output); //me trae todo como un string--FUNCIONA

        
        //$Data = str_getcsv($CsvString, "\n"); usamos este ejemplo de base
        //usaremos str_getcsv porque el CSV me lo he traido como un string



print_r($output);



//$output2=json_encode($output);
//print_r($output2.latitude);


/*
$objson = json_decode($output, true);

foreach($objson AS $prop => $val) {
  echo '<br/>'. $prop .' - '. $val;
}
//else echo $file .' not exists'};

*/













  //$datos1= str_getcsv($output,"\n"); //partimos todo el string por cada final de linea y me lo devuelve en un array
        //print_r($datos1); cada una de las posiciones del array contiene todos los campos


        /*
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


            inserDatosCsv($mysqli,$datos2[21], utf8_encode($datos2[1]) ,$datos2[24],$datos2[25]);
              
            
          }else{
            echo 'FALTAN DATOS';
          }
          echo '<hr>';

        }


//}*/

?>