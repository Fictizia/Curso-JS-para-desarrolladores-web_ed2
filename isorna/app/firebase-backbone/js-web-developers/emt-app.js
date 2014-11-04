// EMT APP

$(function document_onReady () {
    var EMTApp = window.EMTApp = {};
    
    EMTApp.ref = new Firebase('https://js-web-developers.firebaseio.com');
    EMTApp.bIsNewUser = true;
    
    $('#login-button').on('click', function loginButton_onClick (event) {
        EMTApp.ref.authWithOAuthPopup('facebook', function ref_authWithOAuthPopup(err, authData) {
            if (err) {
                // see: https://www.firebase.com/docs/web/guide/user-auth.html#section-handling-errors
                throwStack(err.message);
                return;
            }
            EMTApp.authData = authData;
            console.log('login ok');
        });
    });
    
    $('#logout-button').on('click', function logoutButton_onClick (event) {
        EMTApp.ref.unauth();
        EMTApp.authData = null;
    });
    
    EMTApp.ref.onAuth(function ref_onAuth (authData) {
      if (authData) {
        // user authenticated with Firebase
        console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
        
        // store user data
        if (EMTApp.bIsNewUser) {
            EMTApp.ref.child('authUsers').child(authData.uid).set(authData);
        }
        
        $('#login-button').hide();
        $('#logout-button').show();
      } else {
        // user is logged out
        console.log('user is logged out');
        
        $('#login-button').show();
        $('#logout-button').hide();
      }
    });
});

function throwStack (pcErrorMessage){
    var oError = new Error(pcErrorMessage);
    
    return oError.stack;
}