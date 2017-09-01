var rect = {
    x: 2,
    y: 8,
    width: 100,
    height: 100,
    area: function() {return this.width * this.height}
}

function toString() {
    return 'x: ' + this.x + ', y: ' + this.y + ', width: ' + this.width + ', height: ' + this.height
}

rect.toString = toString

function createSequence() {
    var i = 0;
    return {
        next: function() {
            i++
            return i;
        },
        reset: function() { i = 0 }
    }
}
