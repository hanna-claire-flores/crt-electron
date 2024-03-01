import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import useCrtStore from "src/stores/useCrtStore.js";

const Topbar = () => {
  const topbarText = useCrtStore((s) => s.topbarText);
  const ipcData = useCrtStore((s) => s.ipcData);

  const handleClick = () => {
    window.crtApi.openNewWindow();
  };

  return (
    <AppBar position="fixed" className="crt__appbar">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {topbarText}
        </Typography>
        <Typography>{ipcData.toString()}</Typography>
        <Button onClick={handleClick}>open new window</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
