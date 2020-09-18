import handleTokens from "../Utils/handleTokens";
import validateUser from "../Utils/validateUser";
import actions from "../actions";

function setError() {
  return { type: actions.SET_ERROR };
}
function unsetError() {
  return { type: actions.UNSET_ERROR };
}
function loading() {
  return { type: actions.LOADING };
}
function login() {
  return { type: actions.LOGGED_IN };
}
function setMessage(message) {
  return { type: actions.SET_MESSAGE, payload: { message } };
}

function validatingUser(email, password) {
  return async (dispatch) => {
    dispatch(loading());
    const jsonData = await validateUser(email, password);
    if (jsonData.message) {
      dispatch(loading());
      dispatch(setMessage(jsonData.message));
      dispatch(setError());
    } else {
      dispatch(loading());
      dispatch(unsetError());
      handleTokens.addToken("token", jsonData.token);
      dispatch(login());
    }
  };
}
export default validatingUser;
