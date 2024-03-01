import { BrowserWindow, dialog } from "electron";

const showLoginDialog = (setAuthStatus) => {
  BrowserWindow.getAllWindows().forEach((window) => {
    window.setEnabled(false);
  });

  const buttonIndex = dialog.showMessageBoxSync({
    message: "Placeholder Login Function",
    detail: "This should really be handled by the IPS service...",
    buttons: ["Fake Success", "Fake Cancel"],
  });

  BrowserWindow.getAllWindows().forEach((window) => {
    window.setEnabled(true);
  });

  setAuthStatus(buttonIndex == 0 ? "User Logged In" : "User Cancelled");
};

export default showLoginDialog;
