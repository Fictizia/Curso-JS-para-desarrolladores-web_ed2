var http = require('http');
var url = require("url");

http.createServer(function server_onRequest (request, response) {
    var pathname = url.parse(request.url).pathname;
    
    console.log("Request for " + pathname + " received.");

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Hello World");
    response.end();
}).listen(process.env.PORT, process.env.IP);

console.log('Server running at http://' + process.env.IP + ':' + process.env.PORT + '/');