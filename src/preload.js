const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  switch: (title) => ipcRenderer.send('switch')
})