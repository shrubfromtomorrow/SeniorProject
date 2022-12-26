const { app, BrowserWindow, ipcMain } = require('electron');
const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  let activeWindow = "calculator";
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,
    },
    show: true,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // mainWindow.removeMenu();

  const graphWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preloadGraph.js'),
      devTools: true,
    },
    show: false,
  });

  graphWindow.loadFile(path.join(__dirname, 'graph.html'));
  // graphWindow.removeMenu();

  let graphLoads = 0;

  graphWindow.webContents.on('did-finish-load', () => {
    if (graphLoads == 100) {
      graphWindow.reload();
    }
    console.log(graphLoads);
    graphLoads++;
  })

  // globalShortcut may be a better way to handle this switching
  ipcMain.on('switch', function () {
    if (activeWindow == "calculator") {
      graphWindow.show();
      mainWindow.hide();
      activeWindow = "graph";
    }
    else if (activeWindow == "graph") {
      mainWindow.show();
      graphWindow.hide();
      activeWindow = "calculator";
    }
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

