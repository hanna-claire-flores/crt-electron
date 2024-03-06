import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import useCrtStore from "src/stores/useCrtStore.js";

const Topbar = () => {
  const topbarText = useCrtStore((s) => s.topbarText);
  const tokenData = useCrtStore((s) => s.tokenData);

  const openNewWindow = () => {
    window.crtApi.openNewWindow();
  };

  const login = () => {
    window.crtApi.openLoginWindow();
  };

  const logout = () => {
    window.crtApi.logout();
  };

  return (
    <AppBar position="fixed" className="crt__appbar">
      <Toolbar>
        <Typography variant="h6">{topbarText}</Typography>
        <IconButton onClick={openNewWindow}>
          <LibraryAddIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }}></div>
        {tokenData == null && (
          <Button variant="contained" onClick={login} color="secondary">
            Login
          </Button>
        )}

        {tokenData != null && (
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        )}
        <Typography>{tokenData ? "Logged In" : "Unauthorised"}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
