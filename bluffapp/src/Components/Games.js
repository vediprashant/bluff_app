import React from "react";

import "./games.css";

const Games = ({ games, loading }) => {
  if (loading) {
    return <h2>loading...</h2>;
  }
  return (
    <div class="gamesList">
      <div role="list" class="ui list">
        {games.map((game) => (
          <a role="listitem" class="item" href="#">
            {game.id}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Games;
