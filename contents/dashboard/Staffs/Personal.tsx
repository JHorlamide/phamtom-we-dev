// import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';

const Personal = ({ styles }: any) => {
  const { selectedStaff } = useSelector(
    (state: any) => state.staffReducer
  );
  // const { admin } = useSelector((state: any) => state.adminReducer);
  // const dispatch = useDispatch();
  // const [showEditStaffModal, setShowEditStaffModal]: any =
  //   useState(false);

  const personal = [
    {
      label: 'First name',
      value: selectedStaff?.first_name
    },

    {
      label: 'Last name',
      value: selectedStaff?.last_name
    },
    {
      label: 'Email',
      value: selectedStaff?.email
    },
    {
      label: 'Role',
      value: selectedStaff?.role
    },
    {
      label: 'DOB',
      value: selectedStaff?.dob?.substring(0,10)
    },
  ];


  return (
    <div className={styles.personal_details_body_container}>
      <div className={styles.details_body}>
        {/* patients personal info */}
        <div className={styles.personal_details_container}>
          { selectedStaff !== undefined && Object?.keys(selectedStaff)?.length > 0 &&
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
      </div>

        {/* <Button 
          className={styles.add_record}
          onClick={()=>setShowEditStaffModal(true)}
        >
          
          <p>Edit record</p>
        </Button> 
        <EditStaff
          admin={admin}
          handleGetAllPatients={handleGetAllPatients}
          styles={modalStyles}
          showEditStaffModal={showEditStaffModal}
          onHide={()=> setShowEditStaffModal(false)}
          selectedPatient={selectedStaff}
        /> */}
    </div>
  );
};

export default Personal;
