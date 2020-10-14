import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";

function ErrorModal(props) {
  const [open, setOpen] = React.useState(false);
  if (props.game?.gameState?.init_success === false) {
    var message = props.game.gameState.message;
    message = message.split("string=")[1].split("'")[1];
    if (open === false) setOpen(true);
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Unable to join game</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>{message}</Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            props.history.push("/games/");
            setOpen(false);
          }}
        >
          Redirect to my games
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ErrorModal;
