const test = require('tape')
const controller  = require('../controller.js')
const model  = require('../model.js')

test('Click on reset resets model', assert => {
    assert.plan(1)
    const v = { showWinner(){}, showInTurn(){}, updateBoard(){} }
    const m = { winner(){}, playerInTurn(){}, clear() { assert.true(true) } }
    const c = controller(v, m)
    c.clickReset()
})


test('Click on board updates board and shows next turn', assert => {
    assert.plan(4)
    const m = model()
    const v = { showWinner(){}, showInTurn(t){ assert.equals(t, m.playerInTurn()) }, updateBoard(b){ assert.equals(m.board, b) } }
    const c = controller(v, m)
    c.clickBoard(1, 1)
})
