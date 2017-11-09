const ai = model => {
    const array = (length, init) => Array.apply(null, new Array(length)).map(init || (_ => undefined))
    const moves = [].concat.apply([], array(3, (_, x) => array(3, (_, y) => ({ x, y }))))
    const findOrReject = p => {
        const recur = a => new Promise((resolve, reject) => setImmediate(() => {
            if (a.length === 0)
                    reject(false)
            else {
                p(a[0])
                .then(b => b ? resolve(a[0]) : recur(a.slice(1)).then(resolve).catch(reject))
                .catch(() => recur(a.slice(1)).then(resolve).catch(reject))
            }
        }))
        return recur
    }

    const winningMove = model => findOrReject(m => {
            const moved = model.makeMove(m)
            if (moved.stalemate) return Promise.reject(false)
            if (moved.winner) return Promise.resolve(m)
            return winningMove(moved)
                .then(() => false)
                .catch(() => stalemateMove(moved))
                .then(() => false)
                .catch(() => m)
        })(moves.filter(model.legalMove))

    const stalemateMove = (model) => 
        findOrReject(m => {
            const moved = model.makeMove(m)
            if (moved.winner) return Promise.reject(false)
            if (moved.stalemate) return Promise.resolve(m)
            return winningMove(moved).then(() => false).catch(() => m)
        })(moves.filter(model.legalMove))

    return winningMove(model)
        .catch(() => stalemateMove(model))
        .catch(() => moves.some(model.legalMove)? Promise.resolve(moves.find(model.legalMove)) : Promise.reject(false))
}
