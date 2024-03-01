import { useQuery } from "react-query";
import axios from "axios";

const actualApiCall = async (param1) => {
  // return await axios.get(`/import/v1/api-endpoint?param1=${param1}`).then((res) => res.data);
  return await Promise.resolve({
    columnDefinitions: [
      { title: "Name", field: "name" },
      { title: "URL", field: "url" },
    ],
  });
};

export default function useColumns() {
  return useQuery({
    queryKey: "aor__table-cols",
    queryFn: () => actualApiCall(),
  });
}
