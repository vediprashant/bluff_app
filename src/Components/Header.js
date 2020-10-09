import React, { useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import ROUTES from "../constants/pathConstants";
import actions from "../actions";
import handleTokens from "../Utils/handleTokens";
import "./header.css";

const Header = (props) => {
  useEffect(() => {
    if (handleTokens.getToken(props.cookies, "token")) {
      props.dispatch({ type: actions.LOGGED_IN });
    }
  }, []);
  const clickHanlder = () => {
    handleTokens.removeToken(props.cookies, "token");
    props.dispatch({
      type: actions.LOGGED_OUT,
    });
    console.log(1);
    props.history.push(ROUTES.LOGIN_ROUTE);
  };
  return (
    <nav className="navbar">
      {props.loggedIn ? (
        <div>
          <NavLink className="menu" to={ROUTES.HOME_ROUTE}>
            BLUFF
          </NavLink>
          <NavLink className="menu" to={ROUTES.VIEW_GAMES_ROUTE}>
            Games
          </NavLink>
          <button className="ui primary button logout" onClick={clickHanlder}>
            Log Out{" "}
          </button>
        </div>
      ) : null}
    </nav>
  );
};
const mapStateToProps = (state) => ({
  loggedIn: state.login.loggedIn,
});

export default withCookies(connect(mapStateToProps)(withRouter(Header)));
