

function throwStack (pcErrorMessage) {
    var oError = new Error(pcErrorMessage);
    
    return oError.stack;
};

// try catch (memory usage problems)

function ejemplo () {
    // ...
    try {
        var pepe = a + b;
    } catch (e) {
        throwStack(e);
    }
}