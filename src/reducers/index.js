import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import createUserReducer from "./createUserReducer";
import game from "./gameScreenReducer";
import inviteUser from "./inviteReducer";
import createGameReducer from "./createGameReducer";
import viewGamesReducer from "./viewGamesReducer";

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
