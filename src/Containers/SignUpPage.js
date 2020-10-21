import React, { useState, useEffect } from "react";

import {
  Button,
  Message,
  Form,
  Grid,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import deck from "../assets/deck.png";
import { createUser } from "../actionCreators/userActions";
import deepEqual from "../Utils/deepEqual";
import "../App.css";

/**
 * Page to SignUp a User
 */
function SignUpPage(props) {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameField: {
      placeholder: "Name",
      class: "field",
    },
    emailField: {
      placeholder: "Email",
      class: "field",
    },
    passwordField: {
      placeholder: "Password",
      class: "field",
    },
    confirmPasswordField: {
      placeholder: "Confirm Password",
      class: "field",
    },
  };
  const [state, setNewState] = useState(initialState);
  const setState = (value) =>
    setNewState((prevState) => ({ ...prevState, ...value }));
  const handleNameChange = (evt) => {
    if (evt.target.value === "") {
      setState({
        nameField: {
          class: "field error",
          placeholder: "Name cannot be blank",
        },
      });
    } else {
      setState({
        nameField: {
          class: "field",
          placeholder: "Name",
        },
      });
    }
    setState({
      name: evt.target.value,
    });
  };

  const handleEmailChange = (evt) => {
    const emailField = state.emailField;
    const re = /\S+@\S+\.\S+/;
    if (!re.test(evt.target.value)) {
      evt.target.value = "";
      setState({
        emailField: {
          class: "field error",
          placeholder: "Enter valid Email",
        },
      });
    } else {
      setState({
        emailField: {
          class: "field",
          placeholder: "Email",
        },
      });
    }
  };

  const updateEmailState = (evt) => {
    setState({ email: evt.target.value });
  };

  const handlePasswordChange = (evt) =>
    setState({ password: evt.target.value });

  const handleConfirmPasswordChange = (evt) => {
    if (evt.target.value !== state.password) {
      setState({
        passwordField: {
          class: "field error",
          placeholder: "Passwords do not match",
        },
        confirmPasswordField: {
          class: "field error",
          placeholder: "Passwords do not match",
        },
      });
    } else {
      setState({
        passwordField: {
          class: "field",
          placeholder: "Password",
        },
        confirmPasswordField: {
          class: "field",
          placeholder: "Confirm Password",
        },
      });
    }
    setState({ confirmPassword: evt.target.value });
  };

  const handleSubmit = () => {
    const { name, email, password, confirmPassword } = state;
    props.createUserAction(name, email, password, confirmPassword);
  };

  /**
   * Show field specific warning messages
   */
  useEffect(() => {
    let response = props.response;
    let newState = { ...state };
    if (response.name) {
      newState.nameField = {
        class: "field error",
        placeholder: response.name,
      };
    } else {
      newState.nameField = {
        class: "field",
        placeholder: "Name",
      };
    }
    if (response.email) {
      newState.emailField = {
        class: "field error",
        placeholder: response.email,
      };
    } else {
      newState.emailField = {
        class: "field",
        placeholder: "Email",
      };
    }
    if (response.password) {
      if (response.password === "Password must have atleast 8 characters") {
        newState.password = "";
        newState.confirmPassword = "";
      }
      newState.passwordField = {
        class: "field error",
        placeholder: response.password,
      };
      newState.confirmPasswordField = {
        class: "field error",
        placeholder: response.password,
      };
    } else {
      newState.passwordField = {
        class: "field",
        placeholder: "Password",
      };
      newState.confirmPasswordField = {
        class: "field",
        placeholder: "Confirm Password",
      };
    }
    //prevents infinite render loop in case api takes too long to respond
    if (!deepEqual(state, newState)) {
      setState(newState);
    }
  }, [props.loading]);

  const showMessage = () => {
    const { response } = props;
    let message = response.message;
    if (message === "") {
      return null;
    } else if (message === "Success") {
      props.history.push("/login/");
    } else {
      return (
        <div id="signUpWarn" className="ui bottom attached red warning message">
          {message}
        </div>
      );
    }
  };

  return (
    <div className="login">
      <Grid textAlign="center">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="grey" textAlign="center">
            <Image src={deck} />
            Create a new account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                onChange={handleNameChange}
                iconPosition="left"
                placeholder={state.nameField.placeholder}
                className={state.nameField.class}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder={state.emailField.placeholder}
                className={state.emailField.class}
                onBlur={handleEmailChange}
                onChange={updateEmailState}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder={state.passwordField.placeholder}
                className={state.passwordField.class}
                type="password"
                value={state.password}
                onChange={handlePasswordChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder={state.confirmPasswordField.placeholder}
                className={state.confirmPasswordField.class}
                type="password"
                value={state.confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <Button color="blue" fluid size="large" onClick={handleSubmit}>
                Sign-Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a user? <a href="/login">Login</a>
          </Message>
          {showMessage()}
        </Grid.Column>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.signUp.loading,
    response: state.user.signUp.response,
  };
};

const mapDispatchToProps = {
  createUserAction: createUser,
};

SignUpPage.propTypes = {
  loading: PropTypes.string.isRequired,
  response: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
