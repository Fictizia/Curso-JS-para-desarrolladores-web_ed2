/*global _, Backbone*/
(function ($){

    // Models
    var Shop = Backbone.Model.extend({
      defaults: {
        name: 'default_name',
        address: 'default_address',
        cost: 'default_cost'
      }
    });
    
    // Collections
    var ShopList = Backbone.Firebase.Collection.extend({
      url: 'https://shop-s.firebaseio.com/Shop',
      model: Shop
    });
    
    // Views
    var AppView = Backbone.View.extend({
        el: $(".container"),
        
        events: {
          'click button#save-button': 'addShop'
        },
        
        initialize: function(){
          _.bindAll(this, 'render', 'addShop', 'showShop'); 
        
          this.collection = new ShopList();
          this.collection.bind('add', this.showShop);

          this.render();
        },
        
        render: function(){},
        
        addShop: function(){
          this.collection.add({
            name: $('#shop-name').val(),
            address: $('#shop-address').val(),
            cost: $('input[name=mode]:checked', '.controls').val()
          });
        },
        
        showShop: function(shop){
          //TODO: use a ShopView
          $('#shop-list', this.el).append(
            "<li>" + shop.get("name") + " placed in " + shop.get("address") + " with cost " + shop.get("cost") + " <a id='shop-remove' href='#'>-remove-</a></li>"
            );
        }
    });
    
    var app = new AppView();
    
})(jQuery);