/*global define */
define([
	'underscore',
	'backbone',
	'models/ingredients',
	'firebase',
	'backbonefire'
], function (_, Backbone, ingredientModel) {
	'use strict';
	console.log("estoy en la colecction de ingredientes....>");
	var ingredientsCollection = Backbone.Firebase.Collection.extend({
		model: ingredientModel,
		url: 'https://misrecetasapp.firebaseio.com/ingredients',
	});

	return new ingredientsCollection();
});