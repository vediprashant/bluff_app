import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";

import deck from "../Images/deck.png";
import createUser from "../Utils/createUser"
import handleTokens from "../Utils/handleTokens";
import "../App.css";
import { Redirect } from "react-router-dom";

export default class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: '',
    }
  }
  handleNameChange = evt => {
    this.setState({ name: evt.target.value })
  }
  handleEmailChange = evt => this.setState({ email: evt.target.value })
  handlePasswordChange = evt => this.setState({ password: evt.target.value })
  handleConfirmPasswordChange = evt => this.setState({ confirmPassword: evt.target.value })
  handleSubmit = () => {
    var { name, email, password, confirmPassword } = this.state
    createUser(name, email, password, confirmPassword).then(
      message => message === 'Success' ? /*redirect */null : this.setState({message: message}))
  }
  /**
   * Shows warning messages
   */
  showMessage = () => {
    if (this.state.message === "") {
      return null;
    } else {
      return (
        <div id='signUpWarn' className="ui bottom attached red warning message">
          {this.state.message.split('\n').map((item, idx) => 
            <span key={idx} >{item}<br/></span>
          )}
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
              Create a new account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  onChange={this.handleNameChange}
                  iconPosition="left"
                  placeholder="Name"
                />
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail"
                  onChange={this.handleEmailChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handlePasswordChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  type="password"
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
