import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import cardsHandler from "../Utils/cardsHandler";
import "./playerCardsModel.css";
import stringMapperToCards from "../Utils/stringMapperToCards";

function ModalExampleBasic(props) {
  let stringCards;
  console.log(props.game.gameState);
  if (props.game.gameState.bluff_cards !== undefined)
    stringCards = props.game.gameState.bluff_cards;
  else {
    stringCards = null;
  }
  let playerCards;
  if (stringCards !== null) {
    let listCards = stringMapperToCards(stringCards);
    let cards = cardsHandler(listCards);
    cards = cardsHandler(cards);
    playerCards = cards.map((number, ind) => (
      <img
        class="bluffCardsPlayed"
        src={`./PNG/${number}.png`}
        alt="card"
      ></img>
    ));
  }
  return <div></div>;
  //   return (
  //     // <Modal
  //     //   onClose={() => setOpen(false)}
  //     //   onOpen={() => setOpen(true)}
  //     //   open={open}
  //     //   dimmer={"blurred"}
  //     // >
  //     //   <Modal.Header>Cards Played</Modal.Header>
  //     //   <Modal.Content image>
  //     //     <div class="bluffCards">{playerCards}</div>
  //     //   </Modal.Content>
  //     //   <Modal.Actions>
  //     //     <Button color="black" onClick={() => setOpen(false)}>
  //     //       Close
  //     //     </Button>
  //     //   </Modal.Actions>
  //     // </Modal>
  //   );
}
const mapStatetoProps = (state) => {
  return {
    game: state.game,
  };
};

export default connect(mapStatetoProps)(ModalExampleBasic);
