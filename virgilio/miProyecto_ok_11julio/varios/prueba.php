<?php
//cargamos el archivo
$lineas = file('aparcamientos_publicos.csv');
//inicializamos variable a 0, esto nos ayudará a indicarle que no lea la primera línea
$i=0;
//Recorremos un bucle para leer línea por línea
foreach ($lineas as $linea_num => $linea)
//abrimos bucle
{
/*si es diferente a 0 significa que no se encuentra en la primera línea (con los títulos de las columnas) y por lo tanto puede leerla*/
if($i != 0)
//abrimos condición, solo entrará en la condición a partir de la segunda pasada del bucle.
{
//La funcion explode nos ayuda a delimitar los campos, por lo tanto irá leyendo hasta que encuentre un ;
$datos = explode("\n",$linea);
$datos = explode(";",$linea);
	//print_r($datos);
print_r($datos);
$max = sizeof($datos);
echo $max;

//Almacenamos los datos que vamos leyendo en una variable
//$nombre = trim($datos[0]);
//$edad = trim($datos[1]);
//$profesion = trim($datos[2]);

//guardamos en base de datos la línea leida
	//mysql_query(“INSERT INTO datos(nombre,edad,profesion) VALUES(‘$nombre,’$edad ‘,’$profesion ‘)”);
//cerramos condición
}
/*Cuando pase la primera pasada se incrementará nuestro valor y a la siguiente pasada ya entraremos en la condición, de esta manera conseguimos que no lea la primera línea.*/
$i++;
//cerramos bucle
}
?>