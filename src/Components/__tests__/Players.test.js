import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Players from "../Players";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Should render desired number of players", () => {
  const fakePlayer = {
    player_id: 1,
    user: {
      name: "testPlayer",
    },
  };
  const game_players = [
    {
      ...fakePlayer,
      player_id: 2,
    },
    {
      ...fakePlayer,
      player_id: 3,
    },
  ];
  const self = {
    ...fakePlayer,
  };
  act(() => {
    render(
      <Players
        game_players={game_players}
        self={self}
        last_player_turn={1}
        action={"Show"}
      />,
      container
    );
  });
  const players = container.getElementsByClassName("player");
  expect(players.length).toEqual(game_players.length + 1);
});

it("Should render disconnected players having disconnected class", () => {
  const fakePlayer = {
    player_id: 1,
    disconnected: false,
    user: {
      name: "testPlayer",
    },
  };
  const game_players = [
    {
      ...fakePlayer,
      player_id: 2,
      disconnected: true,
    },
    {
      ...fakePlayer,
      player_id: 3,
      disconnected: true,
    },
  ];
  const self = {
    ...fakePlayer,
  };
  act(() => {
    render(
      <Players
        game_players={game_players}
        self={self}
        last_player_turn={1}
        action={"Show"}
      />,
      container
    );
  });
  const players = container.getElementsByClassName("disconnected");
  expect(players.length).toEqual(game_players.length);
});

it("Should render action label on player having last turn", () => {
  const fakePlayer = {
    player_id: 1,
    disconnected: false,
    user: {
      name: "testPlayer",
    },
  };
  const game_players = [
    {
      ...fakePlayer,
      player_id: 2,
    },
    {
      ...fakePlayer,
      player_id: 3,
    },
  ];
  const self = {
    ...fakePlayer,
  };
  act(() => {
    render(
      <Players
        game_players={game_players}
        self={self}
        last_player_turn={3}
        action={"Show"}
      />,
      container
    );
  });
  const player = container.getElementsByClassName("label");
  expect(player.length).toEqual(1);
  expect(player[0].textContent).toEqual("Show");
});
