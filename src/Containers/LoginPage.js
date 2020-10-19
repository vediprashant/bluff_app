import React, { useState, useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import PropTypes from "prop-types";

import deck from "../assets/deck.png";
import { loginHandler } from "../actionCreators/userActions";
import "../App.css";

const LoginPage = (props) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [input, setInput] = useState(initialState);
  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.validate(props.cookies, input.email, input.password);
  };

  const showMessage = () => {
    if (props.errorMessage === "") {
      return null;
    } else {
      return (
        <div className="ui bottom attached red warning message">
          {props.errorMessage}
        </div>
      );
    }
  };
  const emailError = () => {
    if (
      props.errorMessage === "Email field can't be blank" ||
      props.errorMessage === "Please provide valid Email" ||
      props.errorMessage === "Please provide valid credentials" ||
      props.errorMessage === "Please provide Input"
    ) {
      return true;
    }
    return false;
  };
  const passwordError = () => {
    if (
      props.errorMessage === "Please provide Input" ||
      props.errorMessage === "Please provide Password" ||
      props.errorMessage === "Please provide valid credentials"
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (props.loggedIn) {
      props.history.push("/");
    }
  }, [props.loggedIn]);

  return (
    <div className="login">
      <Grid textAlign="center">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="grey" textAlign="center">
            <Image src={deck} />
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="mail"
                onChange={handleInputChange}
                iconPosition="left"
                name="email"
                placeholder="Email"
                error={emailError()}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleInputChange}
                error={passwordError()}
              />
              <Button color="blue" fluid size="large" onClick={handleSubmit}>
                {props.isLoading ? (
                  <div className="ui active centered inline tiny inverted loader"></div>
                ) : (
                  "Login"
                )}
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="/signup">Sign Up</a>
          </Message>
          {props.isError ? showMessage() : null}
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.user.login.loggedIn,
  isLoading: state.user.login.isLoading,
  isError: state.user.login.isError,
  errorMessage: state.user.login.errorMessage,
  cookies: ownProps.cookies,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      validate: (cookies, email, password) =>
        loginHandler(cookies, email, password),
    },
    dispatch
  );
};

LoginPage.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  cookies: PropTypes.object.isRequired,
};

export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
