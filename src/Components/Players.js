import React from "react";
import { useState, useEffect } from "react";
import { render } from "@testing-library/react";
/**
 * Takes list containing players, and an object containng self details
 * renders them in a circle
 * @param {*} props
 */
export default function Player(props) {
  var renderedPlayers = [];
  useEffect(() => {
    //Arrange players in nice circles
    const ele = document.getElementsByClassName("player");
    const width = 650;
    const height = 667;
    const radius = 300;
    let angle = 0;
    let step = (2 * Math.PI) / ele.length;
    console.log(step);
    for (let i = 0; i < ele.length; i++) {
      var x = Math.round(width / 2 + radius * Math.cos(angle) - 80 / 2);
      var y = Math.round(height / 2 + radius * Math.sin(angle) - 80 / 2);
      console.log(x, y);
      ele[i].style.top = x + "px";
      ele[i].style.right = y + "px";
      angle += step;
    }
  });

  //initialize with self player entry
  console.log(props.self ? props.self.user.name : "Loading");
  if (props.self) {
    renderedPlayers.push(
      <div className="player">
        <img
          src="https://picsum.photos/200"
          class="ui avatar tiny image"
          alt="avatar"
        />
        <span>{props.self.user.name}</span>
      </div>
    );
  }
  //Fill in rest of the players
  props.game_players.map((player, index) => {
    renderedPlayers.push(
      <div className="player">
        <img
          src="https://picsum.photos/200"
          class="ui avatar tiny image"
          alt="avatar"
        />
        <span>{player.user.name}</span>
        <img
          className="cardCountImg ui tiny image"
          src="./PNG/blue_back.png"
          alt="cardsCount"
        />
        <span class="cardCountNum">{player.card_count}</span>
      </div>
    );
  });
  return <div className="avatars">{renderedPlayers}</div>;
}
