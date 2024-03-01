import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "react-query";

import "react-toastify/dist/ReactToastify.css";

import pusheen from "assets/images/pusheen.jpg";
// import Theme from "./Theme.js";
import Theme from "src/Theme.js";
import crtMemoryRouter from "src/routes/crtMemoryRouter.js";

import "tabulator-tables/dist/css/tabulator_midnight.min.css";

import "./app.css";
import useCrtStore from "src/stores/useCrtStore.js";

const qClient = new QueryClient({
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

const App = () => {
  const setIpcData = useCrtStore((s) => s.setIpcData);
  window.crtApi.onMainToRenderer((valueFromMain) => {
    setIpcData(valueFromMain);
  });
  return (
    <QueryClientProvider client={qClient}>
      <ToastContainer />
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <RouterProvider router={crtMemoryRouter} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
