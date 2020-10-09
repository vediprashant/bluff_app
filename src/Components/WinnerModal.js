import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";

function WinnerModal(props) {
  const [open, setOpen] = React.useState(false);
  if (
    props.game?.gameState?.game?.winner !== undefined &&
    props.game?.gameState?.game?.winner !== null
  ) {
    if (open === false) setOpen(true);
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Game Finished</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>
            {props?.game?.gameState?.game?.winner ===
            props.game?.gameState?.self?.user?.id
              ? "You Won, Congratulations!!!"
              : `${props?.game?.gameState?.game?.winner_name} is the Winner!!!`}
          </Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            props.game.gameState.game.winner = null;
            setOpen(false);
          }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

const mapStatetoProps = (state) => {
  return {
    game: state.game,
  };
};

export default connect(mapStatetoProps)(WinnerModal);
