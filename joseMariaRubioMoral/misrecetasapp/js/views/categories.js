/*global define*/
define([
	"jquery",
	"underscore",
	"backbone",
	"collections/categories",
	"text!templates/categories.html"
], function ($, _, Backbone, categoriesCollection, categoriesTemplate) {
	"use strict";
	var CategoriesView = Backbone.View.extend({
		el: "#myRecipesApp",
		template: _.template(categoriesTemplate),
		events: {
			"submit #form-new-categorie": "newCategorieSubmit",
		},
		initialize: function () {
			this.$main = this.$("#main");
			this.collection = categoriesCollection;
			this.listenTo(this.collection, 'add', this.addOne);
			this.listenTo(this.collection, 'reset', this.addAll);
		},
		render: function(){
			this.collection.fetch();
		    this.$main.html(this.template);	
		    this.$categoriesList = this.$("#categories-list");
		    this.addAll();  
		},
		newCategorieSubmit: function() {
			this.collection.add({
            	name:  $("[name=CategorieName]").val(),
            });
            this.collection.fetch();
			event.preventDefault();
		},
		addOne: function(model){
			this.$categoriesList.append("<li>" + model.toJSON().name + "</li>");
		},
		addAll: function () {
		    this.$categoriesList.empty();
            this.collection.each(this.addOne, this);
		}
	});
	return CategoriesView;
});