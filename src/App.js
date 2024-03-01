import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "react-query";

import Theme from "src/Theme.js";
import crtMemoryRouter from "src/routes/crtMemoryRouter.js";
import CrtQueryClient from "src/utils/CrtQueryClient.js";
import useCrtStore from "src/stores/useCrtStore.js";

import "react-toastify/dist/ReactToastify.css";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import "./app.css";

const App = () => {
  const setIpcData = useCrtStore((s) => s.setIpcData);

  window.crtApi.onMainToRenderer((valueFromMain) => {
    setIpcData(valueFromMain);
  });

  return (
    <QueryClientProvider client={CrtQueryClient}>
      <ToastContainer />
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <RouterProvider router={crtMemoryRouter} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
