import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import AppRouter from "./routes/Router";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./index.css";
import AppRouter from "./routes/Router";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
