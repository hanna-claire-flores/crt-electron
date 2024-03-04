const { BrowserWindow } = require("electron");
var http = require("http");
var fs = require("fs");
const util = require("util");

const handleLogin = () => {
  let tinyServer = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        data: "You are logged in!",
      })
    );
  });

  tinyServer.listen(3456);

  let authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#303030",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  let goHere = new URL(
    "https://sso-keycloak.apps.ocp-ugw1-dev.ecs.us.lmco.com/realms/myrealm/protocol/openid-connect/auth"
  );
  goHere.searchParams.append("redirect_uri", "http://localhost:3456");
  goHere.searchParams.append("client_id", "login-app");
  goHere.searchParams.append("scope", "email");
  goHere.searchParams.append("response_type", "code");

  authWindow.loadURL(goHere.href);
  authWindow.show();

  let cookies = authWindow.webContents.session.cookies;

  cookies.on("changed", function (event, cookie, cause, removed) {
    if (cookie.session && !removed) {
      console.log(cookie);
      // cookies.set(
      //   {
      //     url: url,
      //     name: cookie.name,
      //     value: cookie.value,
      //     domain: cookie.domain,
      //     path: cookie.path,
      //     // secure: cookie.secure,
      //     httpOnly: cookie.httpOnly,
      //     expirationDate: new Date().setDate(new Date().getDate() + 14),
      //   },
      //   function (err) {
      //     if (err) {
      //       log.error("Error trying to persist cookie", err, cookie);
      //     }
      //   }
      // );
    }
  });

  // Reset the authWindow on close
  authWindow.on(
    "close",
    function () {
      authWindow = null;
      tinyServer.close();
    },
    false
  );
};

export default handleLogin;
