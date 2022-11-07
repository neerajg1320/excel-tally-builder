const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { sayHello } = require('./helpers/message');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  require('@electron/remote/main').initialize();
  require('@electron/remote/main').enable(mainWindow.webContents);

  mainWindow.loadURL(isDev ?
      'http://localhost:3000' :
      `file://${path.join(__dirname, '../index.html')}`
  );

  sayHello("Neeraj");
}

app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', function () {
  // On OS-X applications stay open even when all windows are closed.
  // User can quit from Menu
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
  app.quit();
});

app.on('activate', function () {
  // On OS0X its common to recreate a window in the app the dock icon is clied
  // and there are no other windows open
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
})

