import actions from "../../actions";
import getGamesService from "../../services/getGamesService";

function loading() {
  return { type: actions.GAMES_LOADING };
}

function setGames(games) {
  return { type: actions.SET_GAMES, payload: { games } };
}

function setError(message) {
  return { type: actions.VIEW_GAMES_MESSAGE, payload: { message } };
}

export default function getGames(cookies, filters = "") {
  return async (dispatch) => {
    dispatch(loading());
    dispatch(setError(""));
    const games = await getGamesService(cookies, filters);
    if (games.results) {
      dispatch(loading());
      dispatch(setGames(games.results));
      if (games.results.length === 0) {
        dispatch(setError("No Games To Show"));
      }
    } else {
      dispatch(loading());
      dispatch(setError(games.message));
    }
  };
}
