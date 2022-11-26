import { useState, useEffect } from 'react';
import { Button, Input } from '../../../../components/dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { medicalHistoryService } from '../../../../services/restService';
import { Modal } from 'react-bootstrap';
import produce from 'immer';

const Vitals = ({ medicalHistory, setSelectedRecord, styles, Image }: any) => {
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

  const handleClose = () => {
    setAddHistory(false);
  };
  const handleSave = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await medicalHistoryService.addMedicalHistory(
        inputFields,
        selectedPatient.patient_demographic.patient_recordId,
        admin.access_token
      );
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      setIsLoading(false);
    }
  };

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
          <p>Add Vitals</p>

          <Image
            src={'/assets/dashboard/close_btn_white.svg'}
            width={'14px'}
            height={'14px'}
            onClick={handleClose}
          />
        </div>

        <div className={styles.form_container}>
          <form>
            {inputFields.map((inputField: any, index: any) => (
              <div key={index} className={styles.form_row}>
                <div className={styles.text_area_container}>
                  <label htmlFor='medication_name'>Date</label>
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
                    type={'date'}
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='Blood pressure'>Blood pressure</label>
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
                    id='Blood pressure'
                    placeholder='Blood pressure'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='medication_strength'>Pulse rate</label>
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
                    placeholder='Enter pulse rate'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='frequency'>Respiration rate</label>
                  <Input
                    styles='input_primary'
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
                    placeholder='Respiration rate'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='temperature'>Body temperature</label>

                  <Input
                    type='text'
                    styles='input_primary'
                    onChange={(e: any) => {
                      setInputFields((currentFields) =>
                        produce(currentFields, (draft) => {
                          draft[index].duration_of_use = e.target.value;
                        })
                      );
                    }}
                    value={inputField.duration_of_use}
                    name='temperature'
                    id='temperature'
                    placeholder='Body temperature'
                  />
                </div>
              </div>
            ))}

            <Button
              // onClick={handleSave}
              disabled={
                Object.values(inputFields[0]).some((x) => x === '') || isLoading
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

export default Vitals;
