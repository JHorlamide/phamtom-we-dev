import * as TYPES from '../types';

const initialState = {
  items: [],
  item: {},
  loading: false,
  error: null
};

interface ExampleReducerInterface {
  type: string;
  payload?: Array<string>;
  item?: object;
  loading?: boolean;
  error?: string;
}

const exampleReducer = (
  state = initialState,
  action: ExampleReducerInterface
) => {
  switch (action.type) {
    case TYPES.TEST:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: null
      };

    default:
      return state;
  }
};

export default exampleReducer;
