import React, { useEffect } from "react";
import { connect } from "react-redux";
import cardsHandler from "../Utils/cardsHandler";
import stringMapperToCards from "../Utils/stringMapperToCards";
import "./playerCards.css";

const PlayerCards = (props) => {
  let x = props.game?.gameState?.self?.cards;
  let pos = [];
  if (x !== undefined) {
    pos = stringMapperToCards(x);
  }
  let cards = [];
  if (pos.length > 0) {
    cards = cardsHandler(pos);
  }
  let playerCards = cards.map((number, ind) => (
    <img
      id={pos[ind]}
      class="card"
      src={`./PNG/${number}.png`}
      alt="card"
    ></img>
  ));
  useEffect(() => {
    let stack = document.querySelectorAll(".card");
    for (let i = 0; i < stack.length; i++) {
      let card = stack[i];
      card.addEventListener("click", selectCard);
    }
  }, [playerCards]);

  function selectCard(event) {
    event.stopImmediatePropagation();
    event.target.classList.toggle("selectedCards");
  }
  return <div className="playerCards">{playerCards}</div>;
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};

export default connect(mapStateToProps)(PlayerCards);
