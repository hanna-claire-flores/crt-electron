import { QueryClient, QueryCache, MutationCache } from "react-query";
import { toast } from "react-toastify";

export default new QueryClient({
  queryCache: new QueryCache({
    onError: (err, query) => {
      if (!("onError" in query.options) && !query?.meta?.silenceError) {
        toast.error(err.message);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err, variables, context, mutation) => {
      if (!("onError" in mutation.options)) {
        toast.error(err.message);
      }
    },
    onSuccess: (data, variables, context, mutation) => {
      if (!("onSuccess" in mutation.options)) {
        toast.success(err.message);
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
