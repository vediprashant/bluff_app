import React from "react";
import { connect } from "react-redux";

import { Header, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import actions from "../actions";

/**
 * Modal to show when only one player is connected to game
 * @param {*} props
 */
function SinglePlayerModal(props) {
  const [open, setOpen] = React.useState(false);
  const totalPlayers = props.game.gameState.game_players.length + 1;
  const disconnectedPlayers = props.game.gameState.game_players.filter(
    (player) => {
      return player.disconnected;
    }
  );
  if (
    props.game.gameState &&
    disconnectedPlayers.length === totalPlayers - 1 &&
    props?.game?.gameState?.game?.winner === null
  ) {
    const newData = {
      game_table: {
        ...props.game.gameState.game_table,
        current_player_id: null,
      },
    };
    if (
      props.game?.gameState?.game_table &&
      props.game.gameState.game_table.current_player_id !== null
    ) {
      props.dispatch({
        type: actions.GAME_UPDATE_STATE,
        payload: { newData },
      });
    }
    if (open === false) {
      setOpen(true);
    }
  } else {
    if (open === true) setOpen(false);
  }

  return (
    <Modal open={open}>
      <Modal.Header>No Other Player Present</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Please wait for someone else to join the game!</Header>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

const mapStatetoProps = (state) => {
  return {
    game: state.game.activeGame,
  };
};
SinglePlayerModal.propTypes = {
  game: PropTypes.object,
};
export default connect(mapStatetoProps)(SinglePlayerModal);
