const express = require('express')
const model = require('./model.js')
const ai = require('./player.js')

const games = []

const gameserver = express()

gameserver.use (function(req, res, next) {
    req.setEncoding('utf8')
    req.body = new Promise(resolve => {
        let data=''
        req.on('data', function(chunk) { 
            data += chunk
         });
     
         req.on('end', function() {
             resolve(data)
             next();
         });
    })
});

gameserver.use(express.static('static'))

const newBoard = (_, res) => {
    games.push(model(games.length))
    res.send(games[games.length - 1].json())
}

gameserver.get('/clean', newBoard);
gameserver.post('/clean', newBoard);

gameserver.post('/move', (req, res) => {
    req.body
    .then(JSON.parse)
    .then( ({ x, y, gameNumber }) => {
        const game = games[gameNumber]
        if (game.legalMove(x,y)) {
            const afterMove = game.makeMove(x, y)
            const aiMove = ai(afterMove)
            if (aiMove) {
                const afterAI = afterMove.makeMove(aiMove.x, aiMove.y)
                games[gameNumber] = afterAI
                res.send(JSON.stringify({ 
                    moves: [{x, y, player: game.playerInTurn()}, Object.assign(aiMove, { player: afterMove.playerInTurn() })], 
                    inTurn: afterAI.playerInTurn(), 
                    winner: afterAI.winner(), 
                    stalemate: afterAI.stalemate() }))
            } else {
                games[gameNumber] = afterMove
                res.send(JSON.stringify({ 
                    moves: [{x, y, player: game.playerInTurn()}], 
                    inTurn: afterMove.playerInTurn(), 
                    winner: afterMove.winner(), 
                    stalemate: afterMove.stalemate()  }))
            }
        } else {
                res.send(JSON.stringify({ 
                    moves: [], 
                    inTurn: game.playerInTurn(), 
                    winner: game.winner(), 
                    stalemate: game.stalemate() }))
        }
    })
});


gameserver.listen(8080, () => console.log('Gameserver listening on 8080'))
