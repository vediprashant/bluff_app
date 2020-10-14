import React from "react";
import cardsHandler from "../Utils/cardsHandler";
import stringMapperToCards from "../Utils/stringMapperToCards";
import "./playerCards.css";

const PlayerCards = (props) => {
  let x = props.game?.gameState?.self?.cards;
  let pos = [];
  if (x !== undefined) {
    pos = stringMapperToCards(x);
  }
  let givenCards = [];
  if (pos.length > 0) {
    givenCards = cardsHandler(pos);
  }
  let playerCards = givenCards.map((number, ind) => (
    <img
      id={pos[ind]}
      class="card"
      src={`../PNG/${number}.png`}
      alt="card"
      onClick={selectCard}
    ></img>
  ));
  function selectCard(event) {
    event.target.classList.toggle("selectedCards");
  }
  return <div className="playerCards">{playerCards}</div>;
};

export default PlayerCards;
