import actions from "actions";

const initalstate = {
  response: {
    message: "",
  },
  loading: "",
};

export default function createUserReducer(state = initalstate, action) {
  switch (action.type) {
    case actions.CU_LOADING:
      return { ...state, loading: action.payload.isLoading };

    case actions.CU_SET_RESPONSE:
      return { ...state, response: action.payload.response };

    default:
      return state;
  }
}
