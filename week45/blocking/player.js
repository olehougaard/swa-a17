const ai = model => {
    const array = (length, init) => Array.apply(null, new Array(length)).map(init || (_ => undefined))
    const moves = [].concat.apply([], array(3, (_, x) => array(3, (_, y) => ({ x, y }))))
    const notInTurn = model => model.playerInTurn === 'X' ? 'O' : 'X'

    const legalMoves = model => moves.filter(model.legalMove)
    const isLost = model => model.isWinner(notInTurn(model)) || !model.stalemate && !winningMove(model) && !stalemateMove(model)
    const isUnwinnable = model => !model.isWinner(model.playerInTurn) && !winningMove(model)
    const winningMove = model => legalMoves(model).find(m => isLost(model.makeMove(m)))
    const stalemateMove = model => legalMoves(model).find(m =>isUnwinnable(model.makeMove(m)))

    return winningMove(model) || stalemateMove(model) || moves.find(model.legalMove)
}
