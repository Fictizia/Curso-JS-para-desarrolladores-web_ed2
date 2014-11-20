/* global Firebase, Backbone, $, _ */
// EMT APP

$(function document_onReady () {
    
//Modelo
    //Crear objeto singleRoute, objeto básico del modelo
    var SingleRoute = Backbone.Model.extend();
    
    //Colección de objetos singleRoute
    var RoutesList = Backbone.Firebase.Collection.extend({
        model: SingleRoute,
        firebase: new Firebase("https://publicdata-transit.firebaseio.com/sf-muni/routes")
    });
    
    //Crear objeto user, objeto básico del modelo
    var User = Backbone.Model.extend();
    
    
//Vista
    //Vista modelo singleRoute
    var SingleRouteView = Backbone.View.extend({
        tagName:  'li',
        className: 'list-group-item',
        template: _.template($('#route-item-template').html()),
        initialize: function() {
          this.listenTo(this.model, 'change', this.render);
          this.listenTo(this.model, 'remove', this.remove);
        },
        render: function() {
            //Convertir a JSON el modelo
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
    //vista de la aplicación
    var myTransportAppView = Backbone.View.extend({
        cache: {},
        el: $("#myTransportApp"),
        events: {
          "click #login-button":  "loginButton_onClick",
          "click #logout-button": "logoutButton_onClick"
          
          //, "click #load-data-button": "loadDataButton_onClick"
        },
        ref: {},
        bIsNewUser: true,
        loginButton_onClick: function (event) {
            
            var thisOuthClick
            this.ref.authWithOAuthPopup('facebook', function ref_authWithOAuthPopup(err, authData) {
                console.log("click login!!!");
                if (err) {
                    // see: https://www.firebase.com/docs/web/guide/user-auth.html#section-handling-errors
                    throwStack(err.message);
                    return;
                }
            });
        },
        logoutButton_onClick: function (event) {
            this.ref.unauth();
            this.authData = null;
            this.cache.routesList = null;
            $('#routes-list').html('');
        },
        //loadDataButton_onClick: function (event) {},
        initialize: function() {
            
            this.ref = new Firebase('https://fictizia.firebaseio.com/');
            
            this.ref.onAuth(this.ref_onAuth, this);
        },
        ref_onAuth: function(authData){
            
            this.authData = authData;
            if (authData) {
                this.cache.routesList = new RoutesList();
                this.listenTo(this.cache.routesList, 'add', this.addOne);
                this.listenTo(this.cache.routesList, 'reset', this.addAll);
                this.listenTo(this.cache.routesList, 'all', this.render);
                // user authenticated with Firebase
                
                // store user data
                if (this.bIsNewUser) {
                    this.ref.child('authUsers').child(authData.uid).set(authData);
                }
                $('#login-form').prepend('<img id="user-avatar" src="' + authData.facebook.cachedUserProfile.picture.data.url + '" alt="' + this.authData.facebook.cachedUserProfile + '" />');
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
        },
        addOne: function(route) {
            console.log("adding: ",route)
            var oView = new SingleRouteView({model: route});
            this.$("#routes-list").append(oView.render().el);
        },
    
        // Add all items in the **Todos** collection at once.
        addAll: function() {
            console.log("reste!!!!! ")
            this.$("#routes-list").html("");
            this.cache.routesList.each(this.addOne, this);
        },
        render: function () {
            //console.log('rendering');
        }
    });
    
    // App init
    window.TransportApp = new myTransportAppView();
});

function throwStack (pcErrorMessage){
    var oError = new Error(pcErrorMessage);
    
    return oError.stack;
}