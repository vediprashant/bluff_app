import React from "react";
import PropTypes from "prop-types";

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
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            props.history.push('')
            setOpen(false);
          }}
        >
          Redirect to Home Page
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

ErrorModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorModal;
