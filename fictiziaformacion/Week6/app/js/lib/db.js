// Classes Module
define(['firebase'], function (Firebase) {
    var newDB = function (pcDB_URL, poFunctions) {
        var cache = {};
            
        cache._onValue = function (poSnapshot) {
            console.log('snapshot', poSnapshot.val());
        };
        
        cache._onError = function (poErrorObject) {
            console.log("The read failed: " + poErrorObject.code);
        };
        
        cache._onAuth = function (poError, poAuthData) {
            if (poError === null) {
                console.log("User ID: " + poAuthData.uid + ", Provider: " + poAuthData.provider);
            } else {
                console.log("Error authenticating user:", poError);
            }
            console.log(poAuthData);
        };
        
        cache._connect = function () {
            cache.oRef = new Firebase(cache.cDB_URL);
            
            cache.oRef.once('value', cache._onValue, cache._onError);
        };
        
        cache._disconnect = function () {
            cache.oRef.off();
        };
        
        // https://www.firebase.com/docs/web/guide/login/password.html
        cache._auth = function (pcEmail, pcPassword) {
            cache.oRef.authWithPassword({
                email: pcEmail,
                password: pcPassword
            }, cache._onAuth, {
                remember: "sessionOnly"
            });
        };
        
        cache._unauth = function () {
            cache.oRef.unauth();
        };
        
        cache._getAuth = function () {
            return cache.oRef.getAuth();
        };
        
        cache._createUser = function (pcEmail, pcPassword) {
            cache.oRef.createUser({
                email: pcEmail,
                password: pcPassword
            }, function(poError) {
                if (poError === null) {
                    console.log("User created successfully");
                } else {
                    console.log("Error creating user:", poError);
                }
            });
        };
        
        cache._initialize = function (pcDB_URL, poFunctions) {
            cache.cDB_URL = pcDB_URL;
            
            if (typeof poFunctions != 'undefined') {
                cache._onValue = poFunctions.onValue || cache._onValue;
                cache._onError = poFunctions.onError || cache._onError;
                cache._onAuth = poFunctions.onAuth || cache._onAuth;
            }
        };
        
        cache._initialize(pcDB_URL, poFunctions);
        cache._connect();
    
        return {
            connect: cache._connect,
            disconnect: cache._disconnect,
            auth: cache._auth,
            unauth: cache._unauth,
            getAuth: cache._getAuth,
            createUser: cache._createUser
        };
    };
    
    return {
        newDB: newDB
    };
});