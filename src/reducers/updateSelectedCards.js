import actions from "../actions"

function updateSelectedCards(state=[], action) {
    if (action.type === actions.UPDATE_SELECTED_CARDS)
        return action.payload
    else return state
}

export default updateSelectedCards