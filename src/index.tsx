import React from "react";
import { createRoot } from "react-dom/client";
import App from "./admin-panel/App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  // <React.StrictMode> issues with dnd
  <App />
  // </React.StrictMode>
);
