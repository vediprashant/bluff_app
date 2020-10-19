import React, { useState, useEffect } from "react";
import { Select } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import actions from "../../actions";

import "./HomePage.css";
import { createGame } from "../../actionCreators/gameActions";

function HomePage(props) {
  const [totalDecks, setTotalDecks] = useState(null);

  const deckOptions = [
    { key: 1, value: 1, text: 1 },
    { key: 2, value: 2, text: 2 },
    { key: 3, value: 3, text: 3 },
  ];

  const deckHandler = (e) => {
    setTotalDecks(e.target.textContent);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    props.createGame(props.cookies, totalDecks, props.history);
  };

  return (
    <div className="container">
      <div className="logo">BLUFF</div>
      <div className="select">
        <Select
          id="deck"
          placeholder="Select number of decks"
          options={deckOptions}
          onChange={deckHandler}
        />
        <button
          className={
            props.isLoading
              ? "ui primary loading disabled button"
              : "ui primary button"
          }
          onClick={submitHandler}
        >
          Create a new game
        </button>
      </div>
      {props.isError ? <div className="error">{props.message}</div> : null}
    </div>
  );
}
const mapStateToProps = (state, ownProps) => ({
  cookies: ownProps.cookies,
  isError: state.game.createGame.gameError,
  message: state.game.createGame.gameMessage,
  gameId: state.game.createGame.gameId,
  isLoading: state.game.createGame.createGameLoading,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createGame: (cookies, decks, history) =>
        createGame(cookies, decks, history),
      resetId: () => ({ type: actions.SET_GAME_ID, payload: { gameId: null } }),
    },
    dispatch
  );
};

export default withCookies(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
