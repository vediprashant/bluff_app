import React from "react";
import { connect } from "react-redux";

import cardsHandler from "../Utils/cardsHandler";
import stringMapperToCards from "../Utils/stringMapperToCards";
import cardsMapperToString from "../Utils/cardsMapperToString";
import { updateSelectedCards } from "../actionCreators/gameActions";
import "./playerCards.css";

/**
 * Render cards and save card selection to store
 * @param {*} props
 */
const PlayerCards = (props) => {
  const cardPositions = props.myCards
    ? stringMapperToCards(props.myCards)
    : null;
  const labeledCards = cardPositions ? cardsHandler(cardPositions) : null;
  const selectedCardsHash = cardsMapperToString(props.selectedCards, true);
  let playerCards = labeledCards.map((cardName, ind) => {
    return (
      <img
        id={cardPositions[ind]}
        className={
          selectedCardsHash[cardPositions[ind] - 1]
            ? "card selectedCards"
            : "card"
        }
        src={`../PNG/${cardName}.png`}
        alt="card"
        onClick={selectCard}
      ></img>
    );
  });

  function selectCard(event) {
    let newState = [...props.selectedCards];
    const id = event.target.id;
    if (selectedCardsHash[id - 1])
      newState.splice(newState.indexOf(id + ""), 1);
    else newState.push(id);
    //update store here, send selected cards,
    props.updateSelectedCards(newState);
  }
  return <div className="playerCards">{playerCards}</div>;
};

const mapStateToProps = (state) => {
  return {
    selectedCards: state.game.activeGame.gameState.selectedCards,
    myCards: state.game.activeGame.gameState.self.cards,
  };
};
export default connect(mapStateToProps, {
  updateSelectedCards: updateSelectedCards,
})(PlayerCards);
