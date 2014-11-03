

var xmlHttp = new XMLHttpRequest(),
    cURL = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/bus/GetRouteLines.php',
    cIdClient = 'WEB.SERV.alvaro@isorna.net',
    cPassKey = '075CF186-4345-4F0C-8604-C22BE13562D4',
    cParams = 'SelectDate=30/10/2014&Lines=145&idClient=' + cIdClient + '&PassKey=' + cPassKey;

xmlHttp.onreadystatechange = function () {
    console.log(xmlHttp, 'ReadyState: ' + xmlHttp.readyState, ' Status: ' + xmlHttp.status);
    
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        console.log(xmlHttp.responseText);
    }
};

xmlHttp.open( "POST", cURL, true );
xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlHttp.setRequestHeader("Content-length", cParams.length);
xmlHttp.setRequestHeader("Connection", "close");

xmlHttp.send(cParams);

// CORS Request

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  var cURL = 'https://openbus.emtmadrid.es:9443/emt-proxy-server/last/bus/GetRouteLines.php',
    cIdClient = 'WEB.SERV.alvaro@isorna.net',
    cPassKey = '075CF186-4345-4F0C-8604-C22BE13562D4',
    cParams = 'SelectDate=30/10/2014&Lines=145&idClient=' + cIdClient + '&PassKey=' + cPassKey;

  var xhr = createCORSRequest('POST', cURL);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    console.log('CORS XHR', xhr.responseText);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  
  xhr.onreadystatechange = function () {
    console.log(xmlHttp, 'ReadyState: ' + xmlHttp.readyState, ' Status: ' + xmlHttp.status);
    
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        console.log(xmlHttp.responseText);
    }
  };

  xhr.send(cParams);
}