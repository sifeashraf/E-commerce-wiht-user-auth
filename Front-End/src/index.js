/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import Usercontext from "./components/context";
const root = ReactDOM.createRoot(document.getElementById("root"));
// const noroot = ReactDOM.createRoot(document.getElementById("noroot"));

root.render(
  <BrowserRouter>
    <Usercontext>
      <App />
    </Usercontext>
  </BrowserRouter>
);
