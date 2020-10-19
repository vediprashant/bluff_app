import React from "react";
import ReactDOM from "react-dom";

import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";

import store from "./store";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
