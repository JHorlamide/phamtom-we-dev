import axios from "axios";
import Router from "next/router";

const API_ENDPOINT = process.env.NEXT_PUBLIC_SERVICE_URL;

const restAgent = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json"
  }
});

restAgent.interceptors.response.use(undefined, (error) => {
  const statusCode = error.response ? error.response.status : null;
  console.log("Inte", statusCode);
  if (
    (statusCode && statusCode === 401) ||
    (statusCode && statusCode === 403)
  ) {
    Router.push("/auth/login");
  }
});

const getRequestConfig: any = () => {
  return {
    headers: {},
    params: {}
  };
};

// Register admin
export const registerAdmin = (data: any) => {
  const config = getRequestConfig();
  return restAgent.post("/admins", data, config);
};

// Login admin
export const loginAdmin = (data: any) => {
  const config = getRequestConfig();
  return restAgent.post("/auth-admin", data, config);
};

// attempt to login admin
export const attemptLoginAdmin = (data: any) => {
  const config = getRequestConfig();
  return restAgent.post("/auth-admin", data, config);
};

// get all patient
export const patientsService = {
  getAllPatients: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get("/patients", config);
  },

  getTotalPatients: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get("/patients/numberofpatientrecord", config);
  },

  getPatientsAddedToday: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get("/patients/patientregisterin24hr", config);
  },

  addPatient: (data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post("/patients", data, config);
  }
};

// medical History Service
export const medicalHistoryService = {
  // add medical history
  addMedicalHistory: (data: any, patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(
      `/patients/${patientId}/medical-histories`,
      data,
      config
    );
  },

  // get all medical history
  getAllMedicalHistory: (patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`/patients/${patientId}/medical-histories`, config);
  },

  // get single medical history
  getSingleMedicalHistory: (
    patientId: any,
    medicalHistoryId: any,
    token: any
  ) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(
      `/patients/${patientId}/medical-histories/${medicalHistoryId}`,
      config
    );
  }
};

// medication service
export const medicationService = {
  // add  medication history
  addMedicationHistory: (patientId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(
      `v2/patients/${patientId}/medication-histories`,
      data,
      config
    );
  }
};

// lab service
export const labService = {
  // add  lab history
  addLabTest: (patientId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(
      `v2/patients/${patientId}/laboratory-tests`,
      data,
      config
    );
  },

  // get all lab history
  getAllLabTest: (patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`v2/patients/${patientId}/laboratory-tests`, config);
  },

  // get single lab history
  getSingleLabTest: (patientId: any, medicalHistoryId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(
      `v2/patients/${patientId}/laboratory-tests/${medicalHistoryId}`,
      config
    );
  }
};

// soap service
export const soapService = {
  addSOAP: (patientId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(`v2/patients/${patientId}/assessments`, data, config);
  },
  getAllSOAP: (patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`v2/patients/${patientId}/assessments`, config);
  }
};

export const pharmacyService = {
  setupPharmacy: (adminId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(`v2/online-pharmacy/${adminId}`, data, config);
  },

  getPharmacy: (adminId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`v2/online-pharmacy/${adminId}`, config);
  }
};
