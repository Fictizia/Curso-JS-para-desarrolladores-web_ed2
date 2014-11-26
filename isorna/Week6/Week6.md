Week 6 Milestone
===================

## Browser localStorage and sessionStorage

* [DOM Storage](http://diveintohtml5.info/storage.html).
* Take a look at `browser-localstorage.js` for code explanation.

## Testing

* [Unit Testing](http://www.smashingmagazine.com/2012/06/27/introduction-to-javascript-unit-testing/).
 * [AngularJS Unit Testing](https://docs.angularjs.org/guide/unit-testing).
 * [Jasmine](http://jasmine.github.io/) and [Karma](http://karma-runner.github.io/0.12/index.html).
 * [QUnit for  jQuery](http://qunitjs.com/).
 * [Unitjs for Node.js](http://unitjs.com/).
* E2E Testing.
 * [AngularJS E2E Testing](https://docs.angularjs.org/guide/e2e-testing).
 * [Protractor for AngularJS](http://angular.github.io/protractor/#/).

## ECMA 6

* [Let and const](http://www.sitepoint.com/preparing-ecmascript-6-let-const/).
* [Function syntax](http://www.sitepoint.com/preparing-ecmascript-6-new-function-syntax/).
* [Numbers](http://www.sitepoint.com/preparing-ecmascript-6-new-number-methods/).
* [Strings](http://www.sitepoint.com/preparing-ecmascript-6-new-string-methods/).
* [Arrays](http://www.sitepoint.com/preparing-ecmascript-6-new-array-methods/).
* [Map and WeakMap](http://www.sitepoint.com/preparing-ecmascript-6-map-weakmap/).
* [Set and WeakSet](http://www.sitepoint.com/preparing-ecmascript-6-set-weakset/).
* [Generators](https://carldanley.com/ecmascript-6-generators/).
* Take a look at `ecma6.js` for code explanation.
* [ES6-Shim](https://github.com/paulmillr/es6-shim/).

## noBackend

* [The noBackend initiative](http://nobackend.org/).

## noSQL & MongoDB

* [NoSQL database list](http://nosql-database.org/).
* [NoSQL explained by MongoDB](http://www.mongodb.com/nosql-explained).
* [MongoLab: MongoDB Hosting](https://mongolab.com/).
* [Tutorial: getting started with Mongo Shell](http://docs.mongodb.org/manual/tutorial/getting-started-with-the-mongo-shell/).
* [NoSQL explained by Couchbase](http://www.couchbase.com/nosql-resources/what-is-no-sql).

## Grunt, Gulp, Bower, Yeoman

* [Introduction to Grunt](http://www.blog.teraswap.com/grunt-introducion/).
* [Introduction to Gulp](http://www.blog.teraswap.com/gulp-introduccion/).
* [Using Grunt for live reload](http://thecrumb.com/2014/03/15/using-grunt-for-live-reload/).
* __Installation:__
 * [`npm install -g grunt-cli`](http://gruntjs.com/getting-started)
 * [`npm install -g grunt-init`](http://gruntjs.com/project-scaffolding)
 * `grunt-init --help`
* Install Grunt __inside your app folder__ with `npm install grunt`.
* [Install some grunt templates](https://github.com/gruntjs/).
 * `git clone https://github.com/gruntjs/grunt-init-gruntfile.git ~/.grunt-init/gruntfile`.
 * `grunt-init gruntfile`.
* Add `name` and `version` properties to your package.json file.
* Install `package.json` dependencies __inside your app folder__ with `sudo npm install`.
* Add a new dependency to your Gruntfile with `__sudo__ npm install <module> --save-dev`.
 * `__sudo__ npm install grunt-contrib-watch --save-dev`
* [Configure your Gruntfile watch process](https://github.com/gruntjs/grunt-contrib-watch).
* Start the watch process with `grunt watch`, then modify any .js file and save it.

* [Gulp.js](http://gulpjs.com/).
* [Bower](http://bower.io/).
* [Yeoman](http://yeoman.io/learning/index.html).

## Practice

* Finish our web app.
* Create a MongoLab account, then connect with it from c9 terminal and create a new collection, to see it works.

* Configure Gruntfile.js and package.json files inside your app.
* Add a dependency to `firebase-tools v 1.1.4` inside your package.json.
* Then run `sudo npm install` again to update the local project.