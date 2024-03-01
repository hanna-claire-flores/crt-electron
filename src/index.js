import React from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

// Use whatever api server the electron wrapper says we should use
axios.defaults.baseURL = window.crtApi.baseURL;

import App from "src/App.js";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
