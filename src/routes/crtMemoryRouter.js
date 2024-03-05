import React from "react";
import { createMemoryRouter } from "react-router-dom";
import { apps } from "src/routes/crtApps.js";
import CrtWrapper from "src/CrtWrapper.js";
import Aor from "src/features/aor/Aor.js";
// import LoginPage from "src/auth/LoginPage.js";

const crtMemoryRouter = createMemoryRouter([
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  // },
  {
    path: "/",
    element: <CrtWrapper />,
    errorElement: <div>NOT FOUND</div>,
    children: [
      {
        index: true,
        element: <Aor />,
        id: "landing",
        handle: { title: "CRT" },
      },
      ...Object.entries(apps).map(([key, app]) => ({
        id: key,
        handle: { title: app.title },
        ...app,
      })),
    ],
  },
  {
    path: "*",
    element: <div>LOGGED OUT</div>,
  },
]);

export default crtMemoryRouter;
