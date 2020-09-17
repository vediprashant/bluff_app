import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
import handleTokens from "../Utils/handleTokens";
import validateUser from "../Utils/validateUser";

import "../App.css";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isFetching: false,
      message: "",
      isError: false,
      isLoading: false,
    };
  }
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    this.setState({ isLoading: true });
    event.preventDefault();
    const jsonData = await validateUser(this.state.email, this.state.password);
    if (jsonData.token) {
      this.setState({ isError: false, isLoading: false });
      handleTokens.addToken("token", jsonData.token);
      this.props.history.push("/");
    } else {
      this.setState({
        isError: true,
        isLoading: false,
      });
      if (jsonData.message) {
        this.setState({
          message: jsonData.message,
        });
      }
    }
  };

  showMessage = () => {
    if (this.state.message === "") {
      return null;
    } else {
      return (
        <div className="ui bottom attached red warning message">
          {this.state.message}
        </div>
      );
    }
  };

  render() {
    return (
      <div className="login">
        {handleTokens.getToken("token") ? <Redirect to="/" /> : null}
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
                  {this.state.isLoading ? (
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
            {this.state.isError ? this.showMessage() : null}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
