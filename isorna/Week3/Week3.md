Week 3 Milestone
===================

## JSON & JSONP

* [JSON with padding](http://web.ontuts.com/tutoriales/jsonp-llamadas-ajax-entre-dominios/).
* [CORS](http://www.html5rocks.com/en/tutorials/cors/).

## Error handling

* Take a look at `error-handling.js` for code explanation.
* Don't use [`try / catch` statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch), due to memory.
* Talk about preventive error handling with function patterns.

## Object-oriented Programming

* In-depth explanation of objects.
* Private properties vs public properties.
* [How to simulate private properties](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties).
* [Introduction to Object-Oriented Programming](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript).
* More info:
 * [Create an object oriented javascript class constructor](http://www.htmlgoodies.com/html5/tutorials/create-an-object-oriented-javascript-class-constructor.html).
 * [__ECMA 6__ Object prototype constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

## Prototypes & Constructors (revisited)

* See `object-inheritance.js` for code explanation.

## Object hasOwnProperty & propertyIsEnumerable

* [Ownership of properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties).
* [hasOwnProperty explanation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty).
* [propertyIsEnumerable explanation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable).

## Bind, Call & Apply

* Review definition and uses.

## Mixins & inheritance

* [In-depth explanation of mixins, __functional mixins__ and __curry__](http://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/).

## Practice 1

* Use facebook login for our backbone app.
 * __Change the link to the latest version of firebase:__ `//cdn.firebase.com/js/client/1.1.3/firebase.js`.
 * [Setup callback url for your facebook app](https://www.firebase.com/docs/web/guide/login/facebook.html).
 * [Follow firebase login guidelines](https://www.firebase.com/docs/web/guide/user-auth.html).
 * [Set up firebase security rules](https://www.firebase.com/docs/security/guide/user-security.html).
 * Use firebase logged user data to show it's portrait when he's logged in.
* Use [Open Data EMT](http://opendata.emtmadrid.es/Servicios-web/BUS) for reading bus lines' information.

## Practice 2

* Create, Update & Delete from our firebase db (__push__, __update__, __remove__).
 * [Saving Data](https://www.firebase.com/docs/web/guide/saving-data.html).
 * [Retrieving Data](https://www.firebase.com/docs/web/guide/retrieving-data.html).
* __Open Data:__ [We'll use Firebase Open Data for SF transit information](https://www.firebase.com/docs/open-data/transit.html).