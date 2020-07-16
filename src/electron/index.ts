import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import path from 'path';
import { runWebserver } from './webserver';

console.log('starting webserver task...');
const runWebserverTask = runWebserver();

app.on('ready', async () => {
  const window = new BrowserWindow({ width: 800, height: 800 });
  window.setMenuBarVisibility(false);
  window.loadFile(path.resolve(__dirname, '../website/index.html'));

  console.log('waiting for backend server to start up...');

  const webserverDetails = await runWebserverTask;

  console.log('waiting for browser to be ready for webserver details...');
  ipcMain.on('ready-for-webserver-started', (event: IpcMainEvent) => {
    console.log('webserver start completed. Sending details to browser...');
    event.sender.send('webserver-started', webserverDetails);
  });
});

app.on(
  'certificate-error',
  (
    event: Electron.Event,
    webContents: Electron.WebContents,
    url: string,
    error: string,
    certificate: Electron.Certificate,
    callback: (isTrusted: boolean) => void
  ) => {
    event.preventDefault();
    callback(true);
  }
);
