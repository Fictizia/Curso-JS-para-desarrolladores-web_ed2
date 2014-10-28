var theThing = null;
// helps us to differentiate the leaked objects in the debugger
var cnt = 0;
var replaceThing = function() {
    var originalThing = theThing;
    var unused = function() {
        // originalThing is used in the closure and hence ends up in the lexical environment shared by all closures in that scope
        if (originalThing) {
            console.log("hi");
        }
    };
    // originalThing = null; // <- nulling originalThing here tells V8 gc to collect it 
    theThing = {
        longStr: (++cnt) + '_' + (new Array(1000000).join('*')),
        someMethod: function() { // if not nulled, original thing is now attached to someMethod -> <function scope> -> Closure
            console.log(someMessage);
        }
    };
};
setInterval(replaceThing, 1000);