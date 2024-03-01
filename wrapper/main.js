import { app, BrowserWindow, ipcMain, Menu, dialog } from "electron";
import spawnWindow from "./spawnWindow.js";
import handleRightClick from "./handlers/handleRightClick.js";
import handleFileSelected from "./handlers/handleFileSelected.js";
import handleLogout from "./handlers/handleLogout.js";

if (require("electron-squirrel-startup")) app.quit();

app.whenReady().then(() => {
  ipcMain.on("rendererToMain", (event, data) => {
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send("mainToRenderer", data);
    });
  });

  ipcMain.on("openLoginWindow", () => {});
  ipcMain.on("logout", handleLogout);

  ipcMain.handle("openFile", handleFileSelected);
  ipcMain.on("crt-right-click", handleRightClick);
  ipcMain.on("openNewWindow", spawnWindow);

  spawnWindow().maximize();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) spawnWindow();
});
