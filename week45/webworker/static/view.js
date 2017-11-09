const {div, h1, p, button, table, tbody, tr, td} = React.DOM;

function createMessage(model) {
    if (model.winner)
        return p(null, model.winner.winner + ' won!')
    else if (model.stalemate)
        return p(null, 'Stalemate.')
    else    
        return p(null, 'Your turn, ' + model.playerInTurn)
}        

function createBoard(model, player) {
    return table(null, 
        tbody(null, null, ...model.board.map((row, i) => 
                tr(null, null, ...row.map ((tile, j) => 
                    td({
                        className: tile || 'blank',
                        onClick: () => dispatch({type:'move', x: i, y: j, playerInTurn: player})
                    })
                ))    
        ))
    )    
}    

function view(model, player) {
    return div(null, 
        h1(null, 'Tic-tac-toe'), 
        createMessage(model), 
        createBoard(model, player), 
        button({ onClick: () => dispatch({type: "reset", as: 'X'}) }, 'New game as X'),
        button({ onClick: () => dispatch({type: "reset", as: 'O'}) }, 'New game as O'))
    }

const update = (parent) => (view) => ReactDOM.render(view, parent)
