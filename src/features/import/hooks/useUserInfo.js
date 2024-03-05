import axios from "axios";
import { useQuery } from "react-query";

const oauthUrl = "https://oauth2-oauth2-proxy.apps.ocp-ugw1-dev.ecs.us.lmco.com/";
const userInfoUrl = "https://oauth2-oauth2-proxy.apps.ocp-ugw1-dev.ecs.us.lmco.com/";

const actualApiCall = async (param1) => {
  return await axios
    .get(oauthUrl, {
      withCredentials: true,
    })
    .then((res) => res.data);
};

export default function useUserInfo() {
  return useQuery({
    queryKey: "crt__userinfo",
    queryFn: () => actualApiCall(),
  });
}
