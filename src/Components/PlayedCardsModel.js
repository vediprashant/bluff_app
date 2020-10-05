import React, { useEffect, useState } from "react";

import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import cardsHandler from "../Utils/cardsHandler";
import "./playerCardsModel.css";
import stringMapperToCards from "../Utils/stringMapperToCards";

function ModalExampleBasic(props) {
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
    console.log(cards);
    playerCards = cards.map((number, ind) => (
      <img
        class="bluffCardsPlayed"
        src={`./PNG/${number}.png`}
        alt="card"
      ></img>
    ));
    if (open === false) {
      setOpen(true);
    }
  }
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
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
const mapStatetoProps = (state) => {
  return {
    game: state.game,
  };
};

export default connect(mapStatetoProps)(ModalExampleBasic);
