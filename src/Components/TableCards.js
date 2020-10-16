import React, { useEffect, useState } from "react";

/**
 * Takes table card count, renders those cards
 * @param {*} props
 */
export default function TableCards(props) {
  const [cards, setcards] = useState([]);
  useEffect(() => {
    let temp = [];
    let card = 0;
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
    setcards(temp);
  }, [props.card_count]);

  return <div>{cards}</div>;
}
