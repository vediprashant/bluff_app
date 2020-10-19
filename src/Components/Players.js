import React from "react";

import { Label } from "semantic-ui-react";
import PropTypes from "prop-types";

/**
 * Takes list containing players, and an object containng self details
 * renders them in a circle
 * @param {*} props
 */
export default function Player(props) {
  const renderedPlayers = [];
  const totalPlayers = props.self ? props.game_players.length + 1 : 0;
  const width = 690;
  const height = 667;
  const radius = 300;
  let angle = 0;
  let step = (2 * Math.PI) / totalPlayers;
  if (props.self) {
    let x = Math.round(width / 2 + radius * Math.cos(angle) - 80 / 2);
    let y = Math.round(height / 2 + radius * Math.sin(angle) - 80 / 2);
    let currentPlayerClass = "";
    if (props.current_player_id === props.self.player_id) {
      currentPlayerClass = "userPic";
    }
    renderedPlayers.push(
      <div className={`player`} style={{ top: `${x}px`, right: `${y}px` }}>
        <img
          imgId={props.self.player_id}
          src="https://picsum.photos/200"
          class={`ui avatar tiny image ${currentPlayerClass}`}
          alt="avatar"
        />
        <span>{props.self.user.name}</span>
      </div>
    );
    angle += step;
  }

  //Fill in rest of the players
  props.game_players.forEach((player, index) => {
    let x = Math.round(width / 2 + radius * Math.cos(angle) - 80 / 2);
    let y = Math.round(height / 2 + radius * Math.sin(angle) - 80 / 2);
    let disconnectedClass = "";
    let currentPlayerClass = "";
    if (props.current_player_id === player.player_id) {
      currentPlayerClass = "userPic";
    }
    if (player.disconnected === true) {
      disconnectedClass = "disconnected";
    }
    renderedPlayers.push(
      <div
        class={`player ${disconnectedClass}`}
        style={{ top: `${x}px`, right: `${y}px` }}
      >
        <img
          imgId={player.player_id}
          src="https://picsum.photos/200"
          class={`ui avatar tiny image ${currentPlayerClass}`}
          alt="avatar"
        />
        {props.last_player_turn === player.player_id ? (
          <Label color="red" floating pointing="below">
            {props.action}
          </Label>
        ) : null}
        <span>{player.user.name}</span>
        <img
          className="cardCountImg ui tiny image"
          src="../PNG/blue_back.png"
          alt="cardsCount"
        />
        <span class="cardCountNum">{player.card_count}</span>
      </div>
    );
    angle += step;
  });
  return <div className="avatars">{renderedPlayers}</div>;
}

Player.propTypes = {
  self: PropTypes.object.isRequired,
  game_players: PropTypes.array.isRequired,
};
