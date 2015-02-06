Week 1 Milestone
===================

* Setup git: `git config remote.origin.push HEAD`.

* Review JavaScript.
 * Talk briefly about modern JavaScript engines: __Chrome V8__, __Firefox SpiderMonkey__, __IE Chakra__, __Opera Carakan__.
 * More info: 
 * [A re-introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript).
 * [Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

* How memory management works within browsers.
 * Each __function__ has an associated __context__, and each context has a pointer to each parent and child context it's related to.
 * The __scope__ is determined by the function that wrap our code.
 * A __closure__ is the combination of a function and the scope object in which it was created. So every closure inside the same scope has access the context used in that scope.
 * Always assing `null` to a closure var after using it:
```javascript
var closureVar = {};
doWork(function callback() {
  var data = closureVar.usefulData;
  // Do a bunch of work
  closureVar = null;
});
```
 * Load `memory-management.js` in `about:blank` page's console, then go to Timeline > Memory and see differences when the variable is nullified or not. Whenever an object is referenced inside a closure, it's never GC'ed until nullified (in V8).
 * If there's a reference between a DOM element and an event, there'll be a leak until that reference is removed.
 * More info: 
  * [Writting fast memory efficient javascript](http://www.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/).
  * [An Interesting Kind of Javascript Memory Leak](https://www.meteor.com/blog/2013/08/13/an-interesting-kind-of-javascript-memory-leak).
  * [Grooking V8 Closures for fun](http://mrale.ph/blog/2012/09/23/grokking-v8-closures-for-fun.html).
  * [A surprising JavaScript memory leak found at Meteor](http://point.davidglasser.net/2013/06/27/surprising-javascript-memory-leak.html).
  * [Finding memory Leaks in Gmail](https://docs.google.com/presentation/d/1wUVmf78gG-ra5aOxvTfYdiLkdGaR9OhXRnOlIcEmu2s/pub?start=false&loop=false&delayms=3000#slide=id.g1d65bdf6_0_0).

* Code style guide review.
 * Use function's __Module pattern with cached functions__.
 * Don't change variables type (hidden class), be __monomorphic__.
 * Always define __Array__ vars min length, grow as you need. All elements inside an Array should be of the same type.
 * If you need an index for a collection, use an __Array__, otherwise use an __Object__.
 * Clean up observers, and nullify unused vars.
 * Don't use __DOM Reflows__, use [__DocumentFragment__](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) instead.

* In-depth explanation of variables.
 * [Data Structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures).

* In-depth explanation of functions:
 * Parameters, arguments and `this` keyword.
 * [`call()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
 * [`apply()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
 * [`bind()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

* In-depth explanation of objects:
 * Private properties vs public properties.
 * [How to simulate private properties](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties).
 * [Introduction to Object-Oriented Programming](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript).
 * More info:
 * [Create an object oriented javascript class constructor](http://www.htmlgoodies.com/html5/tutorials/create-an-object-oriented-javascript-class-constructor.html).
 * [__ECMA 6__ Object prototype constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).
 

* Practice:
 * Apply this week's knowledge to build a memory leaking closure.
 * Create a class object with properties and methods, then instantiate it.
 * Now create a child class object that inherits and modifies its parent's methods.