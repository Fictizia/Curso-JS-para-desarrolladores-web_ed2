/* globals: Firebase, requirejs */

// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        firebase: 'firebase'
    },
    shim: {
        'firebase': {
            exports: 'Firebase'
        }
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['classes', 'db'], function (classes, db) {
    var cDB_URL = 'https://js-web-developers.firebaseio.com',
        cDB_TRANSIT_URL = 'https://publicdata-transit.firebaseio.com/sf-muni',
        oMyAppDB = {},
        oTransitDB = {};
    //Firebase and the classes module are all
    //loaded and can be used here now.
    
    console.log('loaded!');
    
    oMyAppDB = db.newDB(cDB_URL);
    
    document.querySelector('#loginUser').addEventListener('click', function loginUser_onClick (event) {
        oMyAppDB.auth(document.querySelector('#userEmail').value, document.querySelector('#userPwd').value);
        
        if (oMyAppDB.getAuth()) {
            document.querySelector('#loginUser').className = 'hidden';
            document.querySelector('#logoutUser').className = '';
        }
    });
    
    document.querySelector('#logoutUser').addEventListener('click', function logoutUser_onClick (event) {
        oMyAppDB.unauth();
        document.querySelector('#loginUser').className = '';
        document.querySelector('#logoutUser').className = 'hidden';
    });
    
    document.querySelector('#newUser').addEventListener('click', function newUser_onClick (event) {
        oMyAppDB.createUser(document.querySelector('#userEmail').value, document.querySelector('#userPwd').value);
        
        if (oMyAppDB.getAuth()) {
            document.querySelector('#loginUser').className = 'hidden';
            document.querySelector('#logoutUser').className = '';
        }
    });
    
//         function db_loadRoutes () {
//             // ...
//         };
        
//         function db_loadVehicles () {
//             // ...
//         };
});