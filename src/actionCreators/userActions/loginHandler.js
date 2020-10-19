import handleTokens from "../../Utils/handleTokens";
import validateUser from "../../services/authService";
import actions from "../../actions";

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

function validatingUser(cookies, email, password) {
  return async (dispatch) => {
    if (email === "" && password === "") {
      dispatch(setMessage("Please provide Input"));
      dispatch(setError());
      return;
    }
    if (email === "") {
      dispatch(setMessage("Email field can't be blank"));
      dispatch(setError());
      return;
    }
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = pattern.test(email);
    if (result === false) {
      dispatch(setMessage("Please provide valid Email"));
      dispatch(setError());
      return;
    }
    if (password === "") {
      dispatch(setMessage("Please provide Password"));
      dispatch(setError());
      return;
    }
    if (password.length < 8) {
      dispatch(setMessage("Please provide valid credentials"));
      dispatch(setError());
      return;
    }
    dispatch(loading());
    const jsonData = await validateUser(email, password);
    if (jsonData.message) {
      dispatch(loading());
      dispatch(setMessage(jsonData.message));
      dispatch(setError());
    } else {
      dispatch(loading());
      dispatch(unsetError());
      dispatch(setMessage(""));
      handleTokens.addToken(cookies, "token", jsonData.token);
      dispatch(login());
    }
  };
}
export default validatingUser;
