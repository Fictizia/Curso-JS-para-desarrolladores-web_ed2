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
            this.$main = this.$("#main");
            this._doInit();
            var ingredients, categories, newRecipe
        },
        render: function () {
        	this.$main.html(this.template);
        },
        _doInit: function(){
        	this.render();
        },
		_doIngredients : function(){
			this.ingredients = this.ingredients  || new ingredientsView({});
			this.ingredients.render();
		},
		_doCategories : function(){
			this.categories = this.categories  || new categoriesView({});
			this.categories.render();			
		},
		_doNewReceipe : function(){
			this.newRecipe = this.newRecipe  || new addRecipeView({});
			this.newRecipe.render();
		},
	});
	return AppView;
});