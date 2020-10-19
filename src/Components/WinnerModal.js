import React from "react";

import { Header, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

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
    </Modal>
  );
}

WinnerModal.propTypes = {
  game: PropTypes.shape({
    gameState: PropTypes.shape({
      self: PropTypes.object,
      game: PropTypes.object,
    }).isRequired,
  }).isRequired,
};

export default WinnerModal;
