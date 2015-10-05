import app from 'app';
import BrowserWindow from 'browser-window';

import CrashReporter from 'crash-reporter';
CrashReporter.start();

let mainWindow = null;

app.on('window-all-closed', () => {
	app.quit();
});

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768
	});

	mainWindow.loadUrl('file://' + process.cwd() + '/index.html');

	mainWindow.openDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
});
