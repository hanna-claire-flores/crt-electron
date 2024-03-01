import { useQuery } from "react-query";
import axios from "axios";

const actualApiCall = async (param1) => {
  return await axios.get("/api/v2/region?limit=2000").then((res) => res.data);
};

export default function useRegions() {
  return useQuery({
    queryKey: "crt__key-one",
    queryFn: () => actualApiCall(),
  });
}
