const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("crtApi", {
  baseURL: "https://pokeapi.co",
  customRightClick: () => ipcRenderer.send("crt-right-click"),

  openNewWindow: () => ipcRenderer.send("openNewWindow"),
  openLoginWindow: () => ipcRenderer.send("openLoginWindow"),
  logout: () => ipcRenderer.send("logout"),

  openFile: () => ipcRenderer.invoke("openFile"),

  rendererToMain: (data) => ipcRenderer.send("rendererToMain", data),

  // callbacks to handle on the client side
  onMainToRenderer: (cb) => ipcRenderer.on("mainToRenderer", (_event, value) => cb(value)),
  onLogout: (cb) => ipcRenderer.on("logoutComplete", (_event) => cb()),
});
