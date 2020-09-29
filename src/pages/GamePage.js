import React, { Component } from "react";
import "./GamePage.css";
import { connect } from "react-redux";
import SelectSet from "../Components/SelectSet";
import Button from "../Components/Button";
import PlayerCards from "../Components/PlayerCards";
import { Route } from "react-router-dom";
import connectToGame from "../actionCreators/connectToGame";
import TableCards from "../Components/TableCards";
import Players from "../Components/Players"

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    }; 
  }
  componentDidMount() {
    this.props.connectToGame('ws://localhost:8000/ws/chat/1/')
  }
  componentDidUpdate() {
    console.log(this.props.game)
  }

  render() {
    return (
      <div>
        <div className="gameScreen">
          <div className="timer"></div>
          <Players 
            game_players={this.props.game.gameState.game_players}
            self={this.props.game.gameState.self} 
          />
          <div className="tableCards">
            <TableCards card_count={5} />{/*GAME TABLE CARD COUNT GOES HERE */}
          </div>
        </div>
        <div className="actionButtons">
          <Button text={"Pass"} color={"purple"} />
          <Button text={"Play"} color={"purple"} />
          <Button text={"Show"} color={"purple"} />
        </div>
        <div className="playerCard">
          <h1 className="heading1">Select Cards</h1>
          <PlayerCards cards={[1,6,9,88]}/> {/*OWN CARDS HERE, MODIFY THE COMPONENT */}
        </div>
        <div className="selectSet">
          <SelectSet />
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    game: state.game
  };
};

export default connect(mapStatetoProps, {
  connectToGame: connectToGame
})(GamePage);

