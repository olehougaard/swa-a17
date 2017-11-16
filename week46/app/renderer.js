const model = require('./model.js')
const { ipcRenderer: ipc } = require('electron')

const imageView = document.getElementById('imageView')

imageView.src = model.current()
imageView.onclick = () => {
    model.next()
    imageView.src = model.current()
}

ipc.on('files-chosen', (e, files) => {
    model.show(files)
    imageView.src = model.current()
})
ipc.send('choose-files')
