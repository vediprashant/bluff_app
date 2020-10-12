import React, { Component } from "react";
import "./GamePage.css";
import { connect } from "react-redux";
import SelectSet from "../Components/SelectSet";
import Button from "../Components/Button";
import PlayerCards from "../Components/PlayerCards";
import connectToGame from "../actionCreators/connectToGame";
import TableCards from "../Components/TableCards";
import Players from "../Components/Players";
import cardsMapperToString from "../Utils/cardsMapperToString";

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      set: null,
    };
  }
  componentDidMount() {
    this.props.connectToGame("ws://localhost:8000/ws/chat/1/");
  }
  componentDidUpdate() {
    console.log(this.props.game);
  }

  playCards = () => {
    const cardsSelected = document.querySelectorAll(".selected");
    let mappedCards = [];
    for (let card = 0; card < cardsSelected.length; card++) {
      mappedCards.push(cardsSelected[card].id);
      cardsSelected[card].classList.remove("selected");
    }
    let stringCards = cardsMapperToString(mappedCards);
    console.log("play");
    const data = {
      action: "play",
      cardsPlayed: stringCards,
      set: this.state.set,
      current_user: 1,
    };
    const jsonData = JSON.stringify(data);
    this.props.game.socket.send(jsonData);
  };

  startGame = () => {
    const data = {
      action: "start",
    };
    const jsonData = JSON.stringify(data);
    this.props.game.socket.send(jsonData);
  };

  selectSet = (event) => {
    let updatedSet;
    switch (event.target.textContent) {
      case "J":
        updatedSet = 11;
        break;
      case "Q":
        updatedSet = 12;
        break;
      case "K":
        updatedSet = 13;
        break;
      case "A":
        updatedSet = 1;
        break;
      default:
        updatedSet = event.target.textContent;
        break;
    }
    this.setState({ set: updatedSet });
  };

  render() {
    return (
      <div className="gameScreen">
        {this.props.game?.gameState?.game_table?.currentUser ===
        this.props.game?.gameState?.self?.user?.id ? (
          <div className="timer"></div>
        ) : null}
        <Players
          game_players={this.props.game.gameState.game_players}
          self={this.props.game.gameState.self}
        />
        <div className="tableCards">
          <TableCards
            card_count={this.props.game?.gameState?.game_table?.card_count}
          />
        </div>
        {this.props.game?.gameState?.game_table?.currentUser ===
        this.props.game?.gameState?.self?.user?.id ? (
          <div className="actionButtons">
            <Button text={"Pass"} color={"purple"} />
            <Button text={"Play"} color={"purple"} onClick={this.playCards} />
            {this.props.game?.gameState?.game_table?.lastUser !==
              this.props.game?.gameState?.self?.user?.id &&
            this.props.game?.gameState?.game_table?.card_count !== 0 ? (
              <Button text={"Show"} color={"purple"} className={"disabled"} />
            ) : null}
          </div>
        ) : null}
        {this.props.game?.gameState?.game?.owner ===
        this.props.game?.gameState?.self?.user?.id ? (
          <Button
            text={"Start Game"}
            color={"grey"}
            className={"startGame"}
            onClick={this.startGame}
          />
        ) : null}
        <div className="playerCard">
          <h1 className="heading1">Select Cards</h1>
          <PlayerCards />
        </div>
        {this.props.game?.gameState?.game_table?.currentUser ===
          this.props?.game?.gameState?.self?.user?.id &&
        this.props?.game?.gameState?.game_table?.card_count === 0 ? (
          <div className="selectSet">
            <SelectSet selectSet={this.selectSet} />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    game: state.game,
  };
};

export default connect(mapStatetoProps, {
  connectToGame: connectToGame,
})(GamePage);
