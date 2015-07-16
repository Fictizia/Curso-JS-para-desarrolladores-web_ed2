// Add an event listener
function body_onClick (event) {
    console.log(event.target)
};

document.body.addEventListener('click', body_onClick);

// Remove event listener
document.body.removeEventListener('click', body_onClick);

// CHROME: search event listeners
console.log(getEventListeners(document.body)['click']);

// JQUERY listHandlers
// http://james.padolsey.com/javascript/debug-jquery-events-with-listhandlers/
$.fn.listHandlers = function(events, outputFunction) {
    return this.each(function(i){
        var elem = this,
            dEvents = $(this).data('events');
        if (!dEvents) {return;}
        $.each(dEvents, function(name, handler){
            if((new RegExp('^(' + (events === '*' ? '.+' : events.replace(',','|').replace(/^on/i,'')) + ')$' ,'i')).test(name)) {
               $.each(handler, function(i,handler){
                   outputFunction(elem, '\n' + i + ': [' + name + '] : ' + handler );
               });
           }
        });
    });
};

// Without JQUERY: polyfill
var fOriginal_addEventListener = EventTarget.prototype.addEventListener,
    window.eventListeners = []; // store original
EventTarget.prototype.addEventListener = function(type, fn, capture) {
  this.fNew_addEventListener = fOriginal_addEventListener;
  this.fNew_addEventListener(type, fn, capture); // call original method
  alert('Added Event Listener: on' + type);
  // store global event listeners
  window.eventListeners.push([type, fn, capture]);
}

// StopPropagation

function body_onClick2(event){
    console.log(event.target);
    event.stopPropagation();
}

document.body.addEventListener('click', body_onClick2);

// PreventDefault

function a_onClick(event){
    console.log(event.target.href);
    event.preventDefault();
}

document.querySelector('a.logo').addEventListener('click', a_onClick);