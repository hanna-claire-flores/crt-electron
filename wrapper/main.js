import "dotenv/config";
import { app, BrowserWindow, ipcMain, Menu, dialog } from "electron";
import spawnWindow from "./spawnWindow.js";
import handleRightClick from "./handlers/handleRightClick.js";
import handleFileSelected from "./handlers/handleFileSelected.js";
import handleLogout from "./auth/handleLogout.js";
import showLoginDialog from "./auth/showLoginDialog.js";
import handleLogin from "./auth/handleLogin.js";
import { getToken, setToken } from "./dummyState.js";

if (require("electron-squirrel-startup")) app.quit();

// app.commandLine.appendSwitch("ignore-certificate-errors");

app.whenReady().then(() => {
  ipcMain.on("rendererToMain", (event, data) => {
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send("mainToRenderer", data);
    });
  });

  ipcMain.on("logout", () => {
    setToken(null);
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send("logoutComplete");
    });
  });

  ipcMain.on("openLoginWindow", handleLogin);
  ipcMain.handle("getAuthStatus", getToken);
  ipcMain.handle("openFile", handleFileSelected);
  ipcMain.on("crt-right-click", handleRightClick);
  ipcMain.on("openNewWindow", spawnWindow);

  let w = spawnWindow();
  w.moveTop();
  w.focus();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) spawnWindow();
});
