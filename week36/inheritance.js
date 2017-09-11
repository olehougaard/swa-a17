var rect_proto = {
    area: function() {
        return this.width * this.height
    },
    resize: function(x_factor) {
        this.width *= x_factor
    }
}

var rect = Object.create(rect_proto)
rect.width = 100
rect.height = 100

console.log(rect.area())

var screen_rect_proto = {
    move: function(x, y) {
        this.x = x
        this.y = y
    }
}

var screenRect = Object.create(screen_rect_proto)
Object.assign(screenRect, rect, { x: 10, y: 20 })
