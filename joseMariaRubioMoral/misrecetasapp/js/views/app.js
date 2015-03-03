/*global define*/
define([
	"jquery",
	"underscore",
	"backbone",
	"views/last20ViewedRecipes",
	"views/ingredients",
	"views/categories",
	"views/addRecipe",
	"text!templates/last_20_viewed_recipes.html"
], function ($, _, Backbone, last20ViewedRecipesView, ingredientsView, categoriesView, addRecipeView, Last20ViewedRecipesTemplate) {
	"use strict";
	var AppView = Backbone.View.extend({
		el: "#myRecipesApp",
        events:{
        	"click #init": "_doInit",
			"click #ingredients": "_doIngredients",
			"click #categories" : "_doCategories",
			"click #newReceipe" : "_doNewReceipe" 
        },		
		template: _.template(Last20ViewedRecipesTemplate),
        initialize : function(){
            console.log("initialize");
            this.$main = this.$("#main");
            //TODO change this event
            this._doInit();
        },
        render: function () {
        	this.$main.html(this.template);
        },
        _doInit: function(){
        	console.log("he apretado en init");
        	this.render();
        },
		_doIngredients : function(){
			console.log("he apretado en ingredientes");	
			var view = new ingredientsView({});
			view.render();
		},
		_doCategories : function(){
			var view = new categoriesView({});
			view.render();
			console.log("he apretado en categorías");	
		},
		_doNewReceipe : function(){
			var view = new addRecipeView({});
			view.render();
			console.log("he apretado en nueva receta");	
		},
	});
	return AppView;
});