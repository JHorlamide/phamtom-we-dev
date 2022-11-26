import * as TYPES from '../../types';

const initialState = {
  patients: [],
  selectedPatient: {},
  patientMedicalHistory: [],
  soap: [],
  labTests: []
};

interface Payload {
  type: string;
  data: any;
}

const patientsReducer = (state = initialState, action: Payload) => {
  // get all patients data
  switch (action.type) {
    case TYPES.SET_PATIENTS:
      return {
        ...state,
        patients: action.data
      };

    // get single patient data
    case TYPES.SET_SELECTED_PATIENT:
      return {
        ...state,
        selectedPatient: action.data
      };

    // get single patient medical history
    case TYPES.SET_PATIENT_MEDICAL_HISTORY:
      return {
        ...state,
        patientMedicalHistory: action.data
      };

    // get patient soap
    case TYPES.SET_PATIENT_SOAP:
      return {
        ...state,
        soap: action.data
      };

    // get patient soap
    case TYPES.SET_PATIENT_LAB_TEST:
      return {
        ...state,
        labTests: action.data
      };

    default:
      return state;
  }
};

export default patientsReducer;
