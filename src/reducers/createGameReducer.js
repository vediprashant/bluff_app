import actions from "../actions";

const initialState = {
  gameError: false,
  gameMessage: "",
  gameId: null,
  createGameLoading: false,
};

function createGameReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GAME_CREATION_ERROR_SET:
      return {
        ...state,
        gameError: true,
      };
    case actions.GAME_CREATION_ERROR_UNSET:
      return {
        ...state,
        gameError: false,
      };
    case actions.GAME_CREATION_MESSAGE:
      return {
        ...state,
        gameMessage: action.payload.message,
      };
    case actions.SET_GAME_ID:
      return {
        ...state,
        gameId: action.payload.gameId,
      };
    case actions.CREATE_GAME_LOADING:
      return {
        ...state,
        createGameLoading: !state.createGameLoading,
      };
    default:
      return state;
  }
}
export default createGameReducer;
