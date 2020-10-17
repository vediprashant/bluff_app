import actions from "../actions";

function setSocket(socketObject) {
  return {
    type: actions.GAME_SOCKET_CREATE,
    payload: { socket: socketObject },
  };
}

function setConnectionState(value) {
  return {
    type: actions.GAME_CONNECTED,
    payload: value,
  };
}

function updateGameState(newData) {
  return {
    type: actions.GAME_UPDATE_STATE,
    payload: { newData },
  };
}

export default function connectToGame(url) {
  return async (dispatch) => {
    //create websocket here
    //onrecieve dispatches actions
    
    let socket = new WebSocket(url);
    dispatch(setConnectionState(socket.readyState))
    socket.onopen = () => dispatch(setConnectionState(socket.readyState));
    socket.onclose = () => dispatch(setConnectionState(socket.readyState));
    socket.onmessage = (event) =>
      dispatch(updateGameState(JSON.parse(event.data)));
    dispatch(setSocket(socket));
  };
}
