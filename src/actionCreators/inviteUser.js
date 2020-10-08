import React from 'react'
import inviteUserService from '../services/inviteUser'
import actions from '../actions'

function setMessage(message) {
    return {
        type: actions.INVITE_MESSAGE,
        payload: {
            message: message
        }
    }
}

export default function inviteUser(cookies, email, game) {
    return async (dispatch) => {
        dispatch(setMessage('Inviting'))
        let message = await inviteUserService(cookies, email, game)
        dispatch(setMessage(message))
    }
}   