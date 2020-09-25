import React, { Component } from "react";
import "./GamePage.css";
import SelectSet from "../Components/SelectSet";
import Button from "../Components/Button";
import PlayerCards from "../Components/PlayerCards";

class GamePage extends Component {
  componentDidMount() {
    const ele = document.getElementsByClassName("player");
    console.log(ele);
    const width = 667;
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
  }
  render() {
    return (
      <div className="gameScreen">
        {/* <SelectSet />
        <Button text={"Pass"} color={"purple"} />
        <Button text={"Pass"} color={"purple"} />
        <Button text={"Pass"} color={"purple"} /> */}
        {/* <div className="avatars">
          <div className="player">
            <img
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              class="ui avatar tiny image"
              alt="avatar"
            />
            <span>Player1</span>
          </div>
          <div className="player">
            <img
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              class="ui avatar tiny image"
              alt="avatar"
            />
            <span>Player2</span>
          </div>
          <div className="player">
            <img
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              class="ui avatar tiny image"
              alt="avatar"
            />
            <span>Player3</span>
          </div>
          <div className="player">
            <img
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              class="ui avatar tiny image"
              alt="avatar"
            />
            <span>Player4</span>
          </div>
          <div className="player">
            <img
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              class="ui avatar tiny image"
              alt="avatar"
            />
            <span>Player5</span>
          </div>
          <div className="player">
            <img
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              class="ui avatar tiny image"
              alt="avatar"
            />
            <span>Player6</span>
          </div>
          <div className="player">
            <img
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              class="ui avatar tiny image"
              alt="avatar"
            />
            <span>Player6</span>
          </div>
          <div className="player">
            <img
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              class="ui avatar tiny image"
              alt="avatar"
            />
            <span>Player6</span>
          </div>
          <div className="player">
            <img
              src="https://react.semantic-ui.com/images/wireframe/square-image.png"
              class="ui avatar tiny image"
              alt="avatar"
            />
            <span>Player6</span>
          </div>
        </div> */}
        {/* <PlayerCards /> */}
      </div>
    );
  }
}

export default GamePage;
