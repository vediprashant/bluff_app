import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Segment, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import deck from "../Images/deck.png";
import handleTokens from "../Utils/handleTokens";
import "../App.css";
import { Redirect } from "react-router-dom";
import createUser from '../actionCreators/createUser'
import deepEqual from '../Utils/deepEqual'

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameField: {
        placeholder: 'Name',
        class: 'field'
      },
      emailField: {
        placeholder: 'Email',
        class: 'field'
      },
      passwordField: {
        placeholder: 'Password',
        class: 'field'
      },
      confirmPasswordField: {
        placeholder: 'Confirm Password',
        class: 'field'
      },
    }
  }

  handleNameChange = evt => {
    if (evt.target.value === '') {
      this.setState({
        nameField: {
          class: 'field error',
          placeholder: 'Name cannot be blank',
        }
      })
    }else {
      this.setState({
        nameField: {
          class: 'field',
          placeholder: 'Name',
        }
      })
    }
    this.setState({ name: evt.target.value })
  }

  handleEmailChange = evt => {
    var emailField = this.state.emailField
    var re = /\S+@\S+\.\S+/
    if (!re.test(evt.target.value)) {
      evt.target.value = ''
      this.setState({
        emailField: {
          class: 'field error',
          placeholder: 'Enter valid Email'
        }
      })
    } else {
      emailField.class = 'field'
      emailField.placeholder = 'Email'
      this.setState({
        emailField: {
          class: 'field',
          placeholder: 'Email'
        }
      })
      this.setState({ email: evt.target.value })
    }
  }

  handlePasswordChange = evt => this.setState({ password: evt.target.value })

  handleConfirmPasswordChange = evt => {
    if (evt.target.value !== this.state.password) {
      this.setState({
        passwordField: {
          class: 'field error',
          placeholder: 'Passwords do not match'
        },
        confirmPasswordField: {
          class: 'field error',
          placeholder: 'Passwords do not match'
        }
      })
    } else {
      this.setState({
        passwordField: {
          class: 'field',
          placeholder: 'Password'
        },
        confirmPasswordField: {
          class: 'field',
          placeholder: 'Confirm Password'
        }
      })
    }
    this.setState({ confirmPassword: evt.target.value })
  }

  handleSubmit = () => {
    var { name, email, password, confirmPassword } = this.state
    this.props.createUserAction(name = name, email = email, password = password, confirmPassword = confirmPassword)
  }
  /**
   * Shows warning messages
   */

  shouldComponentUpdate(nextProps, nextState) {
    if (deepEqual(nextState, this.state) && deepEqual(this.props, nextProps)) {
      return false
    }
    return true
  }
  componentWillReceiveProps() {
    console.log('will recieve')
    let response = this.props.response
    console.log(response)
    if (response.name) {
      this.setState({
        nameField: {
          class: 'field error',
          placeholder: response.name
        },
      })
    } else {
      this.setState({
        nameField: {
          class: 'field',
          placeholder: 'Name'
        },
      })
    }
    if (response.email) {
      this.setState({
        emailField: {
          class: 'field error',
          placeholder: response.email
        },
      })
    } else {
      this.setState({
        emailField: {
          class: 'field',
          placeholder: 'Email'
        },
      })
    }
    if (response.password) {
      this.setState({
        passwordField: {
          class: 'field error',
          placeholder: response.password
        },
        confirmPasswordField: {
          class: 'field error',
          placeholder: response.password
        }
      })
    } else {
      this.setState({
        passwordField: {
          class: 'field',
          placeholder: 'Password'
        },
        confirmPasswordField: {
          class: 'field',
          placeholder: 'Confirm Password'
        }
      })
    }
  }

  showMessage = () => {
    var { response } = this.props
    let message = response.message
    if (message === "") {
      return null;
    } else {
      return (
        <div id='signUpWarn' className="ui bottom attached red warning message">
          {message}
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
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder={this.state.passwordField.placeholder}
                  className={this.state.passwordField.class}
                  type="password"
                  onChange={this.handlePasswordChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder={this.state.confirmPasswordField.placeholder}
                  className={this.state.confirmPasswordField.class}
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
const mapStatetoProps = state => {
  return {
    loading: state.createUser.loading,
    response: state.createUser.response
  }
}
export default connect(
  mapStatetoProps,
  {
    createUserAction: createUser
  }
)(SignUpPage)
