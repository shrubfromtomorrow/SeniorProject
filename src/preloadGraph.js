const { contextBridge, ipcRenderer } = require('electron');


const API = {
  onReload: (reload) => ipcRenderer.on("reload", (event, args) => {
    reload(args);
  }),
  switch: (title) => ipcRenderer.send('switch')
}

contextBridge.exposeInMainWorld("api", API);