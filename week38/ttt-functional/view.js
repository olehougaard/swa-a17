function createTextElement(tagName, text, attributes) {
    const element = document.createElement(tagName)
    for(att in attributes) 
        element.setAttribute(att, attributes[att])
    element.textContent = text
    return element
}

function appendAll(node, children) {
    children.forEach(node.appendChild.bind(node))
}

function createParentElement(tagName, attributes) {
    return children => {
        const element = document.createElement(tagName)
        for(att in attributes) 
            element.setAttribute(att, attributes[att])
        appendAll(element, children)
        return element
    }
}

function createMessage(model) {
    const winner = model.winner();
    if (winner)
        return createTextElement('p', winner.winner + ' won!')
    else
        return createTextElement('p', 'Your turn, ' + model.playerInTurn())
}

function createBoard(model, controller) {
    return createParentElement('table')(
        model.board.map( (row, i) => {
            return createParentElement('tr')(row.map ( (tile, j) => {
                const td = createTextElement('td', '', {
                    'class': tile || 'blank'
                });
                td.onclick= controller.clickBoard.bind(controller, i, j)
                return td
            }));
        })
    );
}

function resetButton(controller) {
    const button = createTextElement('button', 'Reset', { id: 'reset' })
    button.onclick = controller.clickReset.bind(controller)
    return button
}

function view(model, controller) {
    return [
        createTextElement('h1', 'Tic-tac-toe'), 
        createMessage(model), 
        createBoard(model, controller), 
        resetButton(controller)];
}

function update(view) {
    const body = document.body
    while(body.firstChild) body.removeChild(body.firstChild)
    appendAll(body, view)
}
