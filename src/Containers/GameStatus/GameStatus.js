import React from "react";

import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./gameStatus.css";

/**
 * Gives option to invite Players or join a game
 */
export default function GameStatus(props) {
  let game = props.match.params.game;
  return (
    <div className="inviteOrJoin">
      <Button.Group>
        <Button
          className="huge"
          onClick={() => props.history.push(`/invite/${game}`)}
        >
          Invite Players
        </Button>
        <Button.Or />
        <Button
          className="huge"
          onClick={() => props.history.push(`/game/${game}`)}
          color="violet"
        >
          Join Game
        </Button>
      </Button.Group>
    </div>
  );
}

GameStatus.propTypes = {
  /* prop provided by router having game param in url */
  match: PropTypes.shape({
    params: PropTypes.shape({
      game: PropTypes.string,
    }),
  }).isRequired,
  /* prop provided by router having a stack with history of pages navigated */
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
