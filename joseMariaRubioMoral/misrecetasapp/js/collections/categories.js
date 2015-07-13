/*global define */
define([
	'underscore',
	'backbone',
	'models/categories',
	'firebase',
	'backbonefire'
], function (_, Backbone, ingredientModel) {
	'use strict';
	var categoriesCollection = Backbone.Firebase.Collection.extend({
		model: ingredientModel,
		url: 'https://misrecetasapp.firebaseio.com/categories',
	});

	return new categoriesCollection();
});