// Mixins explanation

// function mixin
function mixin (poTarget, poSource) {
    function copyProperty (poKey) {
        poTarget[poKey] = poSource[poKey];
    }

    if (arguments.length > 2) {
        // If there are arguments beyond target and source then treat them as
        // keys of the specific properties/methods that should be copied over.
        Array.prototype.slice.call(arguments, 2).forEach(copyProperty);
    } else {
        // Otherwise copy all properties/methods from the source to the target.
        Object.keys(poSource).forEach(copyProperty);
    }
};

// Object protoype mixin
Object.prototype.addMixin = function (poMixin) {
    var poProperty = {};
    
    for (poProperty in poMixin) {
        if (poMixin.hasOwnProperty(poProperty)) {
            this.prototype[poProperty] = poMixin[poProperty];
        }
    }
};

