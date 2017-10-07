const test = require('tape')
const model  = require('../model.js')

test('X starts', assert => {
    assert.equal('X', model().playerInTurn())
    assert.end()
})

test('Diagonals are winning', assert => {
    const m = model()
    m.makeMove(0, 0)
    m.makeMove(1, 0)
    m.makeMove(1, 1)
    m.makeMove(0, 1)
    m.makeMove(2, 2)
    assert.deepEqual({ winner: 'X', row: [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]} , m.winner())
    assert.end()
})

