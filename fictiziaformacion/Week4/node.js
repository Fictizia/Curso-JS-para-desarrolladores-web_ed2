var http = require('http');
//var url = require("url");
//var saludos = require("./moduloNode.js");

http.createServer(function server_onRequest (request, response) {
    var pathname = url.parse(request.url).pathname;
    
    console.log("Request for " + pathname + " received.");

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("<h1>Hello World</h1>");
    response.end();
}).listen(process.env.PORT, process.env.IP);

console.log('Server running at http://' + process.env.IP + ':' + process.env.PORT + '/');
//saludos.holaQueTal();