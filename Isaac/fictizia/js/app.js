requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "json2": "//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2",
      "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min",
      "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.3/underscore-min",
      "firebase": "//cdn.firebase.com/js/client/2.0.0/firebase",
      "backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min",
	    "bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
      "backfire": "backfire.min",
      "utils": "utils",
      "transport": "transport-app"
    }
});//add resources without .js

// Load the main app module to start the app
requirejs(["app/main"]);