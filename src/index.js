import React from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

import App from "src/App.js";

// Use whatever api server the electron wrapper says we should use
axios.defaults.baseURL = window.crtApi.baseURL;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
