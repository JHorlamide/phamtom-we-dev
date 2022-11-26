import { useState, useEffect, useRef } from "react";
import { Button, Input } from "../../../../components/dashboard";
import { useSelector, useDispatch } from "react-redux";
import { setPatientLabTests } from "../../../../redux/actions/patients";
import { labService } from "../../../../services/restService";
import { Modal } from "react-bootstrap";
import produce from "immer";

const LabTests = ({
  medicalHistory,
  setSelectedRecord,
  styles,
  Image
}: any) => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { selectedPatient } = useSelector(
    (state: any) => state.patientsReducer
  );

  const dispatch = useDispatch();

  const Ref: any = useRef();

  const onButtonClick = () => {
    Ref.current.click();
  };

  const [emptyState, setEmptyState]: any = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addHistory, setAddHistory] = useState(false);
  const [inputFields, setInputFields] = useState([
    {
      test_name: "",
      test_date: "",
      test_result: "",
      upload_doc: "dsfdsf"
    }
  ]);

  const [tempInputFields, setTempInputFields]: any = useState([]);

  const newField = [
    {
      test_name: "",
      test_date: "",
      test_result: "",
      upload_doc: "fdgfdg"
    }
  ];

  const handleClose = () => {
    setAddHistory(false);
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await labService.addLabTest(
        selectedPatient.patient_demographic.patient_recordId,
        inputFields,
        admin.access_token
      );

      console.log("data", data);

      setInputFields([
        {
          test_name: "",
          test_date: "",
          test_result: "",
          upload_doc: ""
        }
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      setIsLoading(false);
    }
  };

  const getAllLabTests = async () => {
    try {
      const {
        data: {
          data: { data }
        }
      } = await labService.getAllLabTest(
        selectedPatient.patient_demographic.patient_recordId,
        admin.access_token
      );

      if (typeof data !== "string") {
        dispatch(setPatientLabTests(data));
        setEmptyState(null);
      } else {
        dispatch(setPatientLabTests([]));
        setEmptyState("No test found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLabTests();
  }, []);
  return (
    <>
      <div className={styles.medical_history_container}>
        <div className={styles.header}>
          <Image
            src='/assets/dashboard/arrow_left.svg'
            width={"18px"}
            height={"12px"}
            className='cursor-pointer'
            onClick={() => setSelectedRecord(null)}
          />
          <p>{medicalHistory?.label}</p>
        </div>

        <div className={styles.medical_history_}>
          {medicalHistory?.history.map((history: any, index: any) => (
            <div key={index} className={styles.history_container}>
              <div
                className={styles.history_header}
                onClick={(e) => {
                  const content: any = e.currentTarget.nextElementSibling;
                  if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    e.currentTarget.style.marginBottom = "0px";
                  } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    e.currentTarget.style.marginBottom = "16px";
                  }
                }}
              >
                <p>{history?.date}</p>
                <Image
                  src='/assets/dashboard/chevronRight.svg'
                  width={"4.94px"}
                  height={"8px"}
                />
              </div>

              <div className={styles.collapsible}>
                <div className={styles.physician}>
                  <p className={styles.name}>Physician name</p>
                  <p className={styles.physician_name}>
                    {" "}
                    {history?.details?.physician}
                  </p>
                </div>

                <div className={styles.history}>
                  {history.details.history.map((detail: any, index: any) => (
                    <div key={index} className={styles.detail}>
                      <p className={styles.detail_title}>{detail.label}</p>
                      <p className={styles.detail_statement}>
                        {detail?.statement}
                      </p>

                      <hr style={{ marginTop: "16px" }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {emptyState && <p>{emptyState}</p>}
        </div>
      </div>
      <Button onClick={() => setAddHistory(true)} className={styles.add_record}>
        <Image
          src={"/assets/dashboard/plus.svg"}
          width={"14px"}
          height={"14px"}
        />
        <p>Add history</p>
      </Button>

      <Modal
        id={styles.modal_container}
        centered
        show={addHistory}
        onHide={handleClose}
      >
        <div className={styles.label_container}>
          <p>Add Laboratory Test</p>

          <Image
            src={"/assets/dashboard/close_btn_white.svg"}
            width={"14px"}
            height={"14px"}
            onClick={handleClose}
          />
        </div>

        <div className={styles.form_container}>
          <form>
            {tempInputFields &&
              tempInputFields.map((input: any, index: any) => (
                <div key={index} className={styles.saved_item}>
                  <p>{input.medication_name}</p>
                </div>
              ))}
            {inputFields.map((inputField: any, index: any) => (
              <div key={index} className={styles.form_row}>
                <div className={styles.text_area_container}>
                  <label htmlFor='medication_name'>Test name</label>
                  <Input
                    styles='input_primary'
                    onChange={(e: any) => {
                      setInputFields((currentFields) =>
                        produce(currentFields, (draft) => {
                          draft[index].test_name = e.target.value;
                        })
                      );
                    }}
                    value={inputField.medication_name}
                    name='medication_name'
                    id='medication_name'
                    placeholder='Enter medication name'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='medication_strength'>Date of test</label>
                  <Input
                    styles='input_primary'
                    onChange={(e: any) => {
                      setInputFields((currentFields) =>
                        produce(currentFields, (draft) => {
                          draft[index].test_date = e.target.value;
                        })
                      );
                    }}
                    value={inputField.medication_strength}
                    name='medication_strength'
                    id='medication_strength'
                    type='date'
                    placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='dosing_information'>Results</label>
                  <textarea
                    onChange={(e: any) => {
                      setInputFields((currentFields) =>
                        produce(currentFields, (draft) => {
                          draft[index].test_result = e.target.value;
                        })
                      );
                    }}
                    value={inputField.dosing_information}
                    name='dosing_information'
                    id='dosing_information'
                    // placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                  />
                </div>

                <div
                  style={{ marginTop: "8px" }}
                  className={styles.text_area_container}
                >
                  <div className={styles.upload_doc}>
                    <input type='file' ref={Ref} style={{ display: "none" }} />

                    <div onClick={onButtonClick}>
                      <Image
                        src={"/assets/dashboard/doc.svg"}
                        width={"16px"}
                        height={"20px"}
                      />
                      <p>Upload a document</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className={styles.add_another}>
              <Button
                onClick={(e: any) => {
                  e.preventDefault();
                  setTempInputFields([
                    ...tempInputFields,
                    { ...inputFields[0] }
                  ]);

                  setInputFields(newField);
                }}
                className='secondary_2'
                disabled={
                  Object.values(inputFields[0]).some((x) => x === "") ||
                  isLoading
                }
              >
                <Image
                  src={"/assets/dashboard/plus_blue.svg"}
                  width={"14px"}
                  height={"14px"}
                />
                <p>Add another medication</p>
              </Button>
            </div>

            <Button
              onClick={handleSave}
              disabled={
                (Object.values(inputFields[0]).some((x) => x === "") ||
                  isLoading) &&
                tempInputFields.length < 1
              }
              className={"btn_primary"}
              style={{ marginTop: "16px" }}
            >
              Save
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default LabTests;
