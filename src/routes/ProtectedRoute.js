import React from "react";

import { Redirect, Route } from "react-router-dom";
import { withCookies } from "react-cookie";

import ROUTES from "../constants/pathConstants";
import handleTokens from "../Utils/handleTokens";

const ProtectedRoute = ({ component: Component, cookies, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        handleTokens.getToken(cookies, "token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.LOGIN_ROUTE,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default withCookies(ProtectedRoute);
