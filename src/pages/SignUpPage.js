import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { connect } from "react-redux";

import deck from "../assets/deck.png";
import "../App.css";
import createUser from "../actionCreators/createUser";
import deepEqual from "../Utils/deepEqual";

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleNameChange = (evt) => {
    if (evt.target.value === "") {
      this.setState({
        nameField: {
          class: "field error",
          placeholder: "Name cannot be blank",
        },
      });
    } else {
      this.setState({
        nameField: {
          class: "field",
          placeholder: "Name",
        },
      });
    }
    this.setState({ name: evt.target.value });
  };

  handleEmailChange = (evt) => {
    const emailField = this.state.emailField;
    const re = /\S+@\S+\.\S+/;
    if (!re.test(evt.target.value)) {
      evt.target.value = "";
      this.setState({
        emailField: {
          class: "field error",
          placeholder: "Enter valid Email",
        },
      });
    } else {
      this.setState({
        emailField: {
          class: "field",
          placeholder: "Email",
        },
      });
    }
  };

  updateEmailState = (evt) => {
    this.setState({ email: evt.target.value });
  };

  handlePasswordChange = (evt) => this.setState({ password: evt.target.value });

  handleConfirmPasswordChange = (evt) => {
    if (evt.target.value !== this.state.password) {
      this.setState({
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
      this.setState({
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
    this.setState({ confirmPassword: evt.target.value });
  };

  handleSubmit = () => {
    const { name, email, password, confirmPassword } = this.state;
    this.props.createUserAction(
      name,
      email,
      password,
      confirmPassword
    );
  };
  /**
   * Shows warning messages
   */

  componentDidUpdate(prevProps) {
    //if no api call, return
    if (!prevProps.loading) return

    let response = this.props.response;
    let newState = { ...this.state }
    if (response.name) {
      newState.nameField = {
        class: "field error",
        placeholder: response.name,
      }
    } else {
      newState.nameField = {
        class: "field",
        placeholder: "Name",
      }
    }
    if (response.email) {
      newState.emailField = {
        class: "field error",
        placeholder: response.email,
      }
    } else {
      newState.emailField = {
        class: "field",
        placeholder: "Email",
      }
    }
    if (response.password) {
      if (response.password === 'Password must have atleast 8 characters'){
        newState.password = ''
        newState.confirmPassword = ''
      }
      newState.passwordField = {
        class: "field error",
        placeholder: response.password,
      }
      newState.confirmPasswordField = {
        class: "field error",
        placeholder: response.password,
      }
    } else {
      newState.passwordField = {
        class: "field",
        placeholder: "Password",
      }
      newState.confirmPasswordField = {
        class: "field",
        placeholder: "Confirm Password",
      }
    }
    //prevents infinite render loop in case api takes too long to respond
    if (!deepEqual(this.state, newState)) {
      this.setState(newState)
    }
  }

  showMessage = () => {
    const { response } = this.props;
    let message = response.message;
    if (message === "") {
      return null;
    } else if (message === "Success") {
      this.props.history.push("/login/");
    } else {
      return (
        <div id="signUpWarn" className="ui bottom attached red warning message">
          {message}
        </div>
      );
    }
  };

  render() {
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
                  onChange={this.handleNameChange}
                  iconPosition="left"
                  placeholder={this.state.nameField.placeholder}
                  className={this.state.nameField.class}
                />
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder={this.state.emailField.placeholder}
                  className={this.state.emailField.class}
                  onBlur={this.handleEmailChange}
                  onChange={this.updateEmailState}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder={this.state.passwordField.placeholder}
                  className={this.state.passwordField.class}
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder={this.state.confirmPasswordField.placeholder}
                  className={this.state.confirmPasswordField.class}
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.handleConfirmPasswordChange}
                />
                <Button
                  color="blue"
                  fluid
                  size="large"
                  onClick={this.handleSubmit}
                >
                  Sign-Up
                </Button>
              </Segment>
            </Form>
            {this.showMessage()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    loading: state.user.signUp.loading,
    response: state.user.signUp.response,
  };
};

export default connect(mapStatetoProps, {
  createUserAction: createUser,
})(SignUpPage);
