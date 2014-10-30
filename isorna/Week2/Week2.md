Week 2 Milestone
===================

__Last Week Recap__

* [Immediately-invoked function expression](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression).

__Concepts__

* A __polyfill__, or polyfiller, is a piece of code (or plugin) that provides the technology that you, the developer, expect the browser to provide natively.

__Prototypes__

* Take a look at `prototypes.js` for code explanation.

__Mixins & inheritance__

* Mixins give all the benefits of multiple inheritance, without hierarchy (prototypal inheritance in JavaScript). They both allow you to reuse an interface (or set of functions) on multiple objects.
* Take a look at `mixins.js` for code explanation.

__Events__

* [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) interface, properties and methods.
* __This__ differences when assigning an [event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener).
* Remove event listener for memory conservation.

__HTTP Requests__

* Take a look at `http-request.js` for code explanation.

__JSON & JSONP__

* [JSON with padding](http://web.ontuts.com/tutoriales/jsonp-llamadas-ajax-entre-dominios/).

__Error handling__

* Take a look at `error-handling.js` for code explanation.
* Don't use `try / catch` statements, due to memory.
* Talk about preventive error handling with function patterns.

__Code optimization__

* [Coercion in JavaScript](http://blog.taylormcgann.com/2014/01/07/coercion-javascript/).

__Backbone.js & underscore.js__

* Backbone app structure.
 * [Models](http://backbonetutorials.com/what-is-a-model/).
 * Collections.
 * Templates.
 * Views.
 * [Underscore method proxies within Backbone](http://underscorejs.org/#without).
 * [Events with Backbone Views](http://backbonejs.org/#Events-listenTo).

__Practice 1__

* Create a class object with properties and methods, then instantiate it.
* Now create a child class object that inherits and modifies its parent's methods.
* Create a third object, non-related to previous ones. Make your child object a mixin from this third object.

__Practice 2__: Let's build our backbone app

* Create a firebase user and app, then install __firebase-tools__ and __bower__ on __c9.io__. Don't forget to `mkdir /ubuntu/tmp` folder.
* Deploy a basic template for backbone example to do app.
 
* [Open Data EMT](http://opendata.emtmadrid.es/Servicios-web/BUS).