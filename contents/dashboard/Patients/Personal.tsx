import React from "react";
import { useSelector } from "react-redux";

const Personal = ({ styles }: any) => {
  const { selectedPatient } = useSelector(
    (state: any) => state.patientsReducer
  );

  const personal = [
    {
      label: "First name",
      value: selectedPatient?.patient_demographic?.first_name
    },

    {
      label: "Last name",
      value: selectedPatient?.patient_demographic?.last_name
    },
    {
      label: "Gender",
      value: "-"
    },
    {
      label: "Phone number",
      value: selectedPatient?.patient_demographic?.phone_number
    },
    {
      label: "Age",
      value: selectedPatient?.patient_demographic?.age
    },
    {
      label: "Weight",
      value: selectedPatient?.patient_demographic?.weight_unit + "kg"
    },
    {
      label: "Height",
      value: selectedPatient?.patient_demographic?.height_unit + "m"
    },
    {
      label: "Blood group",
      value: selectedPatient?.patient_demographic?.blood_group
    },
    {
      label: "Occupation",
      value: selectedPatient?.patient_demographic?.occupation
    }
  ];

  return (
    <div className={styles.personal_details_body_container}>
      <div className={styles.details_body}>
        {/* patients personal info */}
        <div className={styles.personal_details_container}>
          {Object.keys(selectedPatient).length > 0 &&
            personal.map((item: any, index: any) => (
              <div key={index} style={{ display: "contents" }}>
                <div className={styles.personal_details}>
                  <p className={styles.label}>{item.label}</p>
                  <p className={styles.value}>{item.value}</p>
                </div>
                <hr />
              </div>
            ))}
        </div>

        <div style={{ margin: "24px 40px" }}>
          <p className={styles.postal_address}>POSTAL ADDRESS</p>
          <p className={styles._address}>
            {selectedPatient?.patient_demographic?.home_address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Personal;
