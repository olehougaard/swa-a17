function reduce({ board, player }, action) {
    switch (action.type) {
    case 'move':
        if (board.playerInTurn == action.playerInTurn && board.legalMove(action)) {
            const afterMove = board.makeMove(action)
            const state = [ {board: afterMove, player} ]
            if (afterMove.playerInTurn != player) {
                state.push({ type: 'ai move', playerInTurn: afterMove.playerInTurn })
            }
            return state
        } else
            return [{board, player}]
    case 'reset':
        const cleanState = board.clear()
        if (action.as === 'X')
            return [{board: cleanState, player: 'X'}]
        else {
            return [{board: cleanState, player: 'O'}, { type: 'ai move', playerInTurn: 'X' }]
        }
        default:
            return [{board, player}]
    }
}

function store(init_state, update) {
    let state = { board: init_state, player: 'X' }

    function onAction(action) {
        newState = reduce(state, action)
        state = newState[0]
        const actions = newState.slice(1)
        update(view(state.board, state.player))
        actions.forEach(dispatch)
    }

    return { onAction, state: () => state.board, player: () => state.player }
}
