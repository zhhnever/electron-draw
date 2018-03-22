'use strict'

import { app, BrowserWindow, Menu, Tray, ipcMain, dialog, shell } from 'electron'
import os from 'os'
import fs from 'fs'
import path from 'path'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 900,
    useContentSize: true,
    width: 1600
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const menuTemplate = [
  {
    label: '文件',
    submenu: [
      {
        label: '打开',
        click () {
          dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{name: '数图文件', extensions: ['json']}]
          }, function (file) {
            if (file) mainWindow.webContents.send('selected-file', file)
          })
        },
        accelerator: 'CmdOrCtrl+O'
      },
      {
        label: '保存',
        role: 'save',
        accelerator: 'CmdOrCtrl+S',
        click () {
          const options = {
            title: '保存文件',
            filters: [
              { name: '数图文件', extensions: ['json'] }
            ]
          }
          dialog.showSaveDialog(options, function (filename) {
            mainWindow.webContents.send('saved-file', filename)
          })
        }
      },
      {
        type: 'separator'
      },
      {
        label: '关闭',
        role: 'close',
        accelerator: 'CmdOrCtrl+X'
      }
    ]
  },
  {
    label: '帮助',
    submenu: [
      {
        role: '关于我们'
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
ipcMain.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{name: '数图文件', extensions: ['json']}]
  }, function (file) {
    if (file) event.sender.send('selected-file', file)
  })
})
ipcMain.on('save-file-dialog', function (event) {
  const options = {
    title: '保存文件',
    filters: [
      { name: '数图文件', extensions: ['json'] }
    ]
  }
  dialog.showSaveDialog(options, function (filename) {
    event.sender.send('saved-file', filename)
  })
})

ipcMain.on('print-to-pdf', function (event) {
  const pdfPath = path.join(os.tmpdir(), 'print.pdf')
  const win = BrowserWindow.fromWebContents(event.sender)
  // Use default printing options
  mainWindow.webContents.printToPDF({}, function (error, data) {
    if (error) throw error
    fs.writeFile(pdfPath, data, function (error) {
      if (error) {
        throw error
      }
      shell.openExternal('file://' + pdfPath)
      event.sender.send('wrote-pdf', pdfPath)
    })
  })
})
