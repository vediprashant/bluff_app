import React from "react";

import PropTypes from "prop-types";

import "./games.css";

const Games = ({ games }) => {
  return (
    <div class="gamesList">
      <div role="list" class="ui list">
        {games.map((game, index) => (
          <a
            key={index}
            role="listitem"
            class="item"
            href={`/stats/${game.id}`}
          >
            Game code: {game.id}
            <div>Created on {new Date(game.created_at).toLocaleString()}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

Games.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object),
};

export default Games;
