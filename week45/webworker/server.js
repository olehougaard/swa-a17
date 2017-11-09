const express = require('express')

const games = []

const gameserver = express()

gameserver.use(express.static('static'))

gameserver.listen(8080, () => console.log('Gameserver listening on 8080'))
