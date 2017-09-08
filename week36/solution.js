function Point(x, y) {
    return { x: x, y: y }
}

function Circle() {
    if (arguments.length === 3) 
        return { center: Point(arguments[0], arguments[1]), radius: arguments[2] }
    else
        return { center: arguments[0], radius: arguments[1]}
}

console.log(Circle(Point(2, 3), 8))
console.log(Circle(2, 3))
