import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ROUTES from "../constants/pathConstants";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ProtectedRoute from "./ProtectedRoute";
import AnonymousRoute from "./AnonymousRoute";
import HomePage from "../pages/HomePage";
import InvitePage from "../pages/Invite";
import ViewGamesPage from "../pages/ViewGamesPage";
import GamePage from "../pages/GamePage";

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
        <ProtectedRoute
          path={ROUTES.HOME_ROUTE}
          component={HomePage}
          exact={true}
        />
        <ProtectedRoute
          exact
          path={ROUTES.INVITE_ROUTE}
          component={InvitePage}
          path={ROUTES.VIEW_GAMES_ROUTE}
          component={ViewGamesPage}
          exact={true}
        />
        <ProtectedRoute
          path={ROUTES.GAME_SCREEN_ROUTE}
          component={GamePage}
          exact={true}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
