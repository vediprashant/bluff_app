import React, { Component } from "react";
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

import "../App.css";

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isFetching: false,
      message: '',
    }
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange = (event) => this.setState({ username: event.target.value })
  handlePasswordChange = (event) => this.setState({ password: event.target.value })

  handleSubmit = (event) => {
    fetch('http://www.abc.com')
      .then(res => {
        if (res === 200) {
          console.log('yes')
          res.json()
            .then(data => {
              //set Cookies here
            }, reason => {/*good credentials but some problem with response*/ })
            .catch(err => {/* Promise not resolved */ })
        }
        else {
          //Show login failed messages here
          console.log(res)
        }
      }, reason => this.setState({ message: reason.toString() }))
      .catch(err => console.log(err))
  }

  showMessage = () => {
    if (this.state.message === '') {
      return null
    }
    else {
      return (
        <div className='ui bottom attached warning message'>
          {this.state.message}
        </div>
      )
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
                  icon="user"
                  onChange={this.handleNameChange}
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.handlePasswordChange}
                />
                <Button
                  color="blue"
                  fluid
                  size="large"
                  onClick={this.handleSubmit}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="/signup">Sign Up</a>
            </Message>
            {this.showMessage()}
          </Grid.Column>
          
        </Grid>
      </div>
    );
  }
}
