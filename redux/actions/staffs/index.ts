import * as TYPES from '../../types';

export const setStaffs = (data: any) => ({
  type: TYPES.SET_STAFFS,
  data
});

export const setSelectedStaff = (data: any) => ({
  type: TYPES.SET_SELECTED_STAFF,
  data
});

