import React from "react";

import { Switch } from "react-router-dom";

import ROUTES from "../constants/pathConstants";
import LoginPage from "../Containers/LoginPage";
import SignUpPage from "../Containers/SignUpPage";
import ProtectedRoute from "./ProtectedRoute";
import AnonymousRoute from "./AnonymousRoute";
import HomePage from "../Containers/HomePage";
import InvitePage from "../Containers/Invite";
import ViewGamesPage from "../Containers/ViewGamesPage";
import GamePage from "../Containers/GamePage";
import GameStatus from "../Containers/GameStatus";
import NotFoundPage from "../Containers/NotFoundPage";

const AppRouter = () => {
  return (
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
        path={ROUTES.INVITE_ROUTE}
        component={InvitePage}
        exact={true}
      />
      <ProtectedRoute
        path={ROUTES.VIEW_GAMES_ROUTE}
        component={ViewGamesPage}
        exact={true}
      />
      <ProtectedRoute
        path={ROUTES.GAME_SCREEN_ROUTE}
        component={GamePage}
        exact={true}
      />
      <ProtectedRoute
        path="/invite/:game"
        component={InvitePage}
        exact={true}
      />
      <ProtectedRoute path="/stats/:game" component={GameStatus} exact={true} />
      <ProtectedRoute path={ROUTES.INVALID_ROUTE} component={NotFoundPage} />
    </Switch>
  );
};

export default AppRouter;
