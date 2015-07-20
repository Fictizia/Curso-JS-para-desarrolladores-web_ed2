<?php
/*
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
        //print_r($output); //me trae todo como un string--FUNCIONA

		
        //$Data = str_getcsv($CsvString, "\n"); usamos este ejemplo de base
        //usaremos str_getcsv porque el CSV me lo he traido como un string

        $datos1= str_getcsv($output,"\n"); //partimos todo el string por cada final de linea y me lo devuelve en un array
		//print_r($datos1); cada una de las posiciones del array contiene todos los campos


        
        $cabecera =  str_getcsv($datos1[0],";" ,'"', "\n"); //la primera fila era la correspondiente a la cabecera
        print_r($cabecera);
        echo '<br>';
        //echo count($cabecera). ' elementos';

        
        echo '<br><br>';
        for ($i=1; $i < count($datos1)-1; $i++) { 
          echo 'FILA: '.$i.'<br>';
          $datos2= str_getcsv($datos1[$i],";" ,'"', "\n");  //me devuelve un array por cada una de las "lineas"c anteriores,con todas las celdas separadas por
          print_r($datos2); 
          echo '<hr>';


        }
		//echo count($datos2). ' elementos';
        //echo $datos[1];


  ESTO TE DA EL CSV EN UN ARRAY MULTIDIMENSIONAL $misResult[fila][campo]
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


 /*         
$fila = 1;
if (($gestor = fopen("aparcamientos_publicos.csv", "r")) !== FALSE) {
    while (($datos = fgetcsv($gestor, 1000, ",")) !== FALSE) {
        $numero = count($datos);
        echo "<p> $numero de campos en la línea $fila: <br /></p>\n";
        $fila++;
        for ($c=0; $c < $numero; $c++) {
            echo $datos[$c] . "<br />\n";
        }
    }
    fclose($gestor);
}
*/


/*
$abierto = fopen("aparcamientos_publicos.csv", "r");
$datos = fgetcsv($abierto,100000000,";","\n");
print_r($datos);
*/
//$Data = str_getcsv($datos, "\n");
//print_r($Data) ;
//($datos = fgetcsv($gestor, 1000, ",")

/*
$fp = fopen('aparcamientos_publicos.csv','r') or die("can't open file");
print "<table>\n";
while($csv_line = fgetcsv($fp,1024)) {
    print '<tr>';
    for ($i = 0, $j = count($csv_line); $i < $j; $i++) {
        print '<td>'.$csv_line[$i].'</td>';
    }
    print "</tr>\n";
}
print '</table>';
fclose($fp) or die("can't close file");
*/


/*
$datos1 =file('aparcamientos_publicos.csv');
//print_r($datos1) ; //me lo ha traido como un array,cada posicion con todos los campos
echo "<br>";


 for ($i=0; $i < count($datos1)-1; $i++) { 
          //echo 'FILA: '.$i.'<br>';

          $datos2[]= str_getcsv($datos1[$i],";" ,'"', "\n");  //me devuelve un array por cada una de las "lineas"c anteriores,con todas las celdas separadas por
          print_r($datos2); 
}
*/


/*
$cabecera =  str_getcsv($lines[0],";" ,'"', "\n");
    print_r($cabecera);
    echo '<br>';

$resultadoEnArray = [];
echo '<br><br><br><br><br><br><br><br>';
for ($i=1; $i < count($lines)-1; $i++) { 

          $resultadoEnArray[] = str_getcsv($lines[$i],";" ,'"', "\n");
        }
          
          print_r($resultadoEnArray); 
          //print_r($resultadoEnArray[0][0]);
*/



//ESTO TE DA EL CSV EN UN ARRAY MULTIDIMENSIONAL $misResult[fila][campo]
        $datos1 = fopen("aparcamientos_publicos.csv", "r");
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

?>

