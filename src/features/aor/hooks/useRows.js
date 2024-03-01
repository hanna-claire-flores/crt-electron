import { useQuery } from "react-query";
import axios from "axios";

const actualApiCall = async (param1) => {
  return await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2000").then((res) => res.data);
  // return await Promise.resolve({
  //   rowData: [
  //     { one: 1, two: 2, three: 3, four: 4 },
  //     { one: 1, two: 2, three: 3, four: 4 },
  //     { one: 1, two: 2, three: 3, four: 4 },
  //     { one: 1, two: 2, three: 3, four: 4 },
  //     { one: 1, two: 2, three: 3, four: 4 },
  //     { one: 1, two: 2, three: 3, four: 4 },
  //     { one: 1, two: 2, three: 3, four: 4 },
  //     { one: 1, two: 2, three: 3, four: 4 },
  //     { one: 1, two: 2, three: 3, four: 4 },
  //     { one: 1, two: 2, three: 3, four: 4 },
  //   ],
  // });
};

export default function useRows() {
  return useQuery({
    queryKey: "aor__table-rows",
    queryFn: () => actualApiCall(),
  });
}
