const express = require('express')

const fileserver = express()

fileserver.use(express.static('static'))

fileserver.listen(8080, () => console.log('File server listening on 8080'))
