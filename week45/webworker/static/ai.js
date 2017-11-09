importScripts('model.js', 'player.js')
addEventListener('message', e => {
    const m = model.fromJSON(e.data)
    const aiMove = ai(m)
    if (aiMove) {
        aiMove.type = 'move'
        aiMove.playerInTurn = m.playerInTurn
        self.postMessage(aiMove)
    }
})
