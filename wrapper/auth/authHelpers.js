import crypto from "crypto";

export const keycloakServer =
  "https://sso-keycloak.apps.ocp-ugw1-dev.ecs.us.lmco.com/realms/myrealm/protocol/openid-connect";
export const tinyPort = 3456;
export const publicClient = "crt-public";

export const base64URLEncode = (str) => {
  return str.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};

export const sha256 = (buffer) => {
  return crypto.createHash("sha256").update(buffer).digest();
};

export const getAuthEndpoint = (client, challenge, port) => {
  let authURL = new URL(keycloakServer + "/auth");
  authURL.searchParams.append("scope", "openid");
  authURL.searchParams.append("response_type", "code");
  authURL.searchParams.append("client_id", client);
  authURL.searchParams.append("code_challenge_method", "S256");
  authURL.searchParams.append("code_challenge", challenge);
  authURL.searchParams.append("redirect_uri", `http://localhost:${port}`);

  return authURL.href;
};

export const getTokenParams = (code, port, client, verifier) => {
  let tokenParams = new URLSearchParams();
  tokenParams.append("grant_type", "authorization_code");
  tokenParams.append("code", code);
  tokenParams.append("redirect_uri", `http://localhost:${port}`);
  tokenParams.append("client_id", client);
  tokenParams.append("code_verifier", verifier);

  return tokenParams;
};
