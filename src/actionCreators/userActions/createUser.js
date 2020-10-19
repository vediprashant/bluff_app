import createUserService from "../../services/createUser";
import actions from "../../actions";

function setResponse(response) {
  return {
    type: actions.CU_SET_RESPONSE,
    payload: { response: response },
  };
}

function setLoading() {
  return {
    type: actions.CU_LOADING,
    payload: { isLoading: true },
  };
}

function unsetLoading() {
  return {
    type: actions.CU_LOADING,
    payload: { isLoading: false },
  };
}

export default function createUser(name, email, password, confirmPassword) {
  return async (dispatch) => {
    dispatch(setLoading());
    let res = await createUserService(name, email, password, confirmPassword);
    if (res.response) dispatch(setResponse(res.response));
    dispatch(unsetLoading());
  };
}
