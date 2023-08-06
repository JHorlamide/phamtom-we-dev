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
  const [activeIndex, setActiveIndex]: any = useState(0);
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

      let payload = Object.keys(inputFields).filter(key => inputFields[key as keyof typeof inputFields])
      .reduce((acc: any, key) => {
        acc[key as keyof typeof acc] = inputFields[key as keyof typeof inputFields];
        return acc;
      }, {});

      await medicalHistoryService.addMedicalHistory(
        payload,
        selectedPatient._id,
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
          data
        }
      } = await medicalHistoryService.getAllMedicalHistory(
        selectedPatient._id,
        admin.access_token
      );

      if (
        // eslint-disable-next-line camelcase
        data &&
        // eslint-disable-next-line camelcase
        typeof data !== 'string' && data?.length > 0 
      ) {
        // eslint-disable-next-line camelcase
        dispatch(setPatientMedicalHistory(data));
        // dispatch(setPatientMedicalHistory(data.reverse()));
      } else {
        dispatch(setPatientMedicalHistory([]));
        setEmptyState('No medical history saved yet');
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
        selectedPatient._id,
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
              <div 
                key={index} 
                className={ activeIndex === index ? styles.history_activeContainer : styles.history_container}
              >
                <div
                  className={styles.history_header}
                  onClick={(e) => {
                    setActiveIndex(index);
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
                  <p>{moment(item?.createdAt).format('Do MMMM YYYY')}</p>
                  <Image
                    src='/assets/dashboard/chevronRight.svg'
                    width={'16px'}
                    height={'12px'}
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
        <p>Add Medical history</p>
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
                [inputFields.medical_history || inputFields.social_history || 
                  inputFields.surgical_history || inputFields.allergies || 
                  inputFields.adrs ].some((x) => x === '') || isAdding
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
