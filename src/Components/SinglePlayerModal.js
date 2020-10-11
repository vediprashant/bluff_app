import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import actions from "../actions";

function SinglePlayerModal(props) {
  const [open, setOpen] = React.useState(false);

  const totalPlayers = document.getElementsByClassName("player");
  const disconnectedPlayers = document.getElementsByClassName("disconnected");
  if (
    totalPlayers.length !== 0 &&
    disconnectedPlayers.length === totalPlayers.length - 1 &&
    props?.game?.gameState?.game?.winner === null
  ) {
    if (open === false) {
      const newData = {
        game_table: {
          ...props.game.gameState.game_table,
          current_player_id: null,
        },
      };
      props.dispatch({
        type: actions.GAME_UPDATE_STATE,
        payload: { newData },
      });
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
    game: state.game,
  };
};

export default connect(mapStatetoProps)(SinglePlayerModal);
