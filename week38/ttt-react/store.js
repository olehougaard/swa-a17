function reduce(state, action) {
    switch (action.type) {
        case 'move':
            const {x, y} = action
            if (state.legalMove(x, y))
                return state.makeMove(x, y)
            else
                return state
        case 'reset':
            return state.clear()
    }
}

function store(init_state) {
    let state = init_state

    function onAction(action) {
        state = reduce(state, action)
        update(view(state))
    }

    return { onAction, state: () => state }
}
