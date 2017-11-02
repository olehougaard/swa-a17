module.exports = model => {
    const array = (length, init) => Array.apply(null, new Array(length)).map(init || (_ => undefined))
    const moves = [].concat.apply([], array(3, (_, x) => array(3, (_, y) => ({ x, y }))))

    function winningMove(model) {
        const legal_moves = moves.filter(({x, y}) => model.legalMove(x, y))
        return legal_moves.find(({x, y}) => {
            const moved = model.makeMove(x, y)
            return !moved.stalemate() && !winningMove(moved) && !stalemateMove(moved)
        })
    }

    function stalemateMove(model) {
        const legal_moves = moves.filter(({x, y}) => model.legalMove(x, y))
        return legal_moves.find(({x, y}) => {
            const moved = model.makeMove(x, y)
            return !moved.winner() && !winningMove(moved)
        })
    }

    const win = winningMove(model)
    if (win) return win
    const mate = stalemateMove(model)
    if (mate) return mate
    return moves.find(({x, y}) => model.legalMove(x, y))
}
