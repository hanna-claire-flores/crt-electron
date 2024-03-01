import React from "react";
import Import from "src/features/import/Import.js";
import Aor from "src/features/aor/Aor.js";

export const apps = {
  import: {
    title: "Import",
    acronym: "IMPT",
    element: <Import />,
    path: "import/*",
  },
  ww: {
    title: "WorldWide Data",
    acronym: "WW",
    element: <div>WW</div>,
    path: "ww/*",
  },
  aor: {
    title: "AORs",
    acronym: "AOR",
    element: <Aor />,
    path: "aor/*",
  },
};
