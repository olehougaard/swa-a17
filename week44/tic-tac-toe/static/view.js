function view(model, dispatch) {
    const {div, h1, p, button, table, tbody, tr, td} = React.DOM;
    
    function createMessage(model) {
        const { winner, stalemate } = model
        if (winner)
            return p(null, winner.winner + ' won!')
        else if (stalemate)
            return p(null, 'Stalemate')
        else    
            return p(null, 'Your turn, ' + model.inTurn)
    }        
    
    function createBoard(model) {
        return table(null, 
            tbody(null, null, ...model.board.map((row, i) => 
                    tr(null, null, ...row.map ((tile, j) => 
                        td({
                            className: tile || 'blank',
                            onClick: () => dispatch({type:'move', gameNumber: model.gameNumber, x: i, y: j})
                        })
                    ))    
            ))
        )    
    }    
    
    return div(null, 
    h1(null, 'Tic-tac-toe'), 
    createMessage(model), 
    createBoard(model), 
    button({ id: 'reset', onClick: () => dispatch({type: "reset", gameNumber: model.gameNumber}) }, 'Reset'));
}

function update(parent) {
    return view => ReactDOM.render(view, parent)
}
