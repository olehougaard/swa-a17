var a = [1, 2, 3]

console.log(a.map(n => n + 1))

var o = {
    x: 1,
    inc(a) {
        return a.map(n => n + this.x)
    }
}
console.log(o.inc(a))

var o_wrong = {
    x: 1,
    inc: a => a.map(n => n + this.x)
}
console.log(o_wrong.inc(a))

function create_point(x = 100, y = 0, z = 0) {
    return { x, y, z }
}

console.log(create_point(0, 0, 0))

function create_array(a, b, c, d, ...e) {
    return [ a, b, c, d ].concat(e)
}
console.log(create_array('q', 'w', 'e', 'r', 't', 'y'))

let point = [100, 20, -30]
console.log(create_point(...point))

let {y} = create_point(...point)
console.log(y)

Number.prototype.fib = function() {
    if (this == 0) return 0;
    if (this == 1) return 1;
    return (this - 1).fib() + (this - 2).fib();
}
console.log((7).fib())
