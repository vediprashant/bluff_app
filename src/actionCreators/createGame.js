import actions from "../actions";
import createGameService from "../services/createGame";

function setError() {
  return { type: actions.GAME_CREATION_ERROR_SET };
}
function unsetError() {
  return { type: actions.GAME_CREATION_ERROR_UNSET };
}

function setMessage(message) {
  return { type: actions.GAME_CREATION_MESSAGE, payload: { message } };
}

function setGame(gameId) {
  return { type: actions.SET_GAME_ID, payload: { gameId } };
}

export default function createGame(cookies, decks) {
  return async (dispatch) => {
    dispatch(unsetError(false));
    if (decks === null) {
      dispatch(setError(true));
      dispatch(setMessage("Please select the decks"));
    } else {
      const game = await createGameService(cookies, decks);
      if (game.id) {
        dispatch(setGame(game.id));
      } else {
        dispatch(setError(true));
        dispatch(setMessage(game.message));
      }
    }
  };
}
