const { app, BrowserWindow, dialog, Menu, ipcMain: ipc } = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')


const menu_template = [
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

const open_dialog = (options) => new Promise((resolve, reject) => {
    dialog.showOpenDialog(options, files => {
        if (files && files.length > 0)
            resolve(files)
        else
            reject()
    })
})

const save_dialog = (options) => new Promise((resolve, reject) => {
    dialog.showSaveDialog(options, files => {
        if (files)
            resolve(files)
        else
            reject()
    })
})

app.on('window-all-closed', () => {
    app.quit()
})
