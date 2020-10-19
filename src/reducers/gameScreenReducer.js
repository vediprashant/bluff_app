import actions from "../actions";

const initialState = {
  connectionState: WebSocket.CLOSE,
  gameState: {
    selectedCards: [],
    game_players: [],
  },
};

export default function game(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_SELECTED_CARDS:
      return {
        ...state,
        gameState: {
          ...state.gameState,
          selectedCards: action.payload,
        },
      };
    case actions.GAME_CONNECTED:
      return {
        ...state,
        connectionState: action.payload,
      };
    case actions.GAME_UPDATE_STATE:
      return {
        ...state,
        gameState: {
          ...state.gameState,
          ...action.payload.newData,
        },
      };
    default:
      return state;
  }
}
