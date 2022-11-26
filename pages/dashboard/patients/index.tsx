import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import {
  setPatients,
  setSelectedPatient
} from "../../../redux/actions/patients";
import { patientsService } from "../../../services/restService";
import {
  DashboardLayout,
  Input,
  Button,
  useScreenSize
} from "../../../components/dashboard";
import Image from "next/image";
import styles from "../../../styles/dashboard/Patients.module.scss";
import {
  MedicalData,
  PersonalData,
  AddNewPatient
} from "../../../contents/dashboard/Patients";

const Patients: NextPage = () => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { patients, selectedPatient } = useSelector(
    (state: any) => state.patientsReducer
  );
  const dispatch = useDispatch();

  const screenSize = useScreenSize();
  const [currentTab, setCurrentTab]: any = useState("PERSONAL");
  const [searchTerm, setSearchTerm]: any = useState("");
  const [showAddNewPatientModal, setShowAddNewPatientModal]: any =
    useState(false);

  const handleHideAddNewPatient = () => {
    setShowAddNewPatientModal(false);
  };

  const handleChangeTab = (tab: any) => {
    setCurrentTab(tab);
  };

  useEffect(() => {
    handleGetAllPatients();
  }, []);

  const handleGetAllPatients = async () => {
    try {
      const {
        data: { patients }
      } = await patientsService.getAllPatients(admin.access_token);
      dispatch(setPatients(patients.reverse()));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenMedicalInfo = () => {
    const slider = document.getElementById("CHATS_SLIDER") as HTMLElement;
    slider.classList.add("slide_right");
  };

  const handleCloseChat = () => {
    const slider = document.getElementById("CHATS_SLIDER") as HTMLElement;
    slider.classList.remove("slide_right");
  };

  useEffect(() => {
    dispatch(setSelectedPatient(patients[0]));
  }, []);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <DashboardLayout>
      <div className={styles.patients_container}>
        <div className={styles.patients}>
          <h1>Patients</h1>

          <div>
            <div className={styles.patients_cont}>
              <Input
                styles='input_secondary'
                placeholder='Search here'
                img='/assets/dashboard/search.svg'
                width='24px'
                height='24px'
                type={"text"}
                onChange={handleSearch}
              />

              <Button
                onClick={setShowAddNewPatientModal}
                className={`${styles.add_patient} btn_primary`}
              >
                <Image
                  src={"/assets/dashboard/plus.svg"}
                  height={"14px"}
                  width={"14px"}
                />
                <p>Add new patient</p>
              </Button>
              <div>
                <ul className={styles.all_patients_container}>
                  {patients
                    .filter((item: any) => {
                      if (searchTerm !== "") {
                        return (
                          item.patient_demographic.first_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          item.patient_demographic.last_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        );
                      } else {
                        return item;
                      }
                    })
                    .map((patient: any, index: any) => (
                      <li
                        key={index}
                        onClick={() => {
                          handleOpenMedicalInfo();
                          dispatch(setSelectedPatient(patient));
                        }}
                      >
                        <div className={styles.patient_list}>
                          <div className={styles.patient_info}>
                            <Image
                              src={"/assets/dashboard/avatar.svg"}
                              alt='avatar'
                              width={"40"}
                              height={"40"}
                              layout='fixed'
                            />

                            <div>
                              <p className={styles.patient_name}>
                                {patient.patient_demographic.first_name}{" "}
                                {patient.patient_demographic.last_name}
                              </p>
                              <p className={styles.email}>
                                {patient.patient_demographic.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <hr />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.patient_details_container}>
          <div
            id={"CHATS_SLIDER"}
            className={`${styles.patient_details} ${
              screenSize.width > 700 &&
              Object.keys(selectedPatient).length > 1 &&
              "slide_right"
            }`}
          >
            <div className={styles.patient_details_header}>
              <div className={styles.patient_header}>
                {screenSize.width < 700 && (
                  <Image
                    src='/assets/dashboard/arrow_left.svg'
                    alt='avatar'
                    width={"18px"}
                    height={"12px"}
                    onClick={handleCloseChat}
                  />
                )}

                {/* user avarta */}
                <Image
                  src={"/assets/dashboard/avatar.svg"}
                  alt='avatar'
                  width={"64px"}
                  height={"64px"}
                />
              </div>

              <div className={styles.tabs}>
                {["PERSONAL", "MEDICAL"].map((tab: any, index: any) => (
                  <div
                    key={index}
                    className={
                      currentTab === tab ? styles.active_tab : styles.tab
                    }
                    onClick={() => handleChangeTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>

            {/* patients details */}
            {currentTab === "PERSONAL" && <PersonalData styles={styles} />}
            {currentTab === "MEDICAL" && (
              <>
                <MedicalData styles={styles} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* add new patient */}
      <AddNewPatient
        styles={styles}
        showAddNewPatientModal={showAddNewPatientModal}
        onHide={handleHideAddNewPatient}
        admin={admin}
        handleGetAllPatients={handleGetAllPatients}
      />
    </DashboardLayout>
  );
};

export default Patients;
