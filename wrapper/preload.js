const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("crtApi", {
  baseUrl: "https://crt.com",
  customRightClick: () => ipcRenderer.send("crt-right-click"),

  openNewWindow: () => ipcRenderer.send("openNewWindow"),

  openFile: () => ipcRenderer.invoke("dialog:openFile"),

  rendererToMain: (data) => ipcRenderer.send("rendererToMain", data),
  onMainToRenderer: (cb) => ipcRenderer.on("mainToRenderer", (_event, value) => cb(value)),
});
