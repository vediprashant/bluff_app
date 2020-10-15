import React from "react";
import { useLocation } from "react-router-dom";
import { matchPath } from "react-router";

import Header from "./Components/Header";
import AppRouter from "./routes/Router";
import "./App.css";

function App() {
  let location = useLocation();
  const match = matchPath(location.pathname, {
    path: "/game/:id",
    exact: true,
  });
  return (
    <div>
      {match ? null : <Header />}
      <AppRouter />
    </div>
  );
}

export default App;
