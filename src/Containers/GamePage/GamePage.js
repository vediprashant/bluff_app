import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import {
  connectToGame,
  disconnectFromGame,
  sendToGame,
} from "actionCreators/gameActions";
import SelectSet from "Components/SelectSet";
import Button from "Components/Button";
import PlayerCards from "Components/PlayerCards";
import TableCards from "Components/TableCards";
import Players from "Components/Players";
import cardsMapperToString from "Utils/cardsMapperToString";
import PlayedCardsModal from "Components/PlayedCardsModal";
import WinnerModal from "../WinnerModal";
import Timer from "Components/Timer";
import SinglePlayerModal from "../SinglePlayerModal";
import ErrorModal from "../ErrorModal";
import { updateSelectedCards } from "actionCreators/gameActions";
import actions from "actions";
import "./GamePage.css";

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
    this.props.disconnectFromGame();
  }

  componentDidMount() {
    let gameId = this.props.match.params.id;
    this.props.connectToGame(gameId);
  }

  /**
   * It sets the current rank of cards when updated gameData comes
   */
  componentDidUpdate() {
    if (
      this.props.activeGame.gameState.game_table !== undefined &&
      this.state.set != this.props.activeGame.gameState?.game_table?.currentSet
    ) {
      this.setState({
        set: this.props.activeGame.gameState.game_table.currentSet,
      });
    }
    this.resetPlayer = {
      game_table: {
        ...this.props.activeGame.gameState.game_table,
        current_player_id: null,
      },
    };
  }

  /**
   * It plays the current selected cards of user when he play his turn
   */

  playCards = () => {
    const selectedCards = this.props.selectedCards;
    const cardsSelected = [...selectedCards];
    if (
      this.state.set === null &&
      this.props.activeGame.gameState.game_table.currentSet === null
    ) {
      this.setState({ error: "Please select the set" });
      return;
    }
    if (cardsSelected.length === 0) {
      this.setState({ error: "Please select the cards" });
      return;
    }
    this.setState({ error: null });
    let stringCards = cardsMapperToString(cardsSelected);
    const data = {
      action: "play",
      cardsPlayed: stringCards,
      set: this.state.set,
      current_user: 1,
    };
    this.props.resetPlayer(this.resetPlayer);
    const jsonData = JSON.stringify(data);
    this.props.sendToGame(jsonData);
    this.setState({ showVisible: true });
    this.props.updateSelectedCards([]);
  };

  /**
   * It skips the turn of user when user skips or timer runs out
   */
  skip = () => {
    const data = {
      action: "skip",
    };
    this.props.resetPlayer(this.resetPlayer);
    const jsonData = JSON.stringify(data);
    this.props.sendToGame(jsonData);
    this.setState({ error: null, showVisible: true });
  };

  /**
   * start the game only done by owner
   */
  startGame = () => {
    const data = {
      action: "start",
    };
    const jsonData = JSON.stringify(data);
    this.props.sendToGame(jsonData);
  };

  /**
   * It displays the last played cards when user calls show
   */
  show = () => {
    const data = {
      action: "callBluff",
    };
    this.props.resetPlayer(this.resetPlayer);
    const jsonData = JSON.stringify(data);
    this.props.sendToGame(jsonData);

    this.setState({ error: null, showVisible: true });
  };

  /**
   * It disabled the show button after it is called
   */
  disableShow = () => {
    this.setState({ showVisible: false });
  };

  /**
   * Sets the current rank of cards
   */
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
    this.props.activeGame.gameState.game_table.currentSet = updatedSet;
    this.setState({ set: updatedSet });
  };

  /**
   * It displays the current rank of cards that is being played
   */
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
  /**
   * Go Back to the previous Page
   */
  backHandler = () => {
    this.props.history.goBack();
  };

  render() {
    const gameState = this.props.activeGame.gameState;
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
          game_players={this.props.activeGame?.gameState?.game_players}
          self={this.props.activeGame?.gameState?.self}
          last_player_turn={this.props.activeGame?.gameState?.last_player_turn}
          action={this.props.activeGame?.gameState?.action}
          current_player_id={
            this.props.activeGame?.gameState?.game_table?.current_player_id
          }
        />
        <div className="tableCards">
          <TableCards
            card_count={
              this.props.activeGame?.gameState?.game_table?.card_count
            }
          />
        </div>
        {/* Render action Buttons when its users turn and game is started */}
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
        {gameState?.game?.started &&
        gameState?.game_table?.current_player_id !==
          gameState?.self?.player_id &&
        !gameState?.game?.winner ? (
          <div className="otherTimer">
            <Timer
              startTime={60}
              text={`Time Left For Player to play his turn`}
              progress={true}
            />
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
            <PlayerCards game={this.props.activeGame} />
          </div>
        ) : null}

        {gameState?.game_table?.current_player_id ===
          gameState?.self?.player_id &&
        gameState?.game_table?.card_count === 0 ? (
          <div className="selectSet">
            <SelectSet selectSet={this.selectSet} />
          </div>
        ) : null}
        <PlayedCardsModal game={this.props.activeGame} />
        <WinnerModal
          game={this.props.activeGame}
          history={this.props.history}
        />
        <SinglePlayerModal history={this.props.history} />
        {gameState.init_success === false &&
          (() => {
            let message = gameState.message;
            message = message.split("string=")[1].split("'")[1];
            return (
              <ErrorModal
                title="Unable to join game"
                message={message}
                history={this.props.history}
              />
            );
          })()}
        {this.props.activeGame.connectionState === WebSocket.CONNECTING && (
          <ErrorModal
            title="Connecting"
            message="Establishing contact with server, Please wait.."
            history={this.props.history}
          />
        )}
        {this.props.activeGame.connectionState === WebSocket.CLOSED &&
          (gameState.init_success === true ||
            gameState.init_success === undefined) && (
            <ErrorModal
              title="Connection Lost"
              message="Unable to connect to server, try joining again"
              history={this.props.history}
            />
          )}
      </div>
    );
  }
}
/**
 * Maps state from store to the props
 */
const mapStatetoProps = (state) => {
  return {
    activeGame: state.game.activeGame,
    selectedCards: state.game.activeGame.gameState.selectedCards,
  };
};
/**
 * Maps dispatch action of store to the props
 */

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      connectToGame: (url) => connectToGame(url),
      resetPlayer: (newData) => ({
        type: actions.GAME_UPDATE_STATE,
        payload: { newData },
      }),
      updateSelectedCards: (cards) => updateSelectedCards(cards),
      sendToGame: (jsonData) => sendToGame(jsonData),
      disconnectFromGame: () => disconnectFromGame(),
    },
    dispatch
  );
};

/**
 * Verifies the type of the props provided
 */
GamePage.propTypes = {
  activeGame: PropTypes.object.isRequired,
  selectedCard: PropTypes.array,
};

export default connect(mapStatetoProps, mapDispatchToProps)(GamePage);
