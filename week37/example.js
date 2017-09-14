// Colored point with prototypes
point_prototype = {
    move: function(dx, dy) {
        this.x += dx
        this.y += dy
    }
}

// "Instantiation"
function Point(x, y) {
    var p = Object.create(point_prototype)
    p.x = x
    p.y = y
    return p
}

colored_point_prototype = {
    getColor: function() { return this.color }
}

// "Inheritance"
function ColoredPoint(x, y, color) {
    var cp = Object.create(Point(x, y))
    cp.color = color
    return cp
}

