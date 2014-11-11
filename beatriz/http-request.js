var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        aUrl="https://openbus.emtmadrid.es:9443/emt-proxy-server/last/bus/GetRouteLinesRoute.php"
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
aClient.get('http://some/thing?with=arguments', function(answer) {
    // do something with answer
});