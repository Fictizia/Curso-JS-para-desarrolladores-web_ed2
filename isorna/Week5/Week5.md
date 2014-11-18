Week 5 Milestone
===================

## JavaScript Design Patterns

* __Constructor Pattern__
 * Object constructors are used to create specific types of objects - both preparing the object for use and accepting arguments which a constructor can use to set the values of member properties and methods when the object is first created.
 * Take a look at `constructor-pattern.js` for code explanation.
* __[Module Pattern](https://carldanley.com/js-module-pattern/)__
 * Modules are an integral piece of any robust application's architecture and typically help in keeping the units of code for a project both cleanly separated and organized.
 * Take a look at `module-pattern.js` for code explanation.

* __Creational__: Based on the concept of creating an object.
 * __[Factory Method](http://javascript.info/tutorial/factory-constructor-pattern)__: Creates an instance of several derived classes. See `factory-pattern.js` for code example.
 * __Abstract Factory__: Creates an instance of several families of classes without detailing concrete classes.
 * __Builder__: Separates object construction from its representation, always creates the same type of object.
 * __Prototype__: A fully initialized instance used for copying or cloning.
 * __[Singleton](https://carldanley.com/js-singleton-pattern/)__: A class with only a single instance with global access points. See `singleton-pattern.js` for code example.

* __Structural__: Based on the idea of building blocks of objects.
 * __Adapter__: Match interfaces of different classes therefore classes can work together despite incompatible interfaces.
 * __Bridge__: Separates an object's interface from its implementation so the two can vary independently.
 * __Composite__: A structure of simple and composite objects which makes the total object more than just the sum of its parts.
 * __Decorator__: Dynamically add alternate processing to objects.
 * __Facade__: A single class that hides the complexity of an entire subsystem.
 * __Flyweight__: A fine-grained instance used for efficient sharing of information that is contained elsewhere.
 * __Proxy__: A place holder object representing the true object.

* __Behavioral__: Based on the way objects play and work together.
 * __Interpreter__: A way to include language elements in an application to match the grammar of the intended language.
 * __Template Method__: Creates the shell of an algorithm in a method, then defer the exact steps to a subclass.
 * __Chain of Responsibility__: A way of passing a request between a chain of objects to find the object that can handle the request.
 * __Command__: Encapsulate a command request as an object to enable, logging and/or queuing of requests, and provides error-handling for unhandled requests.
 * __Iterator__: Sequentially access the elements of a collection without knowing the inner workings of the collection.
 * __Mediator__: Defines simplified communication between classes to prevent a group of classes from referring explicitly to each other.
 * __Memento__: Capture an object's internal state to be able to restore it later.
 * __Observer__: A way of notifying change to a number of classes to ensure consistency between the classes.
 * __State__: Alter an object's behavior when its state changes.
 * __Strategy__: Encapsulates an algorithm inside a class separating the selection from the implementation.
 * __Visitor__: Adds a new operation to a class without changing the class.

* [Learning JavaScript Design Patterns Book](http://addyosmani.com/resources/essentialjsdesignpatterns/book/) (theory).
* [Modern take on JavaScript Design Patterns](https://carldanley.com/javascript-design-patterns/).

## MVC, MVV, MVVC, MV*

* _Thursday class_ __[JavaScript MV* Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvcmvp)__.

## AngularJS introduction

* _Thursday class_[example app](fictizia-angularjs.firebaseapp.com).

## Firebase

* Review your app [User Based Security](https://www.firebase.com/docs/security/guide/user-security.html) so that each user can only read it's data.
* [Saving Data](https://www.firebase.com/docs/web/guide/saving-data.html).
* [Retrieving Data](https://www.firebase.com/docs/web/guide/retrieving-data.html).
* [Security & Rules on Firebase](https://www.firebase.com/docs/security/quickstart.html).

## Practice

* Create a javascript library for today's practice (no Backbone required).
 * Use the __Constructor Pattern__ to build a vehicle constructor, using [SF-Muni data of vehicles](https://publicdata-transit.firebaseio.com/sf-muni) as a pattern.
 * Made the same with a routes constructor.
 * Define a module for our app, using the Module Pattern to provide methods for managing our routes and vehicles.
 * Now build a factory builder for our vehicles (using `vtype` as our type definition), and replace it inside our module.
 * Finally, use the __Singleton Pattern__ to build a library for our application.

* Create, Update & Delete from our firebase db (__push__, __update__, __remove__).
 * __Once the user is logged-in__, show a list of bus routes.
 * Let the user __save the routes as favorites in our DB__.
 * __Create a view for each route__, showing where each vehicle is.
 * Build objects based on our vehicles and routes, so that each one inherit methods and properties based on their logical parents.