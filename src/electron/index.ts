import { app, BrowserWindow } from 'electron';

app.on('ready', () => {
  const window = new BrowserWindow({ width: 800, height: 800 });
  window.setMenuBarVisibility(false);
  window.loadURL('http://example.com');
});
