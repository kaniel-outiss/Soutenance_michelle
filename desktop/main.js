const { app, BrowserWindow, shell, screen } = require('electron');
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

  win.webContents.setWindowOpenHandler(({ url, frameName }) => {
    // Fenêtre de projection : plein écran sur le vidéoprojecteur (écran secondaire, mode « Étendre »)
    if (frameName === 'soutenance-projection') {
      const primary = screen.getPrimaryDisplay();
      const ext = screen.getAllDisplays().find(d => d.id !== primary.id);
      const opts = { autoHideMenuBar: true, backgroundColor: '#000000', title: 'Projection', icon: path.join(__dirname, 'build', 'icon.png') };
      if (ext) Object.assign(opts, { x: ext.bounds.x, y: ext.bounds.y, width: ext.bounds.width, height: ext.bounds.height, fullscreen: true, frame: false });
      else {
        // Pas de vidéoprojecteur : fenêtre flottante, toujours au premier plan, en bas à droite de l'écran
        const wa = primary.workArea, w = Math.round(wa.width * 0.42), h = Math.round(w * 9 / 16);
        Object.assign(opts, { width: w, height: h, x: wa.x + wa.width - w - 16, y: wa.y + wa.height - h - 16, alwaysOnTop: true, title: 'Projection (fenêtre flottante)' });
      }
      return { action: 'allow', overrideBrowserWindowOptions: opts };
    }
    // Liens externes : navigateur
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
