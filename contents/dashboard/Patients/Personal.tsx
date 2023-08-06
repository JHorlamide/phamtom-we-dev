import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/dashboard';
import EditPatient from './EditPatient';
import modalStyles from '../../../styles/dashboard/Patients.module.scss';
import { patientsService } from '../../../services/restService';
import { setPatients } from '../../../redux/actions/patients';

const Personal = ({ styles }: any) => {
  const { selectedPatient } = useSelector(
    (state: any) => state.patientsReducer
  );
  const { admin } = useSelector((state: any) => state.adminReducer);
  const dispatch = useDispatch();
  const [showEditPatientModal, setShowEditPatientModal]: any =
    useState(false);

  const personal = [
    {
      label: 'First name',
      value: selectedPatient?.patient_demographic?.first_name
    },

    {
      label: 'Last name',
      value: selectedPatient?.patient_demographic?.last_name
    },
    {
      label: 'Gender',
      value: '-'
    },
    {
      label: 'Phone number',
      value: selectedPatient?.patient_demographic?.phone_number
    },
    {
      label: 'Age',
      value: selectedPatient?.patient_demographic?.date_of_birth
      // value: selectedPatient?.patient_demographic?.age
    },
    {
      label: 'Weight',
      value: selectedPatient?.patient_demographic?.weight_unit + 'kg'
    },
    {
      label: 'Height',
      value: selectedPatient?.patient_demographic?.height_unit + 'm'
    },
    {
      label: 'Blood group',
      value: selectedPatient?.patient_demographic?.blood_group
    },
    {
      label: 'Occupation',
      value: selectedPatient?.patient_demographic?.occupation
    }
  ];

  const handleGetAllPatients = async () => {
    try {
      await patientsService.getAllPatients(admin.access_token)
        .then((response) => response.data)
        .then(res => {
          if (res.status === 'Success') {
            dispatch(setPatients(res.data));
            // dispatch(setPatients(res.data.reverse()));
          }
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.personal_details_body_container}>
      <div className={styles.details_body}>
        {/* patients personal info */}
        <div className={styles.personal_details_container}>
          {selectedPatient !== undefined && Object?.keys(selectedPatient)?.length > 0 &&
            personal?.map((item: any, index: any) => (
              <div key={index} style={{ display: 'contents' }}>
                <div className={styles.personal_details}>
                  <p className={styles.label}>{item.label}</p>
                  <p className={styles.value}>{item.value}</p>
                </div>
                <hr />
              </div>
            ))}
        </div>

        <div style={{ margin: '24px 40px' }}>
          <p className={styles.postal_address}>POSTAL ADDRESS</p>
          <p className={styles._address}>
            {selectedPatient?.patient_demographic?.home_address}
          </p>
        </div>
      </div>

      <Button
        className={styles.add_record}
        onClick={() => setShowEditPatientModal(true)}
      >

        <p>Edit record</p>
      </Button>
      <EditPatient
        admin={admin}
        handleGetAllPatients={handleGetAllPatients}
        styles={modalStyles}
        showEditPatientModal={showEditPatientModal}
        onHide={() => setShowEditPatientModal(false)}
        selectedPatient={selectedPatient}
      />
    </div>
  );
};

export default Personal;
