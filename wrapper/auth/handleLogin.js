import { setToken } from "../dummyState.js";
const { BrowserWindow } = require("electron");
var http = require("http");
import axios from "axios";

const tinyPort = 3456;
const keycloakServer = "https://sso-keycloak.apps.ocp-ugw1-dev.ecs.us.lmco.com/realms/myrealm/protocol/openid-connect";
const clientId = "crt-electron";

const authURL = new URL(keycloakServer + "/auth");
authURL.searchParams.append("scope", "openid");
authURL.searchParams.append("response_type", "code");
authURL.searchParams.append("client_id", clientId);
authURL.searchParams.append("redirect_uri", `http://localhost:${tinyPort}`);

const authHref = authURL.href;

const handleLogin = () => {
  let authWindow = new BrowserWindow();

  /**
   * This web server only lives while the login popup window is shown - it's here
   * to catch the redirect from the keycloak AUTH endpoint (when the user enters their creds)
   *
   * When this
   */
  const tinyServer = http.createServer(async (req, res) => {
    try {
      let authResponse = new URL(req.url, "http://localhost");
      let code = authResponse.searchParams.get("code");
      let tokenParams = new URLSearchParams();
      tokenParams.append("grant_type", "authorization_code");
      tokenParams.append("code", code);
      tokenParams.append("redirect_uri", `http://localhost:${tinyPort}`);
      tokenParams.append("client_id", clientId);
      tokenParams.append("client_secret", process.env.CLIENT_SECRET);

      let tokenResponse = await axios.post(keycloakServer + "/token", tokenParams);

      console.log(tokenResponse.data);
      setToken(tokenResponse.data.access_token);
      BrowserWindow.getAllWindows().forEach((window) => {
        window.webContents.send("loginComplete");
      });

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("You're logged in! Close this window to continue!");
    } catch (e) {
      console.error(e);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Eat Shit and Die! :D");
    } finally {
      tinyServer.close();
    }
  });

  tinyServer.listen(tinyPort);
  authWindow.loadURL(authHref);
  authWindow.show();

  // Reset the authWindow on close
  authWindow.on(
    "close",
    () => {
      tinyServer.close();
    },
    false
  );
};

export default handleLogin;
