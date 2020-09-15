import React, { useState, useEffect } from "react";
import { Select } from "semantic-ui-react";
import "./HomePage.css";
export default function HomePage(props) {
  const [totalDecks, setTotalDecks] = useState(null);
  const [isError, setError] = useState(false);
  const deckOptions = [
    { key: 1, value: 1, text: 1 },
    { key: 2, value: 2, text: 2 },
    { key: 3, value: 3, text: 3 },
  ];
  const deckHandler = (e) => {
    setTotalDecks(e.target.textContent);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setError(false);
    if (totalDecks === null) {
      setError(true);
    } else {
      console.log(totalDecks);
      //   Call Api Here
      props.history.push("/game");
    }
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
        <button className="ui primary button" onClick={submitHandler}>
          Create a new Game
        </button>
      </div>
      {isError ? <div className="error">Please Select the decks</div> : null}
    </div>
  );
}
