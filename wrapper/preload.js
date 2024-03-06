const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("crtApi", {
  baseURL: "https://pokeapi.co",

  /* -------------------------------------------------------------------------- */
  /*            methods the client can use to talk to the main thread           */
  /* -------------------------------------------------------------------------- */

  openNewWindow: () => ipcRenderer.send("openNewWindow"),
  customRightClick: () => ipcRenderer.send("crt-right-click"),
  rendererToMain: (data) => ipcRenderer.send("rendererToMain", data),
  openFile: () => ipcRenderer.invoke("openFile"),

  /* ------------------------------- auth stuff ------------------------------- */

  openLoginWindow: () => ipcRenderer.send("openLoginWindow"),
  logout: () => ipcRenderer.send("logout"),
  getTokenData: () => ipcRenderer.invoke("getTokenData"),

  /* -------------------------------------------------------------------------- */
  /*          events from the main thread to handle on the client side          */
  /* -------------------------------------------------------------------------- */
  onLogout: (cb) => ipcRenderer.on("logoutComplete", (_event) => cb()),
  onLogin: (cb) => ipcRenderer.on("loginComplete", (_event) => cb()),
  onMainToRenderer: (cb) => ipcRenderer.on("mainToRenderer", (_event, value) => cb(value)),
});
