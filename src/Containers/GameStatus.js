import React from "react";

import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

/**
 * Gives option to invite Players or join a game
 */
export default function GameStatus(props) {
  let game = props.match.params.game;
  return (
    <Button.Group>
      <Button onClick={() => props.history.push(`/invite/${game}`)}>
        Invite Players
      </Button>
      <Button.Or />
      <Button
        onClick={() => props.history.push(`/game/${game}`)}
        color="violet"
      >
        Join Game
      </Button>
    </Button.Group>
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
