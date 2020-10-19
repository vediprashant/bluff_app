import React from "react";

import { Redirect, Route } from "react-router-dom";
import { withCookies } from "react-cookie";

import ROUTES from "../constants/pathConstants";
import handleTokens from "../Utils/handleTokens";

const AnonymousRoute = ({ component: Component, cookies, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        handleTokens.getToken(cookies, "token") ? (
          <Redirect
            to={{
              pathname: ROUTES.HOME_ROUTE,
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default withCookies(AnonymousRoute);
