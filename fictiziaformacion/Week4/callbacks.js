// Example callback implementation

function onTimeout_callback () {
    console.log('callback done');
}

function testCallback (pfCallback) {
    // be sure that callback argument is a function object
    if (typeof pfCallback === "function") {
        window.setTimeout(pfCallback, 2000);
    }
}

testCallback(onTimeout_callback);

