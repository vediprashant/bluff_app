import React, { useState, useEffect } from "react";

import { Button, Modal } from "semantic-ui-react";
import PropTypes from "prop-types";

import cardsHandler from "Utils/cardsHandler";
import stringMapperToCards from "Utils/stringMapperToCards";
import "./playerCardsModal.css";

/**
 * Modal to display the cards in context of current bluff call.
 * @param {} props
 */
function PlayedCardsModal(props) {
  const [open, setOpen] = useState(false);
  const [bluffCards, setBluffCards] = useState([]);
  const bluffLooser = props.game.gameState.bluffLooser;
  const mySelf = props.game.gameState.self?.user;

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
          className="bluffCardsPlayed"
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
      <Modal.Header>
        {bluffLooser?.userId === mySelf?.id ? "You" : bluffLooser?.userName}
        {` lost`}
      </Modal.Header>
      <Modal.Content image>
        <div className="bluffCards">{bluffCards}</div>
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
