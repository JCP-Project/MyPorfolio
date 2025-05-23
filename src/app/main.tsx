import ReactDOM from "react-dom/client";
import { HashRouter  as Router } from 'react-router-dom';

import App from "./App.tsx";
import "./index.css";
import React from "react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
