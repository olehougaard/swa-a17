// Colored point with prototypes
// "Instantiation"
function Point(x, y) {
    this.x = x
    this.y = y
}

Point.prototype = {
    move: function(dx, dy) {
        this.x += dx
        this.y += dy
    }
}

// Like var p = new Point(x, y)
function createPoint(x, y) {
    var p = Object.create(Point.prototype)
    Point.call(p, x, y)
    p.constructor = Point
    return p
}

// "Inheritance"
function ColoredPoint(x, y, color) {
    Point.call(this, x, y)
    this.color = color
}


ColoredPoint.prototype = {
    getColor: function() { return this.color }
}
Object.setPrototypeOf(ColoredPoint.prototype, Point.prototype)

// ES2015 (ES6):
class PointClass {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    move(dx, dy) {
        this.x += dx
        this.y += dy
    }
}

class ColoredPointClass extends PointClass {
    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }

    getColor() {
        return this.color
    }
}