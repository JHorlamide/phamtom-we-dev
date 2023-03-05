import * as TYPES from '../../types';

const initialState = {
  subscription: {}
};

interface Payload {
  type: string;
  data: any;
}

const paymentReducer = (state = initialState, action: Payload) => {
  // setAdmin's personal data
  switch (action.type) {
    case TYPES.SET_SUBSCRIPTION:
      return {
        ...state,
        subscription: action.data
      };

    default:
      return state;
  }
};

export default paymentReducer;
