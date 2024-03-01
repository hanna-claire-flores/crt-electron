const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("crtApi", {
  baseURL: "https://pokeapi.co",

  /* -------------------------------------------------------------------------- */
  /*            methods the client can use to talk to the main thread           */
  /* -------------------------------------------------------------------------- */

  /**
   * tell the main thread to spawn a new CRT window
   */
  openNewWindow: () => ipcRenderer.send("openNewWindow"),
  customRightClick: () => ipcRenderer.send("crt-right-click"),
  rendererToMain: (data) => ipcRenderer.send("rendererToMain", data),
  openFile: () => ipcRenderer.invoke("openFile"),

  /* ------------------------------- auth stuff ------------------------------- */

  /**
   * Tell the main thread to open a login window
   */
  openLoginWindow: () => ipcRenderer.send("openLoginWindow"),

  /**
   * Notify the main thread that the user is logging out
   */
  logout: () => ipcRenderer.send("logout"),

  /**
   * This should NOT be done in the openshift environment! This method stands in
   * for the IPS service API endpoint to get info about the logged in user based
   * on the headers of the HTTPS requests. The react GUI cannot access headers
   * applied by the keycloak auth server.
   *
   * @returns stand-in data for what the IPS service WOULD be returning IF api
   *          requests had the expected auth headers
   */
  getLoggedInUser: () => ipcRenderer.invoke("getLoggedInUser"),

  /* -------------------------------------------------------------------------- */
  /*          events from the main thread to handle on the client side          */
  /* -------------------------------------------------------------------------- */
  onLogout: (cb) => ipcRenderer.on("logoutComplete", (_event) => cb()),

  /**
   * This event will be sent by the main thread to ALL client windows after the
   * login window closes sucessfully. BrowserWindow callback really SHOULD be to
   * immediately ask the IPS service "whoami" because after successful login,
   * auth headers will be slapped onto every request
   *
   * @param {Function} cb callback function expecting no arguments that will be run
   *                      when this event is fired
   */
  onLogin: (cb) => ipcRenderer.on("loginComplete", (_event) => cb()),

  onMainToRenderer: (cb) => ipcRenderer.on("mainToRenderer", (_event, value) => cb(value)),
});
