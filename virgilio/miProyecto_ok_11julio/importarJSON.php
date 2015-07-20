<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $pageTitle; ?></title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- <link rel="stylesheet" type="text/css" href="css/index.css"> -->
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="funciones_geo.js"></script>
     
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
</head>


<div class="container">
   
    <div class="row">
        <div class="col-md-12">
            <table class="table table-bordered table-hover">

                  <thead>
                    <tr>
                      <th id="reload">#</th>
                      <th>id</th>
                      <th>name</th>
                      <th>municipio</th> 
                      <th>latitude</th>
                      <th>longitude</th>
                      <!--<th>Acciones</th>-->
                    </tr>
                  </thead>
                
                  <tbody id="tableBody">

                  </tbody>
            </table>

        </div>        
    </div>
</div>

<script type="text/javascript">

var resultado2=[];

        var HttpClient = function() {
            this.get = function(aUrl, aCallback) {
                anHttpRequest = new XMLHttpRequest();
                anHttpRequest.onreadystatechange = function() { 
                    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                        aCallback(anHttpRequest.responseText);
                }

                anHttpRequest.open( "GET", aUrl, true );            
                anHttpRequest.send( null );
            }
        }

        aClient = new HttpClient();
        aClient.get('http://datos.alcobendas.org/dataset/5e7777fa-a2e3-4843-a5e2-2c8864c1017c/resource/cdde2c42-7cb2-43a2-b1da-fe0265921f0f/download/paradasbus.json', function(answer) {

            // do something with answer

           resultado2=JSON.parse(answer);
            pintaJSON(resultado2);
             //return resultado2;
            //console.log(resultado[0]);
            //console.log(resultado[0]['latitude']);
            
});
    


function pintaJSON(){
alert("1");
 
 
          var miTableBody=''; //string vacio que rellenaremos con la info de la matriz
  
          
  //recorremos el array que me ha devuelto mi consulta
              for(var i=0;i<resultado2.length;i++){
                    
                //var editarBTN='<button class="btn btn-warning" onclick="editaCampo(\''+resultado2[i]+'\')" id="edita_'+resultado2[i]+'">EDITAR</button>';
                //var borrarBTN='<button class="btn btn-danger" onclick="borraCampo(\''+resultado2[i]+'\')" id="borra_'+resultado2[i]+'">BORRAR</button>';

                    miTableBody+='<tr>';
                 
                    miTableBody+='<td>'+(i+1)+'</td>';
                    miTableBody+='<td>'+resultado2[i]+'</td>';
                    miTableBody+='<td id="distrito_'+resultado2[i]+'">'+resultado2[i].name+'</td>';
                    miTableBody+='<td id="nombre_'+resultado2[i]+'">'+resultado2[i].municipio+'</td>';
                    miTableBody+='<td id="latitud_'+resultado2[i]+'">'+resultado2[i].latitude+'</td>';
                    miTableBody+='<td id="longitud_'+resultado2[i]+'">'+resultado2[i].longitude+'</td>';
                    //miTableBody+='<td>'+editarBTN +' ' + borrarBTN+'</td>';
                  
                                                                
                    miTableBody+='</tr>';
                    //alert(resultado2[i]);

              }
              
              $('tableBody').html(miTableBody);


       
     
}
//llamamos a la funcion aqui para que cargue la tabla
//esto me pinta la tabla al entrar a la pagina


//pintaJSON();
</script>