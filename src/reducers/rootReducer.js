import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import createUserReducer from './createUserReducer'
import game from './gameScreenReducer'
import inviteUser from './inviteReducer'

export default combineReducers({
    login: loginReducer,
    createUser: createUserReducer,
    game: game,
    inviteMessage: inviteUser,
})