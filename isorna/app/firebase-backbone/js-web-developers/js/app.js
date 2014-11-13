requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "json2": "//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2",
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);