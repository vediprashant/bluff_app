import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { withCookies } from "react-cookie";
import PropTypes from "prop-types";

import { inviteUser, showInvitedUsers } from "../actionCreators/gameActions";
import deck from "../assets/deck.png";
import "../App.css";
import ErrorModal from "./ErrorModal";
/**
 * A Page where you can invite users and see a list of currently invited one's
 */
function InvitePage(props) {
  const [email, setEmail] = useState("");
  const message = props.message;
  /*Set currently invited players on mount */
  useEffect(() => {
    props.listInvited(props.cookies, props.match.params.game);
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.invite(props.cookies, email, props.match.params.game);
  };
  /* Gets invited Players and converts them to ui list*/
  const showInvited = () => {
    const invited = props.invitedPlayers;
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

  return (
    <div className="login">
      <Grid textAlign="center">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h3" color="brown">
            Game Code {props.match.params.game}
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
                onChange={handleEmailChange}
                iconPosition="left"
                placeholder="Email"
              />
              <Button color="blue" fluid size="large" onClick={handleSubmit}>
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
              history={props.history}
            />
          )}
          {message === "Inviting" && (
            <div className="ui bottom attached message">{message}</div>
          )}
          {message === "User Invited" && (
            <div className="ui bottom attached success message">{message}</div>
          )}
          {!["Forbidden", "Inviting", "User Invited", ""].includes(message) && (
            <div
              id="inviteWarn"
              className="ui bottom attached red warning message"
            >
              {message}
            </div>
          )}
          {showInvited()}
        </Grid.Column>
      </Grid>
    </div>
  );
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
  message: PropTypes.string.isRequired,
  invitedPlayers: PropTypes.array.isRequired,
};
export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(InvitePage)
);
