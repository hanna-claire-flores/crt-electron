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
  const setTokenData = useCrtStore((s) => s.setTokenData);

  /**
   * When we get new/updated token data from the main thread, store it in state
   * and set the bearer token to be used by all axios API calls
   */
  const getTokenFromMainProcess = async () => {
    let token = await window.crtApi.getTokenData();
    setTokenData(token);

    // if we got an object with an access token, set it as axios default
    if (token?.access_token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token.access_token}`;
    }
  };

  // on initial load, set the base URL and grab the token data
  React.useEffect(() => {
    axios.defaults.baseURL = window.crtApi.baseURL;
    getTokenFromMainProcess();
  }, []);

  // when the main thread tells us that a login has occured...
  window.crtApi.onLogin(() => {
    getTokenFromMainProcess();
    // refetch all our api data probably
  });

  // when the main thread tells us that a logout has occured...
  window.crtApi.onLogout(() => {
    delete axios.defaults.headers.common["Authorization"];
    setTokenData(null);
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
