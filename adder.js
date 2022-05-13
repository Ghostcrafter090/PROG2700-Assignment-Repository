function simulate(element, eventName) {
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType) throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        } else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    } else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source) {
      destination[property] = source[property];
    }
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}

function dummy() {}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

function randomClick(listn) {
    let i = 0;
    while (i < listn.length) {
        if (Math.random() > 0.9) {
            simulate(listn[i], "mousemove");
            console.log('mousemove');
        }
        if (Math.random() > 0.9) {
            simulate(listn[i], "mouseover");
            console.log('mouseover');
        }
        if (Math.random() > 0.5) {
            simulate(listn[i], "mousedown");
            console.log('mousedown');
        }
        if (Math.random() > 0.5) {
            simulate(listn[i], "mouseup");
            console.log('mouseup');
        }
        if (Math.random() > 0.9) {
            simulate(listn[i], "mouseout");
            console.log('mouseout');
        }
        if (listn[i].id != "cbb") {
            if (Math.random() > 0.5) {
                simulate(listn[i], "click");
                console.log('click');
            }
        }
        if (Math.random() > 0.5) {
            window.scroll(0, Math.random() * 2000);
        }
        sleep(Math.random() * 2000)
        console.log(listn[i])
        i = i + 1;
    }
}

function simUser() {
    randomClick(document.getElementsByTagName('div'))
    randomClick(document.getElementsByTagName('li'))
    randomClick(document.getElementsByTagName('ul'))
}

function init() {
    simUser();
    setTimeout(init, 1000);
}