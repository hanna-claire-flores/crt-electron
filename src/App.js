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
  const setAuthStatus = useCrtStore((s) => s.setAuthStatus);

  const grabMainAuth = async () => {
    let mainThreadAuth = await window.crtApi.getAuthStatus();
    setAuthStatus(mainThreadAuth);
  };

  React.useEffect(() => {
    grabMainAuth();
  }, []);

  // respond when the main thread tells us the user just logged in by asking the main thread about who is logged in
  window.crtApi.onLogin(() => {
    grabMainAuth();
  });

  window.crtApi.onLogout(() => {
    grabMainAuth();
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
