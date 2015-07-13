/*global define */
define([
	'underscore',
	'backbone',
	'models/recipes',
	'firebase',
	'backbonefire'
], function (_, Backbone, recipesModel) {
	'use strict';
	var recipessCollection = Backbone.Firebase.Collection.extend({
		model: recipesModel,
		url: 'https://misrecetasapp.firebaseio.com/recipes',
	});

	return new recipessCollection();
});