import actions from "actions";

const initialState = {
  loggedIn: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

function login(state = initialState, action) {
  switch (action.type) {
    case actions.LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
      };
    case actions.LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case actions.SET_ERROR:
      return {
        ...state,
        isError: true,
      };
    case actions.UNSET_ERROR:
      return {
        ...state,
        isError: false,
      };
    case actions.SET_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload.message,
      };
    case actions.LOGGED_OUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
}
export default login;
