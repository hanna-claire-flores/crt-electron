import axios from "axios";
import { useQuery } from "react-query";

const oauthUrl = "https://oauth2-oauth2-proxy.apps.ocp-ugw1-dev.ecs.us.lmco.com/";
const userInfoUrl =
  "https://sso-keycloak.apps.ocp-ugw1-dev.ecs.us.lmco.com/realms/myrealm/protocol/openid-connect/userinfo";

const actualApiCall = async () => {
  return await axios.get(userInfoUrl).then((res) => res.data);
};

export default function useUserInfo(enable) {
  return useQuery({
    queryKey: "crt__userinfo",
    queryFn: () => actualApiCall(),
    enabled: enable,
  });
}
