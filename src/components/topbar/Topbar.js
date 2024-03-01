import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import useCrtStore from "src/stores/useCrtStore.js";

const Topbar = () => {
  const topbarText = useCrtStore((s) => s.topbarText);
  const authStatus = useCrtStore((s) => s.authStatus);

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
        {authStatus != "User Logged In" && (
          <Button variant="contained" onClick={login}>
            Login
          </Button>
        )}

        {authStatus == "User Logged In" && (
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        )}
        <Typography>{authStatus.toString()}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
