import React from "react";
import Keycloak from "keycloak-js";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const LoginPage = () => {
  React.useEffect(() => {
    var keycloak = new Keycloak({
      url: "https://sso-keycloak.apps.ocp-ugw1-dev.ecs.us.lmco.com",
      realm: "myrealm",
      clientId: "login-app",
    });

    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: false,
        // redirectUri: "http://localhost:3456",
      })
      .then((a) => {
        console.log("onthen");
        console.log(a);
        console.log(keycloak);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div>
      <Button component={Link} to="/">
        Go home
      </Button>
    </div>
  );
};

export default LoginPage;
