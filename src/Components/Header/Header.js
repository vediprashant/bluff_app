import React, { useEffect } from "react";

import { bindActionCreators } from "redux";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import PropTypes from "prop-types";

import ROUTES from "../../constants/pathConstants";
import actions from "actions";
import handleTokens from "Utils/handleTokens";
import { logoutUser } from "actionCreators/userActions";
import "./header.css";

/**
 * Navbar for navigation througout the app
 * @param {} props
 */
const Header = (props) => {
  useEffect(() => {
    if (handleTokens.getToken(props.cookies, "token")) {
      props.setLogin();
    }
  }, []);

  const clickHandler = () => {
    props.logoutUser(props.cookies);
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
          <button className="ui primary button logout" onClick={clickHandler}>
            Log Out{" "}
          </button>
        </div>
      ) : null}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.login.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logoutUser: (cookies) => logoutUser(cookies),
      setLogin: () => ({ type: actions.LOGGED_IN }),
    },
    dispatch
  );
};

Header.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
);
