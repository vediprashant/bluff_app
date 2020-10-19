import actions from "../../actions";
import urls from "../../constants/urlConstants"

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

let socket = null;

export function sendToGame(data) {
  return async (dispatch) => {
    socket.send(data)
  }
}

export function disconnectFromGame() {
  return async (dispatch) => {
    socket.close()
  }
}

export default function connectToGame(gameId) {
  return async (dispatch) => {
    //create websocket here
    //onrecieve dispatches actions
    
    socket = new WebSocket(`${urls.WEB_SOCKET_URL}${gameId}/`);
    dispatch(setConnectionState(socket.readyState))
    socket.onopen = () => dispatch(setConnectionState(socket.readyState));
    socket.onclose = () => dispatch(setConnectionState(socket.readyState));
    socket.onmessage = (event) =>
      dispatch(updateGameState(JSON.parse(event.data)));
  };
}
