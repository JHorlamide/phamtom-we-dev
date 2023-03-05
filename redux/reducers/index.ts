import { combineReducers } from 'redux';
import exampleReducer from './_exampleReducer';
import adminReducer from './adminReducer';
import patientsReducer from './patientsReducer';
import staffReducer from './staffReducer';
import pharmacyReducer from './pharmacyReducer';
import paymentReducer from './paymentReducer';

const rootReducer = combineReducers({
  // Add reducers here
  adminReducer,
  exampleReducer,
  patientsReducer,
  staffReducer,
  pharmacyReducer,
  paymentReducer
});

export default rootReducer;
