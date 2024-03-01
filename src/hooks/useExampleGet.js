import { useQuery } from "react-query";
import axios from "axios";

const actualApiCall = async (param1) => {
  return await axios.get(`/import/v1/api-endpoint?param1=${param1}`).then((res) => res.data);
};

export default function useExampleGet(param1) {
  return useQuery({
    queryKey: "crt__key-one",
    queryFn: () => actualApiCall(param1),
  });
}
