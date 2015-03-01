/*global define*/
define([
	"jquery",
	"underscore",
	"backbone",
	"collections/ingredients",
	"text!templates/ingredients.html"
], function ($, _, Backbone, ingredientCollection, ingredientsTemplate) {
	"use strict";
	var IngredientsView = Backbone.View.extend({
		el: "#myRecipesApp",
		template: _.template(ingredientsTemplate),
		events: {
			"submit #form-new-ingredient": "newIngredientSubmit",
		},
		initialize: function () {
			this.$main = this.$("#main");
			this.$main.html(this.template);	
			this.collection = ingredientCollection;
			this.$ingredientsList = this.$("#ingredients-list");
			this.listenTo(this.collection, 'add', this.addOne);
			this.listenTo(this.collection, 'reset', this.addAll);
			this.addAll();
		},
		newIngredientSubmit: function() {
			ingredientCollection.add({
            	name:  $("[name=IngredientName]").val(),
            })
			event.preventDefault();
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