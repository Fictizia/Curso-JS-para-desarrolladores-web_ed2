/* global Firebase, Backbone, $, _ */
// EMT APP

$(function document_onReady () {
    var transporteApp = window.transporteApp = {};
    
    transporteApp.cache = {};
    transporteApp.ref = new Firebase('https://fizticia.firebaseio.com');
    transporteApp.firebIsNewUser = true;

  //var llamadabasededatos1 =new Firebase('https://fizticia.firebaseio.com/');  

     $('#login-button').on('click', function loginButton_onClick (event) {
      //
      transporteApp.ref.authWithOAuthPopup("facebook", function(err, authData) {
          
          if (err) {
                // see: https://www.firebase.com/docs/web/guide/user-auth.html#section-handling-errors
                throwStack(err.message);
                return;
            }
            transporteApp.authData = authData;
            console.log('login ok');
          
          
      });
    });
   $('#logout-button').on('click', function logoutButton_onClick (event) {
      transporteApp.ref.unauth();
      transporteApp.ref.authData = null;
    });
    
     transporteApp.ref.onAuth(function ref_onAuth (authData) {
      if (authData) {
        // user authenticated with Firebase
        console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
        
        // store user data
        if (transporteApp.firebIsNewUser) {
            transporteApp.ref.child('authUsers').child(authData.uid).set(authData);
        }
       $("#imagen").attr("src",authData.facebook.cachedUserProfile.picture.data.url);
       
 
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