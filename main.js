const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // *** ตัวแก้ปัญหาของคุณ: ปิด Security เพื่อให้คุยกับ ESP32 ได้อิสระ ***
      webSecurity: false 
    }
  });

  // โหลดไฟล์ index.html ของคุณ
  win.loadFile('index.html');
  // win.loadURL(`file://${path.join(__dirname, 'index.html')}`);
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});