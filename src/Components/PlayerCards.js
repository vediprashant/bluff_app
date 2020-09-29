import React from "react";
import cardsHandler from "../Utils/cardsHandler";
import "./playerCards.css";
import { Select } from "semantic-ui-react";

/**
 * Renders cards from a given array
 * @param {*} props 
 */
const PlayerCards = (props) => {
  let cards = cardsHandler(props.cards);
  let playerCards = cards.map((number, index) => (
    <img class="card" src={`./PNG/${number}.png`} alt="card"></img>
  ));
  return <div className="playerCards">{playerCards}</div>;
};

export default PlayerCards;
