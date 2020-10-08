import actions from '../actions'

export default function inviteUser(state='', action){
    switch(action.type){
        case actions.INVITE_MESSAGE:
            return action.payload.message
        default:
            return state
    }
}