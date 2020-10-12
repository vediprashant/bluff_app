import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import createUserReducer from './createUserReducer'
import game from './gameScreenReducer'

export default combineReducers({
    login: loginReducer,
    createUser: createUserReducer,
    game: game,
})