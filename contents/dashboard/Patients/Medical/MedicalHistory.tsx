import { useState, useEffect } from 'react';
import { Button } from '../../../../components/dashboard';
import { setPatientMedicalHistory } from '../../../../redux/actions/patients';
import { useSelector, useDispatch } from 'react-redux';
import { medicalHistoryService } from '../../../../services/restService';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import { MoonLoader } from 'react-spinners';

const MedicalHistory = ({
  medicalHistory,
  setSelectedRecord,
  styles,
  Image
}: any) => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { selectedPatient, patientMedicalHistory } = useSelector(
    (state: any) => state.patientsReducer
  );

  const dispatch = useDispatch();

  const [emptyState, setEmptyState]: any = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [addHistory, setAddHistory] = useState(false);
  const [inputFields, setInputFields] = useState({
    medical_history: '',
    social_history: '',
    surgical_history: '',
    allergies: '',
    adrs: ''
  });

  const handleClose = () => {
    setAddHistory(false);
  };

  const handleOnChange = (e: any) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      await medicalHistoryService.addMedicalHistory(
        inputFields,
        selectedPatient.patient_demographic.patient_recordId,
        admin.access_token
      );

      getAllMedicalHistory();

      setInputFields({
        medical_history: '',
        social_history: '',
        surgical_history: '',
        allergies: '',
        adrs: ''
      });
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      setIsAdding(false);
    }
  };

  const getAllMedicalHistory = async () => {
    setIsFetching(true);
    setEmptyState(null);
    try {
      const {
        data: {
          // eslint-disable-next-line camelcase
          data: { patient_medical_histories }
        }
      } = await medicalHistoryService.getAllMedicalHistory(
        selectedPatient.patient_demographic.patient_recordId,
        admin.access_token
      );

      if (
        // eslint-disable-next-line camelcase
        patient_medical_histories &&
        // eslint-disable-next-line camelcase
        typeof patient_medical_histories !== 'string'
      ) {
        // eslint-disable-next-line camelcase
        dispatch(setPatientMedicalHistory(patient_medical_histories.reverse()));
      } else {
        dispatch(setPatientMedicalHistory([]));
        setEmptyState('No history found');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const getSingleMedicalHistory = async () => {
    try {
      const data = await medicalHistoryService.getSingleMedicalHistory(
        selectedPatient.patient_demographic.patient_recordId,
        patientMedicalHistory[0].medical_history_id,
        admin.access_token
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMedicalHistory();
    // getSingleMedicalHistory();
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
          {patientMedicalHistory.length > 0 &&
            patientMedicalHistory.map((item: any, index: any) => (
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
                  <p>{moment(item?.createdAt).format('Do MMM., YYYY')}</p>
                  <Image
                    src='/assets/dashboard/chevronRight.svg'
                    width={'4.94px'}
                    height={'8px'}
                  />
                </div>

                <div className={styles.collapsible}>
                  <div className={styles.physician}>
                    <p className={styles.name}>Physician name</p>
                    <p className={styles.physician_name}> {item?.created_by}</p>
                  </div>

                  <div className={styles.history}>
                    <div className={styles.detail}>
                      <p className={styles.detail_title}>MEDICAL HISTORY</p>
                      <p className={styles.detail_statement}>
                        {item?.medical_history}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>SOCIAL HISTORY</p>
                      <p className={styles.detail_statement}>
                        {item?.social_history}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>SURGICAL HISTORY</p>
                      <p className={styles.detail_statement}>
                        {item?.surgical_history}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>ADRS</p>
                      <p className={styles.detail_statement}>{item?.adrs}</p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>ALLERGIES</p>
                      <p className={styles.detail_statement}>
                        {item?.allergies}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <>
            {isFetching && (
              <div className='flex items-center justify-center'>
                <MoonLoader color='#0055d2' size={30} />
              </div>
            )}
          </>
          {emptyState && <p>{emptyState}</p>}
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
          <p>Add Medical History</p>

          <Image
            src={'/assets/dashboard/close_btn_white.svg'}
            width={'14px'}
            height={'14px'}
            onClick={handleClose}
          />
        </div>

        <div className={styles.form_container}>
          <form>
            <div className={styles.text_area_container}>
              <label htmlFor='Occupation'>Medical History</label>
              <textarea
                onChange={handleOnChange}
                value={inputFields.medical_history}
                name='medical_history'
                id='Medical'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>

            <div className={styles.text_area_container}>
              <label htmlFor='Occupation'>Social history</label>
              <textarea
                onChange={handleOnChange}
                value={inputFields.social_history}
                name='social_history'
                id='Social'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>
            <div className={styles.text_area_container}>
              <label htmlFor='Surgical'>Surgical History</label>
              <textarea
                onChange={handleOnChange}
                value={inputFields.surgical_history}
                name='surgical_history'
                id='Surgical'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>
            <div className={styles.text_area_container}>
              <label htmlFor='Occupation'>Allergies</label>
              <textarea
                onChange={handleOnChange}
                value={inputFields.allergies}
                name='allergies'
                id='Allergies'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>
            <div className={styles.text_area_container}>
              <label htmlFor='Occupation'>ADRs</label>
              <textarea
                onChange={handleOnChange}
                value={inputFields.adrs}
                name='adrs'
                id='ADRs'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={
                Object.values(inputFields).some((x) => x === '') || isAdding
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

export default MedicalHistory;
