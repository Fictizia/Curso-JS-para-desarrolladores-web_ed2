// Arrow Functions ------------------------------------------------------------------//

// First syntax
([param] [, param]) => { statements };
 
// Second syntax
param => expression;

var numbers = [10, 21, 15, 8];
 
// prints "[true, false, false, true]"
console.log(
   numbers.map(number => number % 2 === 0)
);

var numbers = [10, 15, false, 'test', {}];
 
// prints "[true, false, false, false, false]"
console.log(
   numbers.map(number => {
      // The parameter is a number and it's an integer
      if (typeof number !== 'number' || number % 1 !== 0) {
         return false;
      }
      return number % 2 === 0;
   })
);

// Numbers ------------------------------------------------------------------//

var i;

// Number.isInteger(value)
Number.isInteger = Number.isInteger || function (number) {
   return typeof number === 'number' && Math.floor(number) === number;
};

Number.isInteger(i);

// Number.isNaN(value)
Number.isNaN = Number.isNaN || function (value) {
   return value !== value;
};

Number.isNaN(i);

// Number.isFinite(value)
Number.isFinite(i);

Number.isSafeInteger = Number.isSafeInteger || function (value) {
   return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
};

// Number.isSafeInteger(value)
Number.isSafeInteger(i);

// Number.parseInt(string, radix)
Number.parseInt = Number.parseInt || function () {
   return window.parseInt.apply(window, arguments); 
};

// Number.parseFloat(string)
Number.parseFloat = Number.parseFloat || function () {
   return window.parseFloat.apply(window, arguments); 
};

Number.parseInt(i);
Number.parseFloat(i);

// Strings ------------------------------------------------------------------//

var cSearchString, iPosition, iTimes;

if (typeof String.prototype.startsWith !== 'function') {
   String.prototype.startsWith = function (str){
      return this.indexOf(str) === 0;
   };
}

// String.prototype.startsWith(cSearchString [, iPosition ])

// String.prototype.endsWith(cSearchString [, iPosition ])

// String.prototype.contains(cSearchString [, iPosition ])

// String.prototype.repeat(iTimes)

// String.raw`template-string ${template-variable}`

var name = 'Aurelio De Rosa';
var result = String.raw`Hello, my name is ${name}`;
 
// prints "Hello, my name is Aurelio De Rosa" because ${name}
// has been replaced with the value of the name variable
console.log(result);

// Arrays ------------------------------------------------------------------//

// Array.from(arrayLike[, mapFn[, thisArg]]) 
function double(arr) {
   return Array.from(arguments, function(elem) {
      return elem * 2;
   });
}
 
var result = double(1, 2, 3, 4);
 
// prints [2, 4, 6, 8]
console.log(result);

// Array.prototype.find(callback[, thisArg])
var arr = [1, 2, 3, 4];
var result = arr.find(function(elem) {return elem > 2;});
 
// prints "3" because it's the first
// element greater than 2
console.log(result);

// Array.prototype.findIndex(callback[, thisArg])
var arr = [1, 2, 3, 4];
var result = arr.findIndex(function(elem) {return elem > 2;});
 
// prints "2" because is the index of the
// first element greater than 2
console.log(result);

// Array.prototype.keys()
var arr = [1, 2, 3, 4];
var iterator = arr.keys();
 
// prints "0, 1, 2, 3", one at a time, because the 
// array contains four elements and these are their indexes
var index = iterator.next();
while(!index.done) {
   console.log(index.value);
   index = iterator.next();
}

// Array.prototype.values()
var arr = [1, 2, 3, 4];
var iterator = arr.values();
 
// prints "1, 2, 3, 4", one at a time, because the 
// array contains these four elements
var index = iterator.next();
while(!index.done) {
   console.log(index.value);
   index = iterator.next();
}

// Array.prototype.fill(value[, start[, end]])
var arr = new Array(6);
// This statement fills positions from 0 to 2
arr.fill(1, 0, 3);
// This statement fills positions from 3 up to the end of the array
arr.fill(2, 3);
 
// prints [1, 1, 1, 2, 2, 2]
console.log(arr);

// Array Comprehension
var numbers = [3,6,9,12];
var doubled = [ for (i of numbers) i + 4 ];
alert(doubled); // Alerts 7,10,13,15

// Generators ------------------------------------------------------------------//
function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}
 
let seq = fibonacci();
print(seq.next()); // 1
print(seq.next()); // 2
print(seq.next()); // 3
print(seq.next()); // 5
print(seq.next()); // 8

// Recursive Generator
function* recursivelyIterateThrough( something ) {
    if ( timeToStop() ) {
        yield whatever();
    }
    yield* recursivelyIterateThrough( moreWork );
}