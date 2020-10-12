import React from "react";
import cardsHandler from "../Utils/cardsHandler";
import "./playerCards.css";

const PlayerCards = () => {
  let pos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 54, 84, 123, 156];

  let cards = cardsHandler(pos);
  let playerCards = cards.map((number, ind) => (
    <img
      id={pos[ind]}
      class="card"
      src={`./PNG/${number}.png`}
      alt="card"
    ></img>
  ));

  let stack = document.querySelectorAll(".card");
  for (let i = 0; i < stack.length; i++) {
    let card = stack[i];
    card.addEventListener("click", selectCard);
  }

  function selectCard(event) {
    event.stopImmediatePropagation();
    event.target.classList.toggle("selected");
  }
  return <div className="playerCards">{playerCards}</div>;
};

export default PlayerCards;
