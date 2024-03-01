import { BrowserWindow } from "electron";

const handleLogout = () => {
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send("logoutComplete");
  });
};

export default handleLogout;
