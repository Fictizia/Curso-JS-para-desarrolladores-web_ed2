/* global Backbone, $, _ */

$(function(){
    "use strict";
    
    var receipsBook = receipsBook || {};
    
    receipsBook.classes = {};
    receipsBook.classes.Recipe = Backbone.Model.extend({});
    receipsBook.classes.Ingredient = Backbone.Model.extend({});
    receipsBook.classes.Category = Backbone.Model.extend({});
    receipsBook.classes.listByRecipes = Backbone.Collection.extend({
        model: receipsBook.classes.Recipe
    });
    receipsBook.classes.ListByIngredients = Backbone.Collection.extend({
        model: receipsBook.classes.Ingredient
    });
    receipsBook.classes.ListByCategory = Backbone.Collection.extend({
        model: receipsBook.classes.Category
    });
    receipsBook.classes.RecipeDetail = Backbone.View.extend({});
    receipsBook.classes.IngredientDetail = Backbone.View.extend({});
    receipsBook.classes.CategoryDetail = Backbone.View.extend({});
    receipsBook.classes.RecipesSearch = Backbone.View.extend({});
    receipsBook.classes.App = Backbone.View.extend({
            el: $("#receipsApp"),
            events:{
                'click #menu li': '_doActionMenu'
            },
            initialize : function(){
                console.log(receipsBook);
            },
            render: function(){
                console.log("se pinta");
            },
            _doActionMenu:function(){
                $('#view', this.$el).html(this._listViewTemplate({
                fecha: new Date()
                }));
                console.log("me han hecho click");
            },
            // templates de mi app
            _listViewTemplate: _.template($('#menu-section').html())
    })
    receipsBook.models = {};
    receipsBook.views = {};
    receipsBook.views.myApp = new receipsBook.classes.App;
});