import { BrowserWindow } from "electron";
import axios from "axios";

import { getToken, setToken } from "../dummyState.js";
import { keycloakServer } from "./authHelpers.js";

const handleLogout = async () => {
  await axios.get(keycloakServer + "/logout?id_token_hint=" + getToken().id_token);
  setToken(null);
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send("logoutComplete");
  });
};

export default handleLogout;
