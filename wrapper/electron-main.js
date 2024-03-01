const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const { handleFileSelected } = require("./handlers/handleFileSelected.js");
const { openCrtWindow } = require("./openCrtWindow.js");

if (require("electron-squirrel-startup")) app.quit();

app.whenReady().then(() => {
  // let lastSentData = "initial";

  ipcMain.on("openNewWindow", () => {
    openCrtWindow();
  });

  ipcMain.handle("dialog:openFile", handleFileSelected);

  ipcMain.on("rendererToMain", (event, data) => {
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send("mainToRenderer", data);
    });
  });

  ipcMain.on("crt-right-click", (event) => {
    const menu = Menu.buildFromTemplate([
      {
        label: "Menu Item 1",
        click: () => {
          event.sender.send("context-menu-command", "menu-item-1");
        },
      },
      { type: "separator" },
      { label: "Menu Item 2", type: "checkbox", checked: true },
    ]);
    menu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
  });

  openCrtWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    openCrtWindow();
  }
});
