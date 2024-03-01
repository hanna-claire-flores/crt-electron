const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const { handleFileSelected } = require("handlers/handleFileSelected.js");
const { handleRightClick } = require("handlers/handleRightClick.js");
const { spawnWindow } = require("wrapper/spawnWindow.js");

if (require("electron-squirrel-startup")) app.quit();

app.whenReady().then(() => {
  ipcMain.on("rendererToMain", (event, data) => {
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send("mainToRenderer", data);
    });
  });

  ipcMain.handle("dialog:openFile", handleFileSelected);
  ipcMain.on("crt-right-click", handleRightClick);
  ipcMain.on("openNewWindow", () => {
    spawnWindow();
  });

  spawnWindow().maximize();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    spawnWindow();
  }
});
