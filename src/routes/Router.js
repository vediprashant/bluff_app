import React from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";

import ROUTES from "../constants/pathConstants";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ProtectedRoute from "./ProtectedRoute";
import AnonymousRoute from "./AnonymousRoute";
import ViewGamesPage from "../pages/ViewGamesPage";
import GamePage from "../pages/GamePage";
import HomePage from "../pages/HomePage";
import Header from "../Components/Header";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter = () => {
  let location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      {location.pathname === ROUTES.GAME_SCREEN_ROUTE ? null : <Header />}
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
          path={ROUTES.VIEW_GAMES_ROUTE}
          component={ViewGamesPage}
          exact={true}
        />
        <ProtectedRoute
          path={ROUTES.GAME_SCREEN_ROUTE}
          component={GamePage}
          exact={true}
        />
        <ProtectedRoute path={ROUTES.INVALID_ROUTE} component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default AppRouter;
