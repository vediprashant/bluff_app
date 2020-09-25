import React from "react";
import cardsHandler from "../Utils/cardsHandler";
import "./playerCards.css";
import { Select } from "semantic-ui-react";

const PlayerCards = () => {
  let cards = [];
  for (let i = 1; i <= 12; i++) {
    cards.push(i);
  }
  cards = cardsHandler(cards);
  let playerCards = cards.map((number) => (
    <img class="card" src={`./PNG/${number}.png`} alt="card"></img>
  ));
  return <div className="playerCards">{playerCards}</div>;
};

export default PlayerCards;
