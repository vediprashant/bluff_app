import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import AppRouter from "./Routes/Router";
import { CookiesProvider } from "react-cookie";
import "semantic-ui-css/semantic.min.css";
import "./index.css";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
