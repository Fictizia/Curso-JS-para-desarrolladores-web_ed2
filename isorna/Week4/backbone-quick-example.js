var SomeModel = Backbone.Model.extend({
   url: "/someurl"
});
 
var SomeView = Backbone.View.extend({
    initialize: function() {
        this.model.on( "reset", this.render, this );
 
        this.model.fetch();
    },
    render: function( data ) {
        // do something with data
    }
});
 
var view = new SomeView({
    model: new SomeModel()
});