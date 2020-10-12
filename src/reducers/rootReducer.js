import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import createUserReducer from './createUserReducer'

export default combineReducers({
    login: loginReducer,
    createUser: createUserReducer,
})