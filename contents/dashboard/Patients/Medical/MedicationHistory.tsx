import { useState, useEffect } from 'react';
import { Button, Input } from '../../../../components/dashboard';
import { setPatientMedicalHistory } from '../../../../redux/actions/patients';
import { useSelector, useDispatch } from 'react-redux';
import { medicationService } from '../../../../services/restService';
import { Modal } from 'react-bootstrap';
import produce from 'immer';

const MedicationHistory = ({
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

  const [isLoading, setIsLoading] = useState(false);
  const [addHistory, setAddHistory] = useState(false);
  const [inputFields, setInputFields] = useState([
    {
      medication_name: '',
      dosing_information: '',
      medication_strength: '',
      frequency: '',
      route_of_administration: '',
      duration_of_use: '',
      refill_information: ''
    }
  ]);
  const [tempInputFields, setTempInputFields]: any = useState([]);

  const newField = [
    {
      medication_name: '',
      dosing_information: '',
      medication_strength: '',
      frequency: '',
      route_of_administration: '',
      duration_of_use: '',
      refill_information: ''
    }
  ];

  const handleClose = () => {
    setAddHistory(false);
  };
  const handleSave = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await medicationService.addMedicationHistory(
        inputFields,
        selectedPatient.patient_demographic.patient_recordId,
        admin.access_token
      );

      setInputFields([
        {
          refill_information: '',
          medication_name: '',
          dosing_information: '',
          medication_strength: '',
          frequency: '',
          route_of_administration: '',
          duration_of_use: ''
        }
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      setIsLoading(false);
    }
  };

  // const getAllMedicationHistory = async () => {
  //   try {
  //     const {
  //       data: {
  //         // eslint-disable-next-line camelcase
  //         data: { patient_medical_histories }
  //       }
  //     } = await medicationService.(
  //       selectedPatient.patient_demographic.patient_recordId,
  //       admin.access_token
  //     );
  //     dispatch(setPatientMedicalHistory(patient_medical_histories));
  //     console.log(patient_medical_histories);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // getAllMedicationHistory();
  }, [selectedPatient]);

  return (
    <>
      <div className={styles.medical_history_container}>
        <div className={styles.header}>
          <Image
            src='/assets/dashboard/arrow_left.svg'
            width={'18px'}
            height={'12px'}
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
                    e.currentTarget.style.marginBottom = '0px';
                  } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    e.currentTarget.style.marginBottom = '16px';
                  }

                  console.log(content);
                }}
              >
                <p>{history?.date}</p>
                <Image
                  src='/assets/dashboard/chevronRight.svg'
                  width={'4.94px'}
                  height={'8px'}
                />
              </div>

              <div className={styles.collapsible}>
                <div className={styles.physician}>
                  <p className={styles.name}>Physician name</p>
                  <p className={styles.physician_name}>
                    {' '}
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

                      <hr style={{ marginTop: '16px' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => setAddHistory(true)} className={styles.add_record}>
        <Image
          src={'/assets/dashboard/plus.svg'}
          width={'14px'}
          height={'14px'}
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
          <p>Add Medication History</p>

          <Image
            src={'/assets/dashboard/close_btn_white.svg'}
            width={'14px'}
            height={'14px'}
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
                  <label htmlFor='medication_name'>Medication name</label>
                  <Input
                    styles='input_primary'
                    onChange={(e: any) => {
                      setInputFields((currentFields) =>
                        produce(currentFields, (draft) => {
                          draft[index].medication_name = e.target.value;
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
                  <label htmlFor='dosing_information'>Dosage information</label>
                  <textarea
                    onChange={(e: any) => {
                      setInputFields((currentFields) =>
                        produce(currentFields, (draft) => {
                          draft[index].dosing_information = e.target.value;
                        })
                      );
                    }}
                    value={inputField.dosing_information}
                    name='dosing_information'
                    id='dosing_information'
                    placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='medication_strength'>Medical strength</label>
                  <Input
                    styles='input_primary'
                    onChange={(e: any) => {
                      setInputFields((currentFields) =>
                        produce(currentFields, (draft) => {
                          draft[index].medication_strength = e.target.value;
                        })
                      );
                    }}
                    value={inputField.medication_strength}
                    name='medication_strength'
                    id='medication_strength'
                    placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='frequency'>Frequency</label>
                  <Input
                    styles='input_primary w-50'
                    onChange={(e: any) => {
                      setInputFields((currentFields) =>
                        produce(currentFields, (draft) => {
                          draft[index].frequency = e.target.value;
                        })
                      );
                    }}
                    value={inputField.frequency}
                    name='frequency'
                    id='frequency'
                    placeholder='Textfield text'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='route_of_administration'>
                    Route of administration
                  </label>
                  <Input
                    styles='input_primary'
                    onChange={(e: any) => {
                      setInputFields((currentFields) =>
                        produce(currentFields, (draft) => {
                          draft[index].route_of_administration = e.target.value;
                        })
                      );
                    }}
                    value={inputField.route_of_administration}
                    name='route_of_administration'
                    id='route_of_administration'
                    placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='duration_of_use'>Duration of use</label>
                  <div className={styles.duration_of_use}>
                    <Input
                      type='number'
                      styles='input_primary'
                      onChange={(e: any) => {
                        setInputFields((currentFields) =>
                          produce(currentFields, (draft) => {
                            draft[index].duration_of_use = e.target.value;
                          })
                        );
                      }}
                      value={inputField.duration_of_use}
                      name='duration_of_use'
                      id='duration_of_use'
                      placeholder='3'
                    />

                    <select className={styles.select} name='' id=''>
                      {['day', 'week', 'month', 'year'].map(
                        (item: any, index: any) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='refill_information'>Refill information</label>
                  <Input
                    styles='input_primary'
                    onChange={(e: any) => {
                      setInputFields((currentFields) =>
                        produce(currentFields, (draft) => {
                          draft[index].refill_information = e.target.value;
                        })
                      );
                    }}
                    value={inputField.refill_information}
                    name='refill_information'
                    id='refill_information'
                    placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                  />
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
                  Object.values(inputFields[0]).some((x) => x === '') ||
                  isLoading
                }
              >
                <Image
                  src={'/assets/dashboard/plus_blue.svg'}
                  width={'14px'}
                  height={'14px'}
                />
                <p>Add another medication</p>
              </Button>
            </div>

            <Button
              onClick={handleSave}
              disabled={
                (Object.values(inputFields[0]).some((x) => x === '') ||
                  isLoading) &&
                tempInputFields.length < 1
              }
              className={'btn_primary'}
              style={{ marginTop: '16px' }}
            >
              Save
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default MedicationHistory;
