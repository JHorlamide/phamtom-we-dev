import axios from 'axios';
import Router from 'next/router';
import { toast } from 'react-toastify';

const API_ENDPOINT = process.env.NEXT_PUBLIC_SERVICE_URL;

const restAgent = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

restAgent.interceptors.response.use(undefined, (error) => {
  const statusCode = error.response ? error.response.status : null;
  console.log('Inte', statusCode);
  console.log('Inte', error.response);

  if (
    error.response.data.message === 'Admin does not exist' ||
    error.response.data.message === 'Pharmacy not found'
  ) {
    console.log(error.response.data.message);
  } else if (error?.response?.data?.error) {
    toast.error(error.response.data.error);
  } else if (error?.response?.data?.errors) {
    toast.error(error.response.data.errors[0]);
  } else {
    toast.error(error.response.data.message);
  }

  if (
    // (statusCode && statusCode === 401) ||
    (statusCode && statusCode === 403)
  ) {
    Router.push('/auth/login');
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
  return restAgent.post('/admins', data, config);
};

// Login admin
export const loginAdmin = (data: any) => {
  const config = getRequestConfig();
  return restAgent.post('/auth-admin', data, config);
};

// attempt to login admin
export const attemptLoginAdmin = (data: any) => {
  const config = getRequestConfig();
  return restAgent.post('/auth-admin', data, config);
};

// forgot admin password
export const forgotPassword = (data: any) => {
  const config = getRequestConfig();
  return restAgent.post('/auth/forgot-password', data, config);
};

// update admin password
export const updatePassword = (data: any, token:any) => {
  const config = getRequestConfig();
  config.headers.Authorization = `Bearer ${token}`;
  return restAgent.post('/auth/update-password', data, config);
};

// staff
export const staffService = {
  getAllStaffs: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get('/staffs', config);
  },

  addStaff: (data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post('/staffs', data, config);
  },

  editStaff: (staffId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.delete(`/staffs/${staffId}`, config);
  }
};

// patient
export const patientsService = {
  getAllPatients: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get('/patients', config);
  },

  getTotalPatients: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get('/patients/numberofpatientrecord', config);
  },

  getPatientsAddedToday: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get('/patients/patientregisterin24hr', config);
  },

  addPatient: (data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post('/patients', data, config);
  },

  editPatient: (data: any, patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.patch(`/patients/${patientId}`, data, config);
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
      `/patients/${patientId}/medication-histories`,
      data,
      config
    );
  },

  // get all medication history
  getAllMedicationHistory: (patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`/patients/${patientId}/medication-histories`, config);
  }
};

// lab service
export const labService = {
  // add  lab history
  addLabTest: (patientId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(
      `/patients/${patientId}/laboratory-tests`,
      data,
      config
    );
  },

  // get all lab history
  getAllLabTest: (patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`/patients/${patientId}/laboratory-tests`, config);
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

// vital service
export const vitalService = {
  // add  lab history
  addVitalSign: (patientId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(
      `/patients/${patientId}/vital-signs`,
      data,
      config
    );
  },

  // get all lab history
  getAllVitalSign: (patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`/patients/${patientId}/vital-signs`, config);
  },

  // get single lab history
  getSingleVitalSign: (patientId: any, medicalHistoryId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(
      `/patients/${patientId}/vital-signs/${medicalHistoryId}`,
      config
    );
  }
};

// soap service
export const soapService = {
  addSOAP: (patientId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(`/patients/${patientId}/assessments`, data, config);
  },
  getAllSOAP: (patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`/patients/${patientId}/assessments`, config);
  }
};

export const pharmacyService = {
  setupPharmacy: (data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post('/online-pharmacy', data, config);
  },

  getPharmacy: (adminId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`/online-pharmacy/${adminId}`, config);
  },

  addLogistics: (data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post('/online-pharmacy/logistics', data, config);
  }
};

// product
export const productService = {
  addProduct: (data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post('/products', data, config);
  },

  updateProduct: (productId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.put(`/products/online-pharmacy/${productId}`, data, config);
  },

  getSingleProduct: (pharmacyName: any, productId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`/${pharmacyName}/products/${productId}`, config);
  },

  getAllProduct: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get('/products/online-pharmacy', config);
  }
};

// order
export const orderService = {
  getSingleOrder: (pharmacyName: any, orderId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`/${pharmacyName}/orders/${orderId}`, config);
  },

  getAllPendingOrders: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`/orders/admin`, config);
  },

  getActiveOrders: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`/orders/admin/active-orders`, config);
  },

  updateOrders: (orderId:any, data:any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.put(`/orders/admin/order-status/${orderId}`, data, config);
  },

  addCourierService: (orderId:any, data:any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.put(`/orders/add-courier-service/${orderId}`, data, config);
  },

  addTrackingNumber: (orderId:any, data:any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.put(`/orders/add-tracking-number/${orderId}`, data, config);
  },
};

// shipping
export const shippingService = {
  addLogistics: (data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post('/online-pharmacy/logistics', data, config);
  },

  getAllLogistics: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get('/online-pharmacy/logistics', config);
  }
};

// file upload
export const fileUploadService = {
  fileUpload: (data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post('/file-upload', data, config);
  }
};

// nigerian banks
export const getBanks = () => {
  return axios.get('https://nigerianbanks.xyz/');
};

// bank checker
export const bankAccountChecker = (account: any, code: any) => {
  return axios.get(`https://maylancer.org/api/nuban/api.php?account_number=${account}&bank_code=${code}`);
};

// shipping
export const subscriptionService = {
  addSubscription: (data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post('/billing/subscriptions', data, config);
  },

  getSubscription: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get('/billing/subscriptions/details', config);
  }
};
