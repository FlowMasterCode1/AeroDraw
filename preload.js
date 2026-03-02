// AeroDraw — Preload Script
// Предоставляет безопасный мост между основным процессом Electron и рендерером

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('aerodraw', {
  // Установить режим рисования (true = рисование, false = клики сквозь окно)
  setDrawMode: (enabled) => ipcRenderer.send('set-draw-mode', enabled),

  // Установить режим сквозных кликов напрямую
  setClickThrough: (enabled) => ipcRenderer.send('set-click-through', enabled),

  // Подписаться на изменение режима рисования (например, через глобальный хоткей)
  onDrawModeChanged: (callback) =>
    ipcRenderer.on('draw-mode-changed', (e, val) => callback(val))
});
