const { app, BrowserWindow, dialog, Menu, ipcMain: ipc } = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

const menu_template = [
    {
        label: 'File',
        submenu: [
            { 
                role: 'quit' 
            },
            {
                type: 'separator'  
            },
            {
                label: 'Open',
                accelerator: 'CmdOrCtrl+O',
                click(_, window) {
                    choose_files()
                    .then(files => window.webContents.send('files-chosen', files))
                    .catch(console.err) 
                }
            }
        ],
    },
    {
        label: 'Advanced',
        submenu: [
            {
                'label': 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+J' : 'Ctrl+Shift+J',
                click(_, window) {
                    if (window) window.webContents.toggleDevTools()
                }
            }
        ]
    }
]

const choose_files_with_callback = (callback, error) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, dirs => {
        if (dirs && dirs.length > 0) {
            fs.readdir(dirs[0], (err, files) => {
                if (err) 
                    error(err)
                else
                    callback(files.map(f => path.join(dirs[0], f)))
            })
        } else
            error('Cancelled')
    })
}

const open_dialog = (options) => new Promise((resolve, reject) => {
    dialog.showOpenDialog(options, files => {
        if (files && files.length > 0)
            resolve(files)
        else
            reject()
    })
})
const dir = (folder) => new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => {
        if (err)
            reject(err)
        else
            resolve(files.map(f => path.join(folder, f)))
    })
})
const choose_files = () => 
    open_dialog({properties:['openDirectory']})
    .then(d => d[0])
    .then(dir)

app.on('ready', () => {
    const mainWindow = new BrowserWindow({height: 720, width: 1280})
    mainWindow.loadURL(url.format({
        protocol:'file', 
        pathname:  path.join(__dirname, '/app/index.html')
    }))
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu_template))
})

ipc.on('choose-files', event =>
    choose_files()
    .then(files => event.sender.send('files-chosen', files))
    .catch(console.err)
)
ipc.on('echo', (_, ...data) => console.log(...data))

app.on('window-all-closed', () => {
    app.quit()
})
