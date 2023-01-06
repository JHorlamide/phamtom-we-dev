import * as TYPES from '../../types';

export const setPharmacy = (data: any) => ({
  type: TYPES.SET_PHARMACY,
  data
});

export const setPharmacyState = (data: any) => ({
  type: TYPES.SET_PHARMACY_STATE,
  data
});

export const setProduct = (data: any) => ({
  type: TYPES.SET_PRODUCTS,
  data
});

export const setSelectedProduct = (data: any) => ({
  type: TYPES.SET_SELECTED_PRODUCT,
  data
});

export const setOrders = (data: any) => ({
  type: TYPES.SET_ORDERS,
  data
});

export const setLogistics = (data: any) => ({
  type: TYPES.SET_LOGISTICS,
  data
});