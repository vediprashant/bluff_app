import actions from "../actions";

const initialState = {
  inviteMessage: "",
  invitedPlayers: [],
};

export default function inviteUser(state = initialState, action) {
  switch (action.type) {
    case actions.INVITE_MESSAGE:
      return {
        ...state,
        inviteMessage: action.payload.message,
      };
    case actions.LIST_INVITED_PLAYERS:
      return {
        ...state,
        invitedPlayers: action.payload.invitedPlayers,
      };
    default:
      return state;
  }
}
