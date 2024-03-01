const { BrowserWindow } = require("electron");

const openCrtWindow = () => {
  const mainWindow = new BrowserWindow({
    backgroundColor: "#303030",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  return mainWindow;
};

module.exports = {
  openCrtWindow: openCrtWindow,
};
