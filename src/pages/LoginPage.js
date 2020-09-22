import React, { Component } from "react";
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

import deck from "../assets/deck.png";
import loginHandler from "../actionCreators/loginHandler";

import "../App.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.validate(
      this.props.cookies,
      this.state.email,
      this.state.password
    );
  };

  showMessage = () => {
    if (this.props.errorMessage === "") {
      return null;
    } else {
      return (
        <div className="ui bottom attached red warning message">
          {this.props.errorMessage}
        </div>
      );
    }
  };
  emailError = () => {
    if (
      this.props.errorMessage === "Email field can't be blank" ||
      this.props.errorMessage === "Please provide valid Email" ||
      this.props.errorMessage === "Please provide valid credentials" ||
      this.props.errorMessage === "Please provide Input"
    ) {
      return true;
    }
    return false;
  };
  passwordError = () => {
    if (
      this.props.errorMessage === "Please provide Input" ||
      this.props.errorMessage === "Please provide Password" ||
      this.props.errorMessage === "Please provide valid credentials"
    ) {
      return true;
    }
    return false;
  };
  componentDidUpdate() {
    if (this.props.loggedIn) {
      this.props.history.push("/");
    }
  }
  render() {
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
                  onChange={this.handleInputChange}
                  iconPosition="left"
                  name="email"
                  placeholder="Email"
                  error={this.emailError()}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={this.handleInputChange}
                  error={this.passwordError()}
                />
                <Button
                  color="blue"
                  fluid
                  size="large"
                  onClick={this.handleSubmit}
                >
                  {this.props.isLoading ? (
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
            {this.props.isError ? this.showMessage() : null}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.loggedIn,
  isLoading: state.isLoading,
  isError: state.isError,
  errorMessage: state.errorMessage,
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

export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
