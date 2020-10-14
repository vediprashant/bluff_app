import React, { useState } from "react";

import { Button, Modal } from "semantic-ui-react";
import cardsHandler from "../Utils/cardsHandler";
import "./playerCardsModel.css";
import stringMapperToCards from "../Utils/stringMapperToCards";

function PlayedCardsModal(props) {
  const [open, setOpen] = useState(false);
  let stringCards;
  if (props.game.gameState.bluff_cards !== undefined)
    stringCards = props.game.gameState.bluff_cards;
  else {
    stringCards = null;
  }
  let playerCards = null;
  if (stringCards !== null) {
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
      setOpen(true);
    }
  }
  return (
    <Modal open={open}>
      <Modal.Header>{props.game.gameState.bluffLooser} lost</Modal.Header>
      <Modal.Content image>
        <div class="bluffCards">{playerCards}</div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="black"
          onClick={() => {
            props.game.gameState.bluff_cards = null;
            setOpen(false);
          }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default PlayedCardsModal;
