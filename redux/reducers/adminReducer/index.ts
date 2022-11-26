import * as TYPES from "../../types";

const initialState = {
  admin: {}
};

interface Payload {
  type: string;
  data: any;
}

const adminReducer = (state = initialState, action: Payload) => {
  // setAdmin's personal data
  switch (action.type) {
    case TYPES.SET_ADMIN:
      return {
        ...state,
        admin: action.data
      };

    default:
      return state;
  }
};

export default adminReducer;
