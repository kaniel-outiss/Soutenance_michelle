const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 820, minWidth: 900, minHeight: 600,
    title: 'Soutenance Michelle',
    icon: path.join(__dirname, 'build', 'icon.png'),
    autoHideMenuBar: true,
    backgroundColor: '#f3f2ee',
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  win.loadFile(path.join(__dirname, 'index.html'));
  // Les liens externes s'ouvrent dans le navigateur
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
