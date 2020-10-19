import React from "react";

import PropTypes from "prop-types";

import "./games.css";

const Games = ({ games }) => {
  return (
    <div className="gamesList">
      <div role="list" className="ui list">
        {games.map((game, index) => (
          <a
            key={index}
            role="listitem"
            className="item"
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
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Games;
