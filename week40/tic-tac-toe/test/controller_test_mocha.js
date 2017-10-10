const controller  = require('../controller.js')
const model  = require('../model.js')
const chai = require('chai')
chai.use(require('chai-spies'))

describe('Controller', () => {
    const v = chai.spy.object(['showWinner', 'showInTurn', 'updateBoard'])
    const m = chai.spy.object({winner() {}, playerInTurn: () => 'X', clear() {}, legalMove: () => true, makeMove() {} } )
    m.board = []
    const c = controller(v, m)
    
    it('Should call the models reset when reset is clicked', () => {
        c.clickReset()
        chai.expect(m.clear).to.have.been.called()
    })

    it('Should update the board when board is clicked', () => {
        c.clickBoard(1, 1)
        chai.expect(v.updateBoard).to.have.been.called.with(m.board)
    })

    it('Should show next turn when board is clicked', () => {
        c.clickBoard(1, 1)
        chai.expect(v.showInTurn).to.have.been.called.with(m.playerInTurn())
    })
})
