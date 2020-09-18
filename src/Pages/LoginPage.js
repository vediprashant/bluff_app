import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

import deck from "../Images/deck.png";
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
    this.props.validate(this.state.email, this.state.password);
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
  componentDidUpdate() {
    if (this.props.loggedIn) {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <div className="login">
        {console.log(this.props.loggedIn)}
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
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={this.handleInputChange}
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

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  isLoading: state.isLoading,
  isError: state.isError,
  errorMessage: state.errorMessage,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { validate: (email, password) => loginHandler(email, password) },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
