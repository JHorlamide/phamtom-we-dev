import { combineReducers } from 'redux';
import exampleReducer from './_exampleReducer';
import adminReducer from './adminReducer';
import patientsReducer from './patientsReducer';

const rootReducer = combineReducers({
  // Add reducers here
  adminReducer,
  exampleReducer,
  patientsReducer
});

export default rootReducer;
