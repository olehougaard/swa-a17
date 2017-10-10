const { expect } = require('chai')
const model  = require('../model.js')

describe('model', () => {
    it('should start with X in turn', () => {
        console.log(expect(5))
        expect(model().playerInTurn()).to.equal('X')
    })
    it('should count diagonals as a winning move', () => {
        const m = model()
        m.makeMove(0, 0)
        m.makeMove(1, 0)
        m.makeMove(1, 1)
        m.makeMove(0, 1)
        m.makeMove(2, 2)
        expect(m.winner()).to.eql({ winner: 'X', row: [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}]})
    })
})
