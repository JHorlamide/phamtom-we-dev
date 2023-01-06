import * as TYPES from '../../types';

export const setPatients = (data: any) => ({
  type: TYPES.SET_PATIENTS,
  data
});

export const setSelectedPatient = (data: any) => ({
  type: TYPES.SET_SELECTED_PATIENT,
  data
});

export const setPatientMedicalHistory = (data: any) => ({
  type: TYPES.SET_PATIENT_MEDICAL_HISTORY,
  data
});

export const setPatientMedicationHistory = (data: any) => ({
  type: TYPES.SET_PATIENT_MEDICATION_HISTORY,
  data
});

export const setPatientSoap = (data: any) => ({
  type: TYPES.SET_PATIENT_SOAP,
  data
});

export const setPatientLabTests = (data: any) => ({
  type: TYPES.SET_PATIENT_LAB_TEST,
  data
});

export const setPatientVitalSigns = (data: any) => ({
  type: TYPES.SET_PATIENT_VITAL_SIGNS,
  data
});
