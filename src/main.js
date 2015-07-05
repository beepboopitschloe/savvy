let app = require('app'),
	BrowserWindow = require('browser-window');

require('crash-reporter').start();

let mainWindow = null;

app.on('window-all-closed', () => {
	if (process.platform != 'darwin') {
		app.quit();
	}
});

app.on('ready', () => {
	mainWindow = new BrowserWindow({ width: 640, height: 480 });

	mainWindow.loadUrl('file://' + __dirname + '/build/tpl/index.html');

	mainWindow.openDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
});

