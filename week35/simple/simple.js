var model = {
    numbers: [],
    add: function(n) { this.numbers.push(n) }
}

var view = {
    number: document.getElementById('number'),
    button: document.getElementById('click'),
    list: document.getElementById('list'),
    display: function(array) { this.list.value = array.join('\n') },
    listen: function(listener) { this.button.onclick = listener },
    value: function() { return Number(number.value) }
}

function createController(model, view) {
    return {
        addNumber: function() {
            model.add(view.value())
            view.display(model.numbers)
        }
    }
}

var controller = createController(model, view)

view.listen(controller.addNumber)
