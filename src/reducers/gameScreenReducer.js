import actions from '../actions'

const initialState = {
    isConnected: false,
    socket: null,
    gameState: {
        game_players: []
    }
}
export default function game(state = initialState, action) {
    switch (action.type) {
        case actions.GAME_CONNECTED:
            return {
                ...state,
                isConnected: action.payload.isConnected
            }
        case actions.GAME_SOCKET_CREATE:
            return {
                ...state,
                socket: action.payload.socket
            }
        case actions.GAME_UPDATE_STATE:
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    ...action.payload.newData
                }
            }
        default:
            return state
    }
}