/*global define*/
define([
	"jquery",
	"underscore",
	"backbone",
	"collections/ingredients",
	"text!templates/ingredients.html"
], function ($, _, Backbone, ingredientsCollection, ingredientsTemplate) {
	"use strict";
	var IngredientsView = Backbone.View.extend({
		el: "#myRecipesApp",
		template: _.template(ingredientsTemplate),
		events: {
			"submit #form-new-ingredient": "newIngredientSubmit",
		},
		initialize: function () {
			this.$main = this.$("#main");
			this.collection = ingredientsCollection;
			this.listenTo(this.collection, 'add', this.addOne);
		},
		render: function(){
			this.$main.html(this.template);	
			this.$ingredientsList = this.$("#ingredients-list");
			this.addAll();
		},
		newIngredientSubmit: function() {
			event.preventDefault();
			this.collection.add({
            	name:  $("[name=IngredientName]").val(),
            });
		},
		addOne: function(model){
			this.$ingredientsList.append("<li>" + model.toJSON().name + "</li>");
		},
		addAll: function () {
			this.$ingredientsList.empty();
			this.collection.each(this.addOne, this);
		}
	});
	return IngredientsView;
});