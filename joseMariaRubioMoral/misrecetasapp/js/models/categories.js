/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';
	var Categories = Backbone.Model.extend({
		defaults: {
			name: 'nombre de la categoría del plato'
		},
	});
	return Categories;
});