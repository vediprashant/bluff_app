import listInvitedUsers from "../../services/listInvitedUsers";
import actions from "../../actions";

function setMessage(message) {
  return {
    type: actions.INVITE_MESSAGE,
    payload: {
      message: message,
    },
  };
}

function listInvitedPlayers(list) {
  return {
    type: actions.LIST_INVITED_PLAYERS,
    payload: {
      invitedPlayers: list,
    },
  };
}

export default function inviteUser(cookies, game) {
  return async (dispatch) => {
    let response = await listInvitedUsers(cookies, game);
    dispatch(listInvitedPlayers(response.list));
    if (response.message !== "") dispatch(setMessage(response.message));
  };
}
