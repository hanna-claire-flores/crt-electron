const { BrowserWindow } = require("electron");

const handleLogout = () => {
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send("logoutComplete");
  });
};

module.exports = {
  handleLogout: handleLogout,
};
