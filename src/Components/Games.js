import React from "react";

import "./games.css";

const Games = ({ games, loading }) => {
  if (loading) {
    return <h2>loading...</h2>;
  }
  return (
    <div class="gamesList">
      <div role="list" class="ui list">
        {games.map((game, index) => (
          <a key={index} role="listitem" class="item" href={`/stats/${game.id}`}>
            Game code: {game.id}
            <div>
              {Date('2020-09-13T19:13:58.525486+05:30')}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Games;
