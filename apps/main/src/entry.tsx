import React from "react";

import ReactDOM from "react-dom/client";

import App from ".";

import "~/global.css";

import "~/icons/css/icons.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
