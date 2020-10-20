import actions from "../../actions";
import getGamesService from "../../services/getGamesService";
import API_URL from "../../constants/urlConstants";

function loading() {
  return { type: actions.GAMES_LOADING };
}

function setGames(games) {
  return { type: actions.SET_GAMES, payload: { games } };
}

function setError(message) {
  return { type: actions.VIEW_GAMES_MESSAGE, payload: { message } };
}

function setCompletedGames(nextUrl) {
  return { type: actions.SET_NEXT_COMPLETED_GAMES, payload: { nextUrl } };
}
function setOngoingGames(nextUrl) {
  return { type: actions.SET_NEXT_ONGOING_GAMES, payload: { nextUrl } };
}

function resetGames() {
  return { type: actions.RESET_GAMES };
}

export default function getGames(
  cookies,
  active,
  target,
  targetUrl,
  reset = false
) {
  return async (dispatch) => {
    dispatch(loading());
    dispatch(setError(""));
    if (active !== target || reset === true) {
      dispatch(resetGames());
      dispatch(
        setCompletedGames(`${API_URL.BASE_URL}${API_URL.LIST_COMPLETED_GAMES}`)
      );
      dispatch(
        setOngoingGames(`${API_URL.BASE_URL}${API_URL.LIST_ONGOING_GAMES}`)
      );
    }
    const games = await getGamesService(cookies, targetUrl);
    if (games.results) {
      dispatch(loading());
      dispatch(setGames(games.results));
      if (target === "completed") dispatch(setCompletedGames(games.next));
      if (target === "ongoing") dispatch(setOngoingGames(games.next));
      if (games.results.length === 0) {
        dispatch(setError("No Games To Show"));
      }
    } else {
      dispatch(loading());
      dispatch(setError(games.message));
    }
  };
}
