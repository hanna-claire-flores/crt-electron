const { BrowserWindow } = require("electron");
var http = require("http");
import axios from "axios";
import crypto from "crypto";

import { setToken } from "../dummyState.js";
import {
  keycloakServer,
  tinyPort,
  publicClient,
  base64URLEncode,
  sha256,
  getAuthEndpoint,
  getTokenParams,
} from "./authHelpers.js";

/**
 * This web server only lives while the login popup window is shown - it's here
 * to catch the redirect from the keycloak AUTH endpoint (when the user enters their creds)
 *
 * When this receives a hit, its going to be from the keycloak server in the form
 * /?session_state=______&code=_________ and we really just need that code
 *
 * Then we send the code (aka authorization_code) back to the keycloak server through the
 * TOKEN endpoint, and the response from THAT contains our access_token, refresh_token, and
 * id_token! These we will save and send to all our browser windows via IPC to be used for
 * API calls
 */
const handleLogin = () => {
  let authWindow = new BrowserWindow();

  var verifier = base64URLEncode(crypto.randomBytes(32));
  var challenge = base64URLEncode(sha256(verifier));
  let authHref = getAuthEndpoint(publicClient, challenge, tinyPort);

  const tinyServer = http.createServer(async (req, res) => {
    try {
      // get the authorization_code from the redirect URL
      let authResponse = new URL(req.url, "http://localhost");
      let code = authResponse.searchParams.get("code");

      // create the /token POST request
      let tokenParams = getTokenParams(code, tinyPort, publicClient, verifier);

      // wait for the response
      let tokenResponse = await axios.post(keycloakServer + "/token", tokenParams);
      console.log(tokenResponse.data);

      // set token state
      setToken(tokenResponse.data);

      // notify all browser windows that they should check for the updated bearer token
      BrowserWindow.getAllWindows().forEach((window) => {
        window.webContents.send("loginComplete");
      });

      // done!
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
