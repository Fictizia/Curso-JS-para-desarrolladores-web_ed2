// Prototypes explanation

var objectOne = new functionOne();
// prints "Object {}" because constructor is an anonymous function
console.log(objectOne.__proto__);

var objectTwo = new functionTwo();
// prints "functionTwo {}" because constructor is a named function
console.log(objectTwo.__proto__);
