import React from "react";

import ReactDOM from "react-dom/client";

import App from "./index";

import "~/../../pages/app/global.css";

import "~/../../pages/app/icons/css/icons.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
