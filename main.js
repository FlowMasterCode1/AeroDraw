// AeroDraw — Electron Main Process
// Прозрачное окно поверх всего экрана с поддержкой режима рисования и кликов сквозь окно

const { app, BrowserWindow, globalShortcut, ipcMain, screen } = require('electron');
const path = require('path');

let win = null;
let drawMode = true;

app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    transparent: true,        // Прозрачный фон
    frame: false,             // Без рамки окна
    alwaysOnTop: true,        // Всегда поверх всех окон
    hasShadow: false,         // Без тени
    resizable: false,         // Нельзя изменить размер
    skipTaskbar: false,       // Показывать в панели задач
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    backgroundColor: '#00000000'
  });

  win.loadFile('index.html');
  win.setMenu(null);
  win.setIgnoreMouseEvents(false); // По умолчанию — режим рисования

  // Ctrl+Shift+D — переключить режим рисования / клики сквозь окно
  globalShortcut.register('CommandOrControl+Shift+D', () => {
    drawMode = !drawMode;
    win.setIgnoreMouseEvents(!drawMode, { forward: true });
    win.webContents.send('draw-mode-changed', drawMode);
  });

  // Ctrl+Shift+Q — выход из приложения
  globalShortcut.register('CommandOrControl+Shift+Q', () => {
    app.quit();
  });

  // IPC: установить режим рисования из рендерера
  ipcMain.on('set-draw-mode', (e, enabled) => {
    drawMode = enabled;
    win.setIgnoreMouseEvents(!enabled, { forward: true });
  });

  // IPC: установить режим сквозных кликов из рендерера
  ipcMain.on('set-click-through', (e, enabled) => {
    win.setIgnoreMouseEvents(enabled, { forward: true });
  });

  win.on('closed', () => {
    win = null;
  });
});

// Снять все глобальные хоткеи при выходе
app.on('will-quit', () => globalShortcut.unregisterAll());

// Закрыть приложение при закрытии всех окон
app.on('window-all-closed', () => app.quit());
