import React from "react";
import { useState, useEffect } from "react";

/**
 * Takes table card count, renders those cards
 * @param {*} props
 */
export default function TableCards(props) {
  useEffect(() => {
    const ely = document.getElementsByClassName("cards");
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
  return temp;
}
