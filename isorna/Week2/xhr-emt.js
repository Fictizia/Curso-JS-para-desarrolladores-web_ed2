

var xmlHttp = new XMLHttpRequest(),
    cURL = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/bus/GetRouteLines.php',
    cIdClient = 'WEB.SERV.alvaro@isorna.net',
    cPassKey = '075CF186-4345-4F0C-8604-C22BE13562D4';

xmlHttp.onreadystatechange = function () {
    console.log(xmlHttp, 'ReadyState: ' + xmlHttp.readyState, ' Status: ' + xmlHttp.status);
    
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        console.log(xmlHttp.responseText);
    }
};

xmlHttp.open( "POST", cURL, true );
xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlHttp.send('SelectDate=30/10/2014&Lines=145&idClient=' + cIdClient + '&PassKey=' + cPassKey);