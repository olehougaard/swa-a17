const {div, h1, p, button, table, tbody, tr, td} = React.DOM;

function createMessage(model) {
    const winner = model.winner();
    if (winner)
        return p(null, winner.winner + ' won!')
    else    
        return p(null, 'Your turn, ' + model.playerInTurn())
}        

function createBoard(model) {
    return table(null, 
        tbody(null, null, ...model.board.map((row, i) => 
                tr(null, null, ...row.map ((tile, j) => 
                    td({
                        className: tile || 'blank',
                        onClick: () => dispatch({type:'move', x: i, y: j})
                    })
                ))    
        ))
    )    
}    

function view(model) {
    return div(null, 
        h1(null, 'Tic-tac-toe'), 
        createMessage(model), 
        createBoard(model), 
        button({ id: 'reset', onClick: () => dispatch({type: "reset"}) }, 'Reset'));
}

function update(view) {
    ReactDOM.render(view, document.body)
}
