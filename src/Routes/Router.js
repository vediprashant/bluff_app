import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ROUTES from "../Constants/pathConstants";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import ProtectedRoute from "./ProtectedRoute";
import AnonymousRoute from "./AnonymousRoute";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <AnonymousRoute
          path={ROUTES.LOGIN_ROUTE}
          component={LoginPage}
          exact={true}
        />
        <AnonymousRoute
          path={ROUTES.SIGNUP_ROUTE}
          component={SignUpPage}
          exact={true}
        />
        <ProtectedRoute path={ROUTES.HOME_ROUTE} exact={true} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
