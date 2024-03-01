const { BrowserWindow } = require("electron");

const spawnWindow = () => {
  const w = new BrowserWindow({
    width: 1600,
    height: 900,
    backgroundColor: "#303030",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  w.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  return w;
};

module.exports = {
  spawnWindow: spawnWindow,
};
