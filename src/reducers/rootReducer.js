import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import createUserReducer from "./createUserReducer";
import game from "./gameScreenReducer";
import inviteUser from "./inviteReducer";
import createGameReducer from "./createGameReducer";
import viewGamesReducer from "./viewGamesReducer";
import updateSelectedCards from "./updateSelectedCards";

export default combineReducers({
  login: loginReducer,
  createUser: createUserReducer,
  game: game,
  invite: inviteUser,
  createGame: createGameReducer,
  viewGames: viewGamesReducer,
  selectedCards: updateSelectedCards,
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
selectedCards: updateSelectedCards,
*/