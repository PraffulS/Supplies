import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import App from "./App";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ToastContainer position="top-right" />

    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  rootElement
);
