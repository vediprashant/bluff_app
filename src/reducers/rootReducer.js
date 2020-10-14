import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import createUserReducer from "./createUserReducer";
import game from "./gameScreenReducer";
import inviteUser from "./inviteReducer";
import createGameReducer from "./createGameReducer";

export default combineReducers({
  login: loginReducer,
  createUser: createUserReducer,
  game: game,
  invite: inviteUser,
  createGame: createGameReducer,
});
