import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import { RouterProvider, useNavigate } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import axios from "axios";

import Theme from "src/Theme.js";
import crtMemoryRouter from "src/routes/crtMemoryRouter.js";
import CrtQueryClient from "src/utils/CrtQueryClient.js";
import useCrtStore from "src/stores/useCrtStore.js";

import "react-toastify/dist/ReactToastify.css";
import "tabulator-tables/dist/css/tabulator_midnight.min.css";
import "./app.css";

const App = () => {
  const setAuthStatus = useCrtStore((s) => s.setAuthStatus);

  const getTokenFromMainProcess = async () => {
    let token = await window.crtApi.getAuthStatus();
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setAuthStatus(token);
  };

  React.useEffect(() => {
    axios.defaults.baseURL = window.crtApi.baseURL;
    getTokenFromMainProcess();
  }, []);

  window.crtApi.onLogin(() => {
    getTokenFromMainProcess();
    // refetch all our api data probably
  });

  window.crtApi.onLogout(() => {
    delete axios.defaults.headers.common["Authorization"];
    setAuthStatus(null);
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
