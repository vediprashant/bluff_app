import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, ReactTestUtils } from "react-dom/test-utils";
import GamePage from "../GamePage";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "../../reducers/rootReducer";
import connectToGame from "../../actionCreators/connectToGame";
import thunk from "redux-thunk";

let container = null;
let store = createStore(reducer, applyMiddleware(thunk));
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

const fakeGame = {
  gameState: {
    game: {
      id: 1,
      winner_name: null,
      started: false,
      decks: 1,
      winner: null,
      owner: 1,
    },
    game_players: [
      {
        player_id: 2,
        disconnected: true,
        user: {
          id: 2,
          name: "prashant",
          email: "pc@jtg.com",
        },
        card_count: 26,
      },
    ],
    self: {
      player_id: 1,
      disconnected: false,
      cards: "",
      user: {
        id: 1,
        name: "vidit",
        email: "vd@jtg.com",
      },
    },
    game_table: {
      currentSet: null,
      card_count: 0,
      current_player_id: null,
      last_player_id: null,
      last_card_count: 0,
    },
  },
};

it("render start game button if game is not started and user is owner", () => {
  store.getState().game = fakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage connectToGame={connectToGame} />
      </Provider>,
      container
    );
  });
  const startGameButton = container.querySelectorAll("button");
  expect(startGameButton.length).toEqual(1);
  expect(startGameButton[0].textContent).toContain("Start Game");
});

it("render waiting for game to start if game is not started and user is not the owner", () => {
  const modifiedFakeGame = {
    ...fakeGame,
    gameState: {
      ...fakeGame.gameState,
      self: {
        ...fakeGame.gameState.self,
        user: {
          ...fakeGame.gameState.self.user,
          id: 2,
        },
      },
    },
  };
  store.getState().game = modifiedFakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>,
      container
    );
  });
  const startGameButton = container.querySelectorAll("button");
  expect(startGameButton.length).toEqual(1);
  expect(startGameButton[0].textContent).toContain(
    "Please wait for the owner to start the game"
  );
});

it("render Pass button if game is started and its your turn", () => {
  const modifiedFakeGame = {
    ...fakeGame,
    gameState: {
      ...fakeGame.gameState,
      game: {
        ...fakeGame.gameState.game,
        started: true,
      },
      game_table: {
        ...fakeGame.gameState.game_table,
        current_player_id: 1,
      },
    },
  };
  store.getState().game = modifiedFakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>,
      container
    );
  });
  expect(container.textContent).toContain("Pass");
});

it("render Play button if game is started and its your turn", () => {
  const modifiedFakeGame = {
    ...fakeGame,
    gameState: {
      ...fakeGame.gameState,
      game: {
        ...fakeGame.gameState.game,
        started: true,
      },
      game_table: {
        ...fakeGame.gameState.game_table,
        current_player_id: 1,
      },
    },
  };
  store.getState().game = modifiedFakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>,
      container
    );
  });
  expect(container.textContent).toContain("Play");
});
it("render Show button if game is started and its your turn and you are not last user and cards on table is not null", () => {
  const modifiedFakeGame = {
    ...fakeGame,
    gameState: {
      ...fakeGame.gameState,
      game: {
        ...fakeGame.gameState.game,
        started: true,
      },
      game_table: {
        ...fakeGame.gameState.game_table,
        current_player_id: 1,
        last_player_id: 2,
        card_count: 3,
      },
    },
  };
  store.getState().game = modifiedFakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>,
      container
    );
  });
  expect(container.textContent).toContain("Show");
});
it("Do not render show button if you are last user", () => {
  const modifiedFakeGame = {
    ...fakeGame,
    gameState: {
      ...fakeGame.gameState,
      game: {
        ...fakeGame.gameState.game,
        started: true,
      },
      game_table: {
        ...fakeGame.gameState.game_table,
        current_player_id: 1,
        last_player_id: 1,
        card_count: 3,
      },
    },
  };
  store.getState().game = modifiedFakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>,
      container
    );
  });
  expect(container.textContent).not.toContain("Show");
});
it("Do not render show button if no cards on table", () => {
  const modifiedFakeGame = {
    ...fakeGame,
    gameState: {
      ...fakeGame.gameState,
      game: {
        ...fakeGame.gameState.game,
        started: true,
      },
      game_table: {
        ...fakeGame.gameState.game_table,
        current_player_id: 1,
        last_player_id: 2,
        card_count: 0,
      },
    },
  };
  store.getState().game = modifiedFakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>,
      container
    );
  });
  expect(container.textContent).not.toContain("Show");
});
it("render select set if its your turn and cards on table are 0 ", () => {
  const modifiedFakeGame = {
    ...fakeGame,
    gameState: {
      ...fakeGame.gameState,
      game: {
        ...fakeGame.gameState.game,
        started: true,
      },
      game_table: {
        ...fakeGame.gameState.game_table,
        current_player_id: 1,
        last_player_id: 2,
        card_count: 0,
      },
    },
  };
  store.getState().game = modifiedFakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>,
      container
    );
  });
  const selectSet = container.getElementsByClassName("selectSet");
  expect(selectSet.length).toEqual(1);
});

it("Do not render select set if its not your turn", () => {
  const modifiedFakeGame = {
    ...fakeGame,
    gameState: {
      ...fakeGame.gameState,
      game: {
        ...fakeGame.gameState.game,
        started: true,
      },
      game_table: {
        ...fakeGame.gameState.game_table,
        current_player_id: 2,
        last_player_id: 2,
        card_count: 0,
      },
    },
  };
  store.getState().game = modifiedFakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>,
      container
    );
  });
  const selectSet = container.getElementsByClassName("selectSet");
  expect(selectSet.length).toEqual(0);
});

it("Do not render select set if its your turn but cards on table are not 0", () => {
  const modifiedFakeGame = {
    ...fakeGame,
    gameState: {
      ...fakeGame.gameState,
      game: {
        ...fakeGame.gameState.game,
        started: true,
      },
      game_table: {
        ...fakeGame.gameState.game_table,
        current_player_id: 1,
        last_player_id: 2,
        card_count: 3,
      },
    },
  };
  store.getState().game = modifiedFakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>,
      container
    );
  });
  const selectSet = container.getElementsByClassName("selectSet");
  expect(selectSet.length).toEqual(0);
});

it("Load timer if its your turn", () => {
  const modifiedFakeGame = {
    ...fakeGame,
    gameState: {
      ...fakeGame.gameState,
      game: {
        ...fakeGame.gameState.game,
        started: true,
      },
      game_table: {
        ...fakeGame.gameState.game_table,
        current_player_id: 1,
      },
    },
  };
  store.getState().game = modifiedFakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>,
      container
    );
  });
  const selectSet = container.getElementsByClassName("timer");
  expect(selectSet.length).toEqual(1);
});

it("Do not Load timer if its not your turn", () => {
  const modifiedFakeGame = {
    ...fakeGame,
    gameState: {
      ...fakeGame.gameState,
      game: {
        ...fakeGame.gameState.game,
        started: true,
      },
      game_table: {
        ...fakeGame.gameState.game_table,
        current_player_id: 2,
      },
    },
  };
  store.getState().game = modifiedFakeGame;
  act(() => {
    render(
      <Provider store={store}>
        <GamePage />
      </Provider>,
      container
    );
  });
  const selectSet = container.getElementsByClassName("timer");
  expect(selectSet.length).toEqual(0);
});
