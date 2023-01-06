import * as TYPES from '../../types';

const initialState = {
  staffs: [],
  selectedStaff: {},
};

interface Payload {
  type: string;
  data: any;
}

const staffReducer = (state = initialState, action: Payload) => {
  // get all staff data
  switch (action.type) {
    case TYPES.SET_STAFFS:
      return {
        ...state,
        staffs: action.data
      };

    // get single staff data
    case TYPES.SET_SELECTED_STAFF:
      return {
        ...state,
        selectedStaff: action.data
      };

    default:
      return state;
  }
};

export default staffReducer;
