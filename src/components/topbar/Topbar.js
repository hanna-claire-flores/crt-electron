import React from "react";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";

import useCrtStore from "src/stores/useCrtStore.js";

const Topbar = () => {
  const topbarText = useCrtStore((s) => s.topbarText);
  const ipcData = useCrtStore((s) => s.ipcData);

  const openNewWindow = () => {
    window.crtApi.openNewWindow();
  };

  return (
    <AppBar position="fixed" className="crt__appbar">
      <Toolbar>
        <Typography variant="h6">{topbarText}</Typography>
        <IconButton onClick={openNewWindow}>
          <LibraryAddIcon />
        </IconButton>
        <Typography>{ipcData.toString()}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
