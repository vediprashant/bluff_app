import actions from "../actions";

const initialState = {
  isConnected: false,
  socket: null,
  gameState: {
    game: {},
    game_players: [],
    self: {},
    game_table: {}
  },
};
export default function game(state = initialState, action) {
  switch (action.type) {
    case actions.GAME_CONNECTED:
      return {
        ...state,
        isConnected: action.payload.isConnected,
      };
    case actions.GAME_SOCKET_CREATE:
      return {
        ...state,
        socket: action.payload.socket,
      };
    case actions.GAME_UPDATE_STATE:
      return {
        ...state,
        gameState: {
          ...state.gameState,
          ...action.payload.newData,
          self: {
            ...state.gameState.self,
            ...action.payload.newData.self
          }
        },
      };
    default:
      return state;
  }
}
