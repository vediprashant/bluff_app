import React from "react";
import { useEffect, useRef } from "react";

/**
 * Takes table card count, renders those cards
 * @param {*} props
 */
export default function TableCards(props) {
  const allTableCards = useRef(null);
  useEffect(() => {
    const ely = allTableCards.current.childNodes;
    for (let j = 1; j < ely.length; j++) {
      var deg = Math.floor(Math.random() * 100 + 1);
      ely[j].style.transform = `rotate(${deg}deg)`;
    }
  });
  let card = 0;
  let temp = [];
  const card_count = props.card_count;
  const colors = ["blue", "gray", "green", "purple", "red", "yellow"];
  while (card < card_count) {
    let color = colors[Math.floor(Math.random() * colors.length)];
    temp.push(
      <img
        key={temp.length}
        className="cards"
        src={`../PNG/${color}_back.png`}
        alt="card"
      ></img>
    );
    card++;
  }
  return <div ref={allTableCards}>{temp}</div>;
}
