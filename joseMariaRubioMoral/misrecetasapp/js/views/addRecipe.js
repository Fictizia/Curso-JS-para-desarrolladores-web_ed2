/*global define*/
define([
	"jquery",
	"underscore",
	"backbone",
	"collections/ingredients",
	"collections/categories",
	"collections/recipes",
	"text!templates/addRecipe.html"
], function ($, _, Backbone, ingredientsCollection, categoriesCollection, recipesColecction, addRecipeTemplate) {
	"use strict";
	var AddRecipe = Backbone.View.extend({
		el: "#myRecipesApp",
		template: _.template(addRecipeTemplate),
		events: {
			"submit #form-new-recipe": "newRecipeSubmit",
			"click #addCategory" : "addCategory",
			"click .addCategoryRadioButton" : "onNewCategorySelected",
			"click #addIngredients" : "addIngredients",
		},
		initialize: function () {
			this.$main = this.$("#main");
			this.recipesColecction = recipesColecction;
			this.ingredientsCollection = ingredientsCollection;
			this.categoriesCollection = categoriesCollection;
		},
		render: function(){
			this.$main.html(this.template);	
			this.$categoriesList = this.$("#categories-list");
			this.$categorySelected = this.$("#categorySelected");
			this.$categoriesList.hide();
			this.$categorySelected.hide();
			this.$ingredientsList = this.$("#ingredients-list");
			this.$ingredientsSelected = this.$("#ingredientsSelected");
			this.$ingredientsList.hide();
			this.$ingredientsSelected.hide();			
		},
		//---------- Form Section ----------//
		newRecipeSubmit: function() {
			event.preventDefault();
		},
		//---------- Categories section ----------//
		addCategory: function(){
			this.listenTo(this.categoriesCollection, 'add', this.addOneCategory);
			this.addAllCategories();
			categoriesCollection.on('all', function(ev) {
  				console.log('collection something');
  				console.log(ev)
			});
			this.categoriesCollection.fetch();
			this.$categoriesList.show();
		},
		addOneCategory: function(model){
			console.log(model);
			this.$categoriesList.append("<li><input type='radio' name='category' class='addCategoryRadioButton' value="+ model.toJSON().name +">" + model.toJSON().name + "</li>");
		},
		addAllCategories: function () {
		    this.$categoriesList.empty();
            this.categoriesCollection.each(this.addOneCategory, this);
		},
		onNewCategorySelected: function(ev){
			this.$categoriesList.hide();
			this.$categorySelected.val(ev.currentTarget.value).show();
		},
		//---------- Ingredients section ----------//
		addIngredients: function(){
			this.listenTo(this.ingredientsCollection, 'add', this.addOneIngredient);
			this.addAllIngredients();
			this.$ingredientsList.show();
		},
		addOneIngredient: function(model){
			this.$ingredientsList.append("<li><input type='checkbox' name='ingredient' class='addIngredientCheckbox' value="+ model.toJSON().name +">" + model.toJSON().name + "</li>");
		},
		addAllIngredients: function () {
			this.$ingredientsList.empty();
			this.ingredientsCollection.each(this.addOneIngredient, this);
		}
	});
	return AddRecipe;
});