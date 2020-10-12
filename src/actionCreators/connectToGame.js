import actions from "../actions"

function setSocket(socketObject) {
    return {
        type: actions.GAME_SOCKET_CREATE,
        payload: { socket: socketObject }
    }
}

function connected() {
    return {
        type: actions.GAME_CONNECTED,
        payload: { isConnected: true }
    }
}

function disconnected() {
    return {
        type: actions.GAME_CONNECTED,
        payload: { isConnected: false }
    }
}

function updateGameState(newData) {
    return {
        type: actions.GAME_UPDATE_STATE,
        payload: { newData }
    }
}

export default function connectToGame(url) {
    return async (dispatch) => {
        //create websocket here
        //onrecieve dispatches actions
        let socket = new WebSocket(url)
        socket.onopen = () => dispatch(connected())
        socket.onclose = () => dispatch(disconnected())
        socket.onmessage = event => dispatch(updateGameState(JSON.parse(event.data)))
        dispatch(setSocket(socket))
    }
}