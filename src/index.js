import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ToastProvider } from "react-toast-notifications";
import Modal from "react-modal";
import { HashRouter as Router } from "react-router-dom";

import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(zoomPlugin, annotationPlugin);
Modal.setAppElement("#root");

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <Router>
        <App />
      </Router>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
