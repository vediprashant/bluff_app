import React from "react";

/**
 * Takes table card count, renders those cards
 * @param {*} props
 */
export default function TableCards(props) {
  let card = 0;
  let temp = [];
  const card_count = props.card_count;
  const colors = ["blue", "gray", "green", "purple", "red", "yellow"];
  while (card < card_count) {
    let color = colors[Math.floor(Math.random() * colors.length)];
    let deg = Math.floor(Math.random() * 100 + 1);
    temp.push(
      <img
        key={temp.length}
        className="cards"
        src={`../PNG/${color}_back.png`}
        style={{ transform: `rotate(${deg}deg)` }}
        alt="card"
      ></img>
    );
    card++;
  }
  return <div>{temp}</div>;
}
