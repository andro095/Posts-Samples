import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
