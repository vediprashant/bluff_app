import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import createUserReducer from "./createUserReducer";
import game from "./gameScreenReducer";
import inviteUser from "./inviteReducer";
import createGameReducer from "./createGameReducer";
import viewGamesReducer from "./viewGamesReducer";
import updateSelectedCards from "./updateSelectedCards";

const gameReducer = combineReducers({
  activeGame: game,
  inviteToGame: inviteUser,
  createGame: createGameReducer,
  viewGames: viewGamesReducer,
});

const userReducer = combineReducers({
  login: loginReducer,
  signUp: createUserReducer,
});

export default combineReducers({
  user: userReducer,
  game: gameReducer,
});

/*
user: {
  login: {
    loggedIn: false,
    isLoading: false,
    isError: false,
    errorMessage: "",
  }
  signUp: {
    response: {
      errorField: ""
      message: "",
    },
    loading: "",
  }
}
game: {
  activeGame: {
    connectionState: false,
    socket: null,
    gameState: {
      selectedCards: []
      game: {},
      game_players: [],
      self: {
        selectedCards: []
      },
      game_table: {}
  },
  createGame: {
    gameError: false,
    gameMessage: "",
    gameId: null,
    createGameLoading: false,
  }
  inviteToGame: {
    inviteMessage: "",
    invitedPlayers: [],
  }
  viewGames: {
    isGamesLoading: false,
    games: [],
    gameMessage: null,
  }
}
*/
