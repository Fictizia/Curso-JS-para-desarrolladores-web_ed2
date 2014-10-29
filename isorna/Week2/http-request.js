// option 1

var xmlHttp = null;

function GetCustomerInfo()
{
    var CustomerNumber = document.getElementById( "TextBoxCustomerNumber" ).value;
    var Url = "GetCustomerInfoAsJson.aspx?number=" + CustomerNumber;

    xmlHttp = new XMLHttpRequest(); 
    xmlHttp.onreadystatechange = ProcessRequest;
    xmlHttp.open( "GET", Url, true );
    xmlHttp.send( null );
}

function ProcessRequest() 
{
    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) 
    {
        if ( xmlHttp.responseText == "Not found" ) 
        {
            document.getElementById( "TextBoxCustomerName"    ).value = "Not found";
            document.getElementById( "TextBoxCustomerAddress" ).value = "";
        }
        else
        {
            var info = eval ( "(" + xmlHttp.responseText + ")" );

            // No parsing necessary with JSON!        
            document.getElementById( "TextBoxCustomerName"    ).value = info.jsonData[ 0 ].cmname;
            document.getElementById( "TextBoxCustomerAddress" ).value = info.jsonData[ 0 ].cmaddr1;
        }                    
    }
}

// option 2
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
aClient.get('http://some/thing?with=arguments', function(answer) {
    // do something with answer
});