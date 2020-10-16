import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";

function ErrorModal(props) {
  const [open, setOpen] = React.useState(false);
  if (open === false) setOpen(true);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>{props.message}</Header>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default ErrorModal;
