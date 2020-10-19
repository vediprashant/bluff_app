import React, { Component } from "react";

import { connect } from "react-redux";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { withCookies } from "react-cookie";
import PropTypes from "prop-types";

import { inviteUser, showInvitedUsers } from "../actionCreators/gameActions";
import deck from "../assets/deck.png";
import "../App.css";
import ErrorModal from "../Components/ErrorModal";

class InvitePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  componentDidMount() {
    this.props.listInvited(this.props.cookies, this.props.match.params.game);
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.invite(
      this.props.cookies,
      this.state.email,
      this.props.match.params.game
    );
  };

  showInvited = () => {
    const invited = this.props.invitedPlayers;
    if (invited.length !== 0) {
      const list = invited.map((user, index) => (
        <div className="item" key={index}>
          {user}
        </div>
      ));
      const message = (
        <div className="ui info message">
          <div className="header">Invited Players</div>
          <div className="ui ordered list">{list}</div>
        </div>
      );
      return message;
    } else return null;
  };

  render() {
    const message = this.props.message;
    return (
      <div className="login">
        <Grid textAlign="center">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h3" color="brown">
              Game Code {this.props.match.params.game}
            </Header>
            <Header as="h2" color="grey" textAlign="center">
              <Image src={deck} />
              Invite your friends
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="mail"
                  onChange={this.handleEmailChange}
                  iconPosition="left"
                  placeholder="Email"
                />
                <Button
                  color="blue"
                  fluid
                  size="large"
                  onClick={this.handleSubmit}
                >
                  {message === "Inviting" ? (
                    <div className="ui active centered inline tiny inverted loader"></div>
                  ) : (
                    "Invite"
                  )}
                </Button>
              </Segment>
            </Form>
            {message === "Forbidden" && (
              <ErrorModal
                message="You must be owner of the game in order to invite players"
                title="Forbidden"
              />
            )}
            {message === "Inviting" && (
              <div className="ui bottom attached message">{message}</div>
            )}
            {message === "User Invited" && (
              <div className="ui bottom attached success message">
                {message}
              </div>
            )}
            {!["Forbidden", "Inviting", "User Invited", ""].includes(
              message
            ) && (
              <div
                id="inviteWarn"
                className="ui bottom attached red warning message"
              >
                {message}
              </div>
            )}
            {this.showInvited()}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.game.inviteToGame.inviteMessage,
    invitedPlayers: state.game.inviteToGame.invitedPlayers,
  };
};

const mapDispatchToProps = {
  invite: inviteUser,
  listInvited: showInvitedUsers,
};

InvitePage.propTypes = {
  message: PropTypes.string,
  invitedPlayers: PropTypes.array,
};
export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(InvitePage)
);
