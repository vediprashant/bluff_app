import actions from "../../actions";
import handleTokens from "../../Utils/handleTokens";
import logoutService from "../../services/logoutService";

function setLogout() {
  return { type: actions.LOGGED_OUT };
}

export default function logoutUser(cookies, history) {
  return async (dispatch) => {
    let response = await logoutService(cookies);
    if (response.success) {
      handleTokens.removeToken(cookies, "token");
      dispatch(setLogout());
    }
  };
}
