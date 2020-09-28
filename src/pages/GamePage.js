import React, { Component } from "react";
import "./GamePage.css";
import SelectSet from "../Components/SelectSet";
import Button from "../Components/Button";
import PlayerCards from "../Components/PlayerCards";
import { Route } from "react-router-dom";

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }
  componentDidMount() {
    const ele = document.getElementsByClassName("player");
    console.log(ele);
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
    let card = 0;
    let temp = [];
    const card_count = 9;
    const colors = ["blue", "gray", "green", "purple", "red", "yellow"];
    while (card < card_count) {
      let color = colors[Math.floor(Math.random() * colors.length)];
      temp.push(
        <img class="cards" src={`./PNG/${color}_back.png`} alt="card"></img>
      );
      card++;
    }
    this.setState({ cards: temp });
  }
  componentDidUpdate() {
    const ely = document.getElementsByClassName("cards");
    console.log(ely);
    for (let j = 1; j < ely.length; j++) {
      var deg = Math.floor(Math.random() * 100 + 1);
      ely[j].style.transform = `rotate(${deg}deg)`;
    }
  }
  getCardsOnTable = () => {};

  render() {
    return (
      <div>
        <div className="gameScreen">
          <div class="timer"></div>
          <div className="avatars">
            <div className="player">
              <img
                src="https://picsum.photos/200"
                class="ui avatar tiny image"
                alt="avatar"
              />
              <span>Player1</span>
            </div>
            <div className="player">
              <img
                src="https://picsum.photos/200"
                class="ui avatar tiny image"
                alt="avatar"
              />
              <span>Player2</span>
              <img
                class="cardCountImg ui tiny image"
                src="./PNG/blue_back.png"
              />
              <span class="cardCountNum">155</span>
            </div>

            <div className="player">
              <img
                src="https://picsum.photos/200"
                class="ui avatar tiny image"
                alt="avatar"
              />
              <span>Player6</span>
              <img
                class="cardCountImg ui tiny image"
                src="./PNG/blue_back.png"
              />
              <span class="cardCountNum">3</span>
            </div>
            <div className="player">
              <img
                src="https://picsum.photos/200"
                class="ui avatar tiny image"
                alt="avatar"
              />
              <span>Player6</span>
              <img
                class="cardCountImg ui tiny image"
                src="./PNG/blue_back.png"
              />
              <span class="cardCountNum">24</span>
            </div>
            <div className="player">
              <img
                src="https://picsum.photos/200"
                class="ui avatar tiny image"
                alt="avatar"
              />
              <span>Player6</span>
              <img
                class="cardCountImg ui tiny image"
                src="./PNG/blue_back.png"
              />
              <span class="cardCountNum">11</span>
            </div>
          </div>
          <div class="tableCards">{this.state.cards}</div>
        </div>
        <div class="actionButtons">
          <Button text={"Pass"} color={"purple"} />
          <Button text={"Play"} color={"purple"} />
          <Button text={"Show"} color={"purple"} />
        </div>
        <div class="playerCard">
          <h1 className="heading1">Select Cards</h1>
          <PlayerCards />
        </div>
        <div class="selectSet">
          <SelectSet />
        </div>
      </div>
    );
  }
}

export default GamePage;
