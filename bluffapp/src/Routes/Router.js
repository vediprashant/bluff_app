import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ROUTES from "../Constants/pathConstants";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import HomePage from "../Pages/HomePage";
import ViewGamesPage from "../Pages/ViewGamesPage";
import GamePage from "../Pages/GamePage";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path={ROUTES.LOGIN_ROUTE} component={LoginPage} exact={true} />
        <Route path={ROUTES.SIGNUP_ROUTE} component={SignUpPage} exact={true} />
        <Route path={ROUTES.HOME_ROUTE} component={HomePage} exact={true} />
        <Route
          path={ROUTES.VIEW_GAMES_ROUTE}
          component={ViewGamesPage}
          exact={true}
        />
        <Route
          path={ROUTES.GAME_SCREEN_ROUTE}
          component={GamePage}
          exact={true}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
