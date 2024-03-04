import { app, BrowserWindow, ipcMain, Menu, dialog } from "electron";
import spawnWindow from "./spawnWindow.js";
import handleRightClick from "./handlers/handleRightClick.js";
import handleFileSelected from "./handlers/handleFileSelected.js";
import handleLogout from "./auth/handleLogout.js";
import showLoginDialog from "./auth/showLoginDialog.js";
import handleLogin from "./auth/handleLogin.js";

if (require("electron-squirrel-startup")) app.quit();

app.whenReady().then(() => {
  let authStatus = "Unauthenticated";

  ipcMain.on("rendererToMain", (event, data) => {
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send("mainToRenderer", data);
    });
  });

  ipcMain.on("openLoginWindow", handleLogin);

  ipcMain.on("logout", () => {
    authStatus = "Unauthenticated";
    handleLogout();
  });

  ipcMain.handle("getAuthStatus", () => authStatus);
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
