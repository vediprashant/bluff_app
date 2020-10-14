import inviteUserService from "../services/inviteUser";
import actions from "../actions";
import showInvitedUsers from "../actionCreators/showInvitedUsers";

function setMessage(message) {
  return {
    type: actions.INVITE_MESSAGE,
    payload: {
      message: message,
    },
  };
}

export default function inviteUser(cookies, email, game) {
  return async (dispatch) => {
    dispatch(setMessage("Inviting"));
    let message = await inviteUserService(cookies, email, game);
    dispatch(setMessage(message));
    dispatch(showInvitedUsers(cookies, game)); //Can call this only after above action is done
  };
}
