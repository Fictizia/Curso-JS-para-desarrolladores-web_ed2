/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';
	var Ingredient = Backbone.Model.extend({
		defaults: {
			name: 'nombre del ingrediente'
		},
	});
	return Ingredient;
});