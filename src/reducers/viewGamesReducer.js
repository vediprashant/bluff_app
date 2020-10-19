import actions from "../actions";
import API_URL from "../constants/urlConstants";

const initialState = {
  isGamesLoading: false,
  games: [],
  gameMessage: null,
  nextCompletedGames: `${API_URL.LIST_GAMES}?filters=completed`,
  nextOngoingGames: API_URL.LIST_GAMES,
};

function viewGamesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_GAMES:
      return {
        ...state,
        games: [...state.games, ...action.payload.games],
      };
    case actions.GAMES_LOADING:
      return {
        ...state,
        isGamesLoading: !state.isGamesLoading,
      };
    case actions.VIEW_GAMES_MESSAGE:
      return {
        ...state,
        gameMessage: action.payload.message,
      };
    case actions.SET_NEXT_COMPLETED_GAMES:
      return {
        ...state,
        nextCompletedGames: action.payload.nextUrl,
      };
    case actions.SET_NEXT_ONGOING_GAMES:
      return {
        ...state,
        nextOngoingGames: action.payload.nextUrl,
      };
    case actions.RESET_GAMES:
      return {
        ...state,
        games: [],
      };
    default:
      return state;
  }
}
export default viewGamesReducer;
