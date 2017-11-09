function reduce(state, action) {
    switch (action.type) {
    case 'move':
        if (state.legalMove(action)) {
            const afterMove = state.makeMove(action)
            const aiMove = ai(afterMove)
            if (aiMove)
                return afterMove.makeMove(aiMove)
            else
                return afterMove
        } else
            return state
    case 'reset':
        const cleanState = state.clear()
        if (action.as === 'X')
            return cleanState
        else {
            const aiMove = ai(cleanState)
            return cleanState.makeMove(aiMove)
        }
    }
}

function store(init_state, update) {
    let state = init_state

    function onAction(action) {
        state = reduce(state, action)
        update(view(state))
    }

    return { onAction, state: () => state }
}
