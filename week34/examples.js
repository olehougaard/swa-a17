// || in JavaScript implementation
function my_and(a, b) {
    if (a)
        return b
    else
        return a
}

function my_or(a, b) {
    if (a)
        return a
    else
        return b
}

// Global initialization:
var global;

function add_values(x) {
    global = (global || 0) + x
}

function multiply(y) {
    return function(x) {
        return y * x
    }
}

var double = multiply(2)

var doubles = [1, 2, 3].map(double)
doubles = [1, 2, 3].map(function(x) { return 2 * x })

//ES 6
doubles = [1, 2, 3].map(x => x * 2)
