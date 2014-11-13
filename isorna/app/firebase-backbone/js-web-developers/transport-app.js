/* global Firebase, Backbone, $, _ */
// EMT APP

$(function document_onReady () {
    var TransportApp = window.TransportApp = {};
    
    //TransportApp.cache = {};
    //TransportApp.ref = new Firebase('https://js-web-developers.firebaseio.com');
    //TransportApp.bIsNewUser = true;
    
    var SingleRoute = Backbone.Model.extend();
    
    var RoutesList = Backbone.Firebase.Collection.extend({
        model: SingleRoute,
        firebase: new Firebase("https://publicdata-transit.firebaseio.com/sf-muni/routes")
    });
    
    var SingleRouteView = Backbone.View.extend({
        tagName:  'li',
        className: 'list-group-item',
        template: _.template($('#route-item-template').html()),
        initialize: function() {
          this.listenTo(this.model, 'change', this.render);
          this.listenTo(this.model, 'remove', this.remove);
        },
        render: function() {
            var oModel = this.model.toJSON(), 
                oReturnValue = {id: oModel.id},
                aVehicles = [],
                oValue = {};
            
            for (oValue in oModel) {
                if (oModel.hasOwnProperty(oValue) && oModel[oValue] === true) {
                    aVehicles.push(oValue);
                }
            }
            
            oReturnValue.vehicles = aVehicles.join(', ');
            
            this.$el.html(this.template(oReturnValue));
            return this;
        }
    });
    
    // myTransportApp
    
    var myTransportAppView = Backbone.View.extend({
        cache: {
            viewList: []
        },
        el: $("#myTransportApp"),
        ref: new Firebase('https://js-web-developers.firebaseio.com'),
        bIsNewUser: true,
        events: {
          "click #login-button":  "loginButton_onClick",
          "click #logout-button": "logoutButton_onClick"
          //, "click #load-data-button": "loadDataButton_onClick"
        },
        loginButton_onClick: function (event) {
            this.ref.authWithOAuthPopup('facebook', function ref_authWithOAuthPopup(err, authData) {
                if (err) {
                    // see: https://www.firebase.com/docs/web/guide/user-auth.html#section-handling-errors
                    throwStack(err.message);
                    return;
                }
                
                console.log('login ok');
            });
        },
        logoutButton_onClick: function (event) {
            this.ref.unauth();
            this.authData = null;
        },
        //loadDataButton_onClick: function (event) {},
        initialize: function() {
            this.ref.onAuth(function ref_onAuth (authData) {
              if (authData) {
                // user authenticated with Firebase
                console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
                
                this.cache.authData = authData;
                // store user data
                if (this.bIsNewUser) {
                    this.ref.child('authUsers').child(authData.uid).set(authData);
                }
                $('#login-form').prepend('<img id="user-avatar" src="' + authData.facebook.cachedUserProfile.picture.data.url + '" alt="' + authData.facebook.cachedUserProfile + '" />');
                $('#login-button').hide();
                $('#logout-button').show();
                //$('#load-data-button').show();
                this.cache.routesList = new RoutesList();
                this.listenTo(this.cache.routesList, 'add', this.addOne);
                this.listenTo(this.cache.routesList, 'reset', this.addAll);
                this.listenTo(this.cache.routesList, 'all', this.render);
              } else {
                // user is logged out
                console.log('user is logged out');
                
                $('#user-avatar').remove();
                $('#login-button').show();
                $('#logout-button').hide();
                //$('#load-data-button').hide();
                this.removeList();
              }
            }, this);
        },
        addOne: function(route) {
            var oView = new SingleRouteView({model: route});
            
            this.cache.viewList.push(oView);
            
            this.$("#routes-list").append(oView.render().el);
        },
    
        // Add all items in the **Todos** collection at once.
        addAll: function() {
            this.$("#routes-list").html("");
            this.cache.routesList.each(this.addOne, this);
        },
        render: function () {
            //console.log('rendering');
        },
        removeList: function () {
            if (this.cache.viewList && this.cache.viewList.length > 0) {
                console.log('remove list', this.cache);
                this.cache.routesList.remove();
                // this.cache.viewList.forEach(function (poItem, poIndex, poArray) {
                //     poItem.remove();
                //     poItem.unbind();
                // });
            }
        }
    });
    
    // Event handlers
    /*TransportApp.ref.onAuth(function ref_onAuth (authData) {
      if (authData) {
        // user authenticated with Firebase
        console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
        
        // store user data
        if (TransportApp.bIsNewUser) {
            TransportApp.ref.child('authUsers').child(authData.uid).set(authData);
        }
        $('#login-form').prepend('<img id="user-avatar" src="' + authData.facebook.cachedUserProfile.picture.data.url + '" alt="' + authData.facebook.cachedUserProfile + '" />');
        $('#login-button').hide();
        $('#logout-button').show();
        //$('#load-data-button').show();
      } else {
        // user is logged out
        console.log('user is logged out');
        
        $('#user-avatar').remove();
        $('#login-button').show();
        $('#logout-button').hide();
        //$('#load-data-button').hide();
      }
    });*/
    
    /*TransportApp.getVehicleLocations = function app_getVehicleLocation () {
        var transitRef = new Firebase('https://publicdata-transit.firebaseio.com/'),
            lineIndex = transitRef.child('sf-muni/vehicles').limitToLast(200);
   
        //lineIndex.on('child_changed', function lineIndex_onChildChanged (snapshot) {
        //    console.log('child_changed', snapshot.val());
        //});
        
        lineIndex.on('child_added', function lineIndex_onChildAdded (snapshot) {
            console.log('child_added', snapshot.val());
        });
        
        lineIndex.on('child_removed', function lineIndex_onChildRemoved (snapshot) {
            console.log('child_removed', snapshot.val());
        });
        
        lineIndex.once('value', function lineIndex_onceValue (snapshot) {
            console.log('value', snapshot.val());
        });
    };*/
    
    /*TransportApp.saveRoutes = function app_saveRoutes () {
        TransportApp.ref.child('routes-db').set(TransportApp.cache.routes, function saveRoutes_onError (error) {
            if (error) {
                throwStack("Data could not be saved." + error);
            } else {
                console.info("Data saved successfully.");
            }
        });
    };*/
    
    // App init
    window.myApp = new myTransportAppView();
});

function throwStack (pcErrorMessage){
    var oError = new Error(pcErrorMessage);
    
    return oError.stack;
}