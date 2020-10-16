import actions from "../actions";

const initialState = {
  isGamesLoading: false,
  games: [],
  gameMessage: null,
};

function viewGamesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_GAMES:
      return {
        ...state,
        games: action.payload.games,
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
    default:
      return state;
  }
}
export default viewGamesReducer;
