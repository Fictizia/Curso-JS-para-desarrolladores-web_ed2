// See more at: http://www.5dayweather.org/api-doc

/* 
// Call to
http://5DayWeather.org/api.php?city=London

// Returns
{
   "apiVersion":"1.0",
   "data":{
      "location":"London, GBR",
      "temperature":"61",
      "skytext":"Mostly Cloudy",
      "humidity":"59",
      "wind":"16 mph",
      "date":"2013-10-09",
      "day":"Wednesday"
   }
}
*/

var xmlHttp = new XMLHttpRequest(),
    cURL = 'http://5DayWeather.org/api.php?',
    cParams = 'city=' + prompt('City?');

xmlHttp.onreadystatechange = function () {
    console.log(xmlHttp, 'ReadyState: ' + xmlHttp.readyState, ' Status: ' + xmlHttp.status);
    
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        console.log(xmlHttp.responseText);
    }
};

xmlHttp.open( "GET", cURL + cParams, true );
xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlHttp.setRequestHeader("Content-length", cParams.length);
xmlHttp.setRequestHeader("Connection", "close");

xmlHttp.send();