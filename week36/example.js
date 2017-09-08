// Point/ColorPoint with mixins
function Moving(state) {
    return {
        move: function(dx, dy) {
            this.x += dx
            this.y += dy
        }
    }
}

function Point(state) {
    var p = {
        x: state.x,
        y: state.y
    }
    Object.assign(p, Moving(state))
    return p
}

function Colored(state) {
    return {
        color: state.color,
        getColor: function() { return this.color }
    }
} 

function ColoredPoint(state) {
    var p = Point(state)
    Object.assign(p, Colored(state))
    return p
}

//console.log(ColoredPoint({x: 10, y: 20, color: 'Red'}))

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

// "Inheritance"
function ColoredPoint(x, y, color) {
    var cp = Object.create(Point(x, y))
    cp.color = color
    return cp
}

console.log(ColoredPoint(10, 20, 'Red'))
