import { app, BrowserWindow } from 'electron';
import path from 'path';

app.on('ready', () => {
  const window = new BrowserWindow({ width: 800, height: 800 });
  window.setMenuBarVisibility(false);
  window.loadFile(path.resolve(__dirname, '../website/index.html'));
});
