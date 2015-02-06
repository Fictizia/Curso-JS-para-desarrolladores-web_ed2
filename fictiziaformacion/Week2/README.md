Week 2 Milestone
===================

## Last Week Recap

* Code style guide review.
 * Don't use __DOM Reflows__, use [__DocumentFragment__](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) instead.

* In-depth explanation of functions:
 * Parameters, arguments and `this` keyword.
 * [`call()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
 * [`apply()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
 * [`bind()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

* In-depth explanation of objects:
 * [__ECMA 6__ Object prototype constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

### Concepts

* A __polyfill__, or polyfiller, is a piece of code (or plugin) that provides the technology that you, the developer, expect the browser to provide natively.
* [Immediately-invoked function expression](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression).
* [Model-View-Controller (MVC)](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).

### Backbone.js & underscore.js

* [Backbone To Do app](http://backbonejs.org/examples/todos/index.html).
 * [See annotated code](http://backbonejs.org/docs/todos.html).
* [Backbone](http://backbonejs.org/) app structure.
 * [Models](http://backbonetutorials.com/what-is-a-model/).
 * Collections.
 * Templates.
 * Views.
* [Backbone Tutorials](http://backbonetutorials.com/).
* [Underscore method proxies within Backbone](http://underscorejs.org/#without).
* [Events with Backbone Views](http://backbonejs.org/#Events-listenTo).

### Prototypes

* [Prototype inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype).
* Take a look at `prototypes.js` for code explanation.

### Mixins & inheritance

* Mixins give all the benefits of multiple inheritance, without hierarchy (prototypal inheritance in JavaScript). They both allow you to reuse an interface (or set of functions) on multiple objects.
* Take a look at `mixins.js` for code explanation.

### Events

* [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) interface, properties and methods.
* __This__ differences when assigning an [event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener).
* Remove event listener for memory conservation.

### Error handling

* Take a look at `error-handling.js` for code explanation.
* Don't use `try / catch` statements, due to memory.
* Talk about preventive error handling with function patterns.

### HTTP Requests

* [Using XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest).
* [XMLHttpRequest Reference](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).
* Take a look at `http-request.js` for code explanation.

### JSON & JSONP

* [JSON with padding](http://web.ontuts.com/tutoriales/jsonp-llamadas-ajax-entre-dominios/).

### Code optimization

* [Coercion in JavaScript](http://blog.taylormcgann.com/2014/01/07/coercion-javascript/).

### Practice 1

* Create a class object with properties and methods, then instantiate it.
* Now create a child class object that inherits and modifies its parent's methods.
* Create a third object, non-related to previous ones. Make your child object a mixin from this third object.

### Practice 2: Let's build our backbone app

* Create a firebase user and app, then install __firebase-tools__ and __bower__ on __c9.io__. Don't forget to `mkdir /ubuntu/tmp` folder.
* Deploy a basic template for backbone example to do app.