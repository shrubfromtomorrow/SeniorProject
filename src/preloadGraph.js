const { contextBridge, ipcRenderer } = require('electron');
window.ipcRenderer = require('electron').ipcRenderer;

contextBridge.exposeInMainWorld('electronAPI', {
  switch: (title) => window.ipcRenderer.send('switch')
})