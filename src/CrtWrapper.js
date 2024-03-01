import React from "react";
import { Outlet, useMatches } from "react-router-dom";

import Topbar from "./components/topbar/Topbar.js";
import Sidebar from "./components/sidebar/Sidebar.js";
import { Toolbar } from "@material-ui/core";
import useCrtStore from "src/stores/useCrtStore.js";

const CrtWrapper = () => {
  let matches = useMatches();
  const setTopbarText = useCrtStore((s) => s.setTopbarText);
  const setCurrentApp = useCrtStore((s) => s.setCurrentApp);

  React.useEffect(() => {
    let match = matches[1];
    let app = match.pathname.split("/")[1];
    if (!app) app = "aor";

    setCurrentApp(app);
    setTopbarText(match.handle.title);
  }, [matches]);

  return (
    <div className="root-working-view">
      <Topbar />
      <Sidebar />
      <section className="tool-area">
        <Toolbar />
        <Outlet />
      </section>
      {/* inactive user */}
    </div>
  );
};

export default CrtWrapper;
