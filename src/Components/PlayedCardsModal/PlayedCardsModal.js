import React, { useState, useEffect } from "react";

import { Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import cardsHandler from "../../Utils/cardsHandler";
import stringMapperToCards from "../../Utils/stringMapperToCards";
import "./playerCardsModal.css";

function PlayedCardsModal(props) {
  const [open, setOpen] = useState(false);
  const [bluffCards, setBluffCards] = useState([]);

  let stringCards;
  if (props.game.gameState.bluff_cards !== undefined)
    stringCards = props.game.gameState.bluff_cards;
  else {
    stringCards = null;
  }
  useEffect(() => {
    if (stringCards !== null) {
      let playerCards = null;
      let listCards = stringMapperToCards(stringCards);
      let cards = cardsHandler(listCards);
      playerCards = cards.map((number, ind) => (
        <img
          class="bluffCardsPlayed"
          src={`../PNG/${number}.png`}
          alt="card"
        ></img>
      ));
      if (open === false) {
        setBluffCards(playerCards);
        setOpen(true);
      }
    }
  }, [stringCards]);

  return (
    <Modal open={open}>
      <Modal.Header>{props.game.gameState.bluffLooser} lost</Modal.Header>
      <Modal.Content image>
        <div class="bluffCards">{bluffCards}</div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

PlayedCardsModal.propTypes = {
  game: PropTypes.shape({
    gameState: PropTypes.object.isRequired,
  }),
};

export default PlayedCardsModal;
