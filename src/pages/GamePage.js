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
import PlayedCardsModel from "../Components/PlayedCardsModel";
import actions from "../actions";
import WinnerModal from "../Components/WinnerModal";

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      set: null,
      error: null,
    };
  }
  
  componentDidMount() {
    let gameId = this.props.match.params.id
    this.props.connectToGame(`ws://localhost:8000/ws/chat/${gameId}/`);
  }

  componentDidUpdate() {
    console.log(this.props.game.gameState);

    const allPlayers = document.getElementsByClassName("avatar");
    for (let player = 0; player < allPlayers.length; player++) {
      allPlayers[player].classList.remove("userPic");
      if (
        allPlayers[player].getAttribute("imgid") ==
        this.props.game?.gameState?.game_table?.current_player_id
      ) {
        allPlayers[player].classList.add("userPic");
      }
    }
  }

  playCards = () => {
    const cardsSelected = document.querySelectorAll(".selected");
    let mappedCards = [];
    if (
      this.state.set === null &&
      this.props.game.gameState.game_table.currentSet === null
    ) {
      this.setState({ error: "Please select the set" });
      return;
    }
    if (cardsSelected.length === 0) {
      this.setState({ error: "Please select the cards" });
      return;
    }
    this.setState({ error: null });
    for (let card = 0; card < cardsSelected.length; card++) {
      mappedCards.push(cardsSelected[card].id);
      cardsSelected[card].classList.remove("selected");
    }
    let stringCards = cardsMapperToString(mappedCards);
    const data = {
      action: "play",
      cardsPlayed: stringCards,
      set: this.state.set,
      current_user: 1,
    };
    const jsonData = JSON.stringify(data);
    this.props.game.socket.send(jsonData);
  };

  skip = () => {
    const data = {
      action: "skip",
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

  show = () => {
    const data = {
      action: "callBluff",
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
        {this.props.game?.gameState?.game_table?.current_player_id ===
        this.props.game?.gameState?.self?.player_id ? (
          <div className="timer"></div>
        ) : null}
        <Players
          game_players={this.props.game.gameState.game_players}
          self={this.props.game.gameState.self}
          last_player_turn={this.props.game?.gameState?.last_player_turn}
          action={this.props.game?.gameState?.action}
        />
        <div className="tableCards">
          <TableCards
            card_count={this.props.game?.gameState?.game_table?.card_count}
          />
        </div>
        {this.props.game?.gameState?.game_table?.current_player_id ===
        this.props.game?.gameState?.self?.player_id ? (
          <div className="actionButtons">
            <Button text={"Pass"} color={"purple"} onClick={this.skip} />
            <Button text={"Play"} color={"purple"} onClick={this.playCards} />
            {this.props.game?.gameState?.game_table?.last_player_id !==
              this.props.game?.gameState?.self?.player_id &&
            this.props.game?.gameState?.game_table?.card_count !== 0 ? (
              <Button text={"Show"} color={"purple"} onClick={this.show} />
            ) : null}
            {this.state.error ? (
              <div className="playError">{this.state.error}</div>
            ) : null}
          </div>
        ) : null}

        {this.props.game?.gameState?.game?.started === false ? (
          this.props.game?.gameState?.game?.owner ===
          this.props.game?.gameState?.self?.user?.id ? (
            <Button
              text={"Start Game"}
              color={"grey"}
              className={"startGame"}
              onClick={this.startGame}
            />
          ) : (
            <Button
              text={"Please wait for the owner to start the game"}
              color={"grey"}
              className={"startGame"}
            />
          )
        ) : null}
        {this.props.game.gameState?.game?.started ? (
          <div className="playerCard">
            <h1 className="heading1">Select Cards</h1>
            <PlayerCards />
          </div>
        ) : null}

        {this.props.game?.gameState?.game_table?.current_player_id ===
          this.props?.game?.gameState?.self?.player_id &&
        this.props?.game?.gameState?.game_table?.card_count === 0 ? (
          <div className="selectSet">
            <SelectSet selectSet={this.selectSet} />
          </div>
        ) : null}
        <PlayedCardsModel />
        <WinnerModal />
        {console.log(this.state.set)}
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
