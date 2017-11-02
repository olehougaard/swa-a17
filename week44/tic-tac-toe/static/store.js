function reduce(state, action) {
    switch (action.type) {
        case 'move':
            const { moves, inTurn, winner, stalemate } = action
            const board = state.board.map(x => x.slice())
            moves.forEach(({x, y, player}) => board[x][y] = player)
            return { board, inTurn, winner, stalemate, gameNumber: state.gameNumber }
        case 'reset':
            return action.model
    }
}

function store(init_state, update, view) {
    let state = init_state

    function onAction(action) {
        state = reduce(state, action)
        update(view(state))
    }

    return { onAction }
}
