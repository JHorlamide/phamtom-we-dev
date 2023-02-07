import * as TYPES from '../../types';

const initialState = {
  pharmacy: {},
  pharmacyState: "",
  products: [],
  selectedProduct: {},
  orders: [],
  selectedOrder: {},
  logistics: [],
};

interface Payload {
  type: string;
  data: any;
}

const pharmacyReducer = (state = initialState, action: Payload) => {
  // get all pharmacy data
  switch (action.type) {
    case TYPES.SET_PHARMACY:
      return {
        ...state,
        pharmacy: action.data
      };

    case TYPES.SET_PHARMACY_STATE:
      return {
        ...state,
        pharmacyState: action.data
      };

    case TYPES.SET_PRODUCTS:
      return {
        ...state,
        products: action.data
      };

    case TYPES.SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.data
      };

    case TYPES.SET_ORDERS:
      return {
        ...state,
        orders: action.data
      };

    case TYPES.SET_SELECTED_ORDER:
      return {
        ...state,
        selectedOrder: action.data
      };

    case TYPES.SET_LOGISTICS:
      return {
        ...state,
        logistics: action.data
      };

    case TYPES.SET_SELECTED_LOGISTICS:
      return {
        ...state,
        selectedLogistics: action.data
      };

    default:
      return state;
  }
};

export default pharmacyReducer;
