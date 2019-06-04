import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Layout from "./src/pages/index.js";
import store from "./src/store";
import "./assets/index.css";

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById("root")
);
