import React, { Component } from "react";
import { bindActionCreators } from "redux";
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
import WinnerModal from "../Components/WinnerModal";
import Timer from "../Components/Timer";
import SinglePlayerModal from "../Components/SinglePlayerModal";
import ErrorModal from "../Components/ErrorModal";
import urls from "../constants/urlConstants";
import updateSelectedCards from "../actionCreators/updateSelectedCards";
import actions from "../actions";

/**
 * The main game screen where game is played
 */
class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      set: null,
      error: null,
      showVisible: true,
    };
  }

  componentWillUnmount() {
    this.props.game.socket.close();
  }

  componentDidMount() {
    let gameId = this.props.match.params.id;
    this.props.connectToGame(`${urls.WEB_SOCKET_URL}${gameId}/`);
  }

  componentDidUpdate() {
    if (
      this.props.game.gameState !== undefined &&
      this.state.set != this.props.game.gameState?.game_table?.currentSet
    ) {
      this.setState({ set: this.props.game.gameState.game_table.currentSet });
    }
    this.resetPlayer = {
      game_table: {
        ...this.props.game.gameState.game_table,
        current_player_id: null,
      },
    };
  }

  playCards = () => {
    //get selected cards from store
    //when api responds, these cards will be removed automatically from page
    const cardsSelected = [...this.props.selectedCards];
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
    // for (let card = 0; card < cardsSelected.length; card++) {
    //   mappedCards.push(cardsSelected[card].id);

    //   cardsSelected[card].classList.remove("selectedCards");
    // }
    let stringCards = cardsMapperToString(cardsSelected);
    const data = {
      action: "play",
      cardsPlayed: stringCards,
      set: this.state.set,
      current_user: 1,
    };
    this.props.resetPlayer(this.resetPlayer);
    const jsonData = JSON.stringify(data);
    this.props.game.socket.send(jsonData);
    this.setState({ showVisible: true });
    this.props.updateSelectedCards([]);
  };

  skip = () => {
    const data = {
      action: "skip",
    };
    this.props.resetPlayer(this.resetPlayer);
    const jsonData = JSON.stringify(data);
    this.props.game.socket.send(jsonData);
    this.setState({ error: null, showVisible: true });
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
    this.props.resetPlayer(this.resetPlayer);
    const jsonData = JSON.stringify(data);
    this.props.game.socket.send(jsonData);

    this.setState({ error: null, showVisible: true });
  };

  disableShow = () => {
    this.setState({ showVisible: false });
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
    this.props.game.gameState.game_table.currentSet = updatedSet;
    this.setState({ set: updatedSet });
  };
  displaySet = (currentSet) => {
    let updatedSet = currentSet;
    switch (currentSet) {
      case 11:
        updatedSet = "J";
        break;
      case 12:
        updatedSet = "Q";
        break;
      case 13:
        updatedSet = "K";
        break;
      case 1:
        updatedSet = "A";
        break;
      default:
        updatedSet = currentSet;
        break;
    }
    return updatedSet;
  };

  backHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const gameState = this.props.game.gameState;
    return (
      <div className="gameScreen">
        <Button
          text={"Go Back"}
          color={"black"}
          onClick={this.backHandler}
          className={"goBack"}
        />
        {gameState?.game?.started &&
        gameState?.game_table?.current_player_id ===
          gameState?.self?.player_id ? (
          <div className="timer">
            <Timer disableShow={this.skip} startTime={60} />
          </div>
        ) : null}
        <Players
          game_players={this.props.game?.gameState?.game_players}
          self={this.props.game?.gameState?.self}
          last_player_turn={this.props.game?.gameState?.last_player_turn}
          action={this.props.game?.gameState?.action}
          current_player_id={
            this.props.game?.gameState?.game_table?.current_player_id
          }
        />
        <div className="tableCards">
          <TableCards
            card_count={this.props.game?.gameState?.game_table?.card_count}
          />
        </div>
        {gameState?.game?.started &&
        gameState?.game_table?.current_player_id ===
          gameState?.self?.player_id ? (
          <div className="actionButtons">
            <Button text={"Pass"} color={"purple"} onClick={this.skip} />
            <Button text={"Play"} color={"purple"} onClick={this.playCards} />
            {gameState?.game_table?.last_player_id !==
              gameState?.self?.player_id &&
            gameState?.game_table?.card_count !== 0 &&
            this.state.showVisible ? (
              <span>
                <Button text={"Show "} color={"purple"} onClick={this.show} />
                <Timer
                  disableShow={this.disableShow}
                  startTime={30}
                  text={"Time left to call bluff"}
                />
              </span>
            ) : null}
            {this.state.error ? (
              <div className="playError">{this.state.error}</div>
            ) : null}
            {gameState?.game_table?.currentSet ? (
              <div className="bluffTimer">
                Current Set:
                {this.displaySet(gameState.game_table.currentSet)}
              </div>
            ) : null}
          </div>
        ) : null}

        {gameState?.game?.started === false ? (
          gameState?.game?.owner === gameState?.self?.user?.id ? (
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
        {gameState?.game?.started ? (
          <div className="playerCard">
            <h1 className="heading1">Select Cards</h1>
            <PlayerCards game={this.props.game} />
          </div>
        ) : null}

        {gameState?.game_table?.current_player_id ===
          gameState?.self?.player_id &&
        gameState?.game_table?.card_count === 0 ? (
          <div className="selectSet">
            <SelectSet selectSet={this.selectSet} />
          </div>
        ) : null}
        <PlayedCardsModel game={this.props.game} />
        <WinnerModal game={this.props.game} />
        <SinglePlayerModal />
        {gameState.init_success === false &&
          (() => {
            let message = gameState.message;
            message = message.split("string=")[1].split("'")[1];
            return <ErrorModal title="Unable to join game" message={message} />;
          })()}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    game: state.game,
    selectedCards: state.game.gameState.selectedCards,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      connectToGame: (url) => connectToGame(url),
      resetPlayer: (newData) => ({
        type: actions.GAME_UPDATE_STATE,
        payload: { newData },
      }),
      updateSelectedCards: (cards) => updateSelectedCards(cards),
    },
    dispatch
  );
};

export default connect(mapStatetoProps, mapDispatchToProps)(GamePage);
