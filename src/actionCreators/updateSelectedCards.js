import React from 'react'
import actions from "../actions"

function updateSelectedCards(selectedCards) {
    return {
        type: actions.UPDATE_SELECTED_CARDS,
        payload: selectedCards
    }
}

export default updateSelectedCards