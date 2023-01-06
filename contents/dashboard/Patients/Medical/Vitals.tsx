import { useState, useEffect } from 'react';
import { Button, Input } from '../../../../components/dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { vitalService } from '../../../../services/restService';
import { Modal } from 'react-bootstrap';
import produce from 'immer';
import { setPatientVitalSigns } from '../../../../redux/actions/patients';
import { MoonLoader } from 'react-spinners';
import moment from 'moment';

const Vitals = ({ medicalHistory, setSelectedRecord, styles, Image }: any) => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { selectedPatient, vitalSigns} = useSelector(
    (state: any) => state.patientsReducer
  );

  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex]: any = useState(0);
  const [emptyState, setEmptyState]: any = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addHistory, setAddHistory] = useState(false);
  const [inputFields, setInputFields] = useState(
    {
      date: '',
      blood_pressure: '',
      pulse_rate: '',
      respiration_rate: '',
      body_temperature: '',
    }
  );

  const handleOnChange = (e: any) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    setAddHistory(false);
  };
  const handleSave = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await vitalService.addVitalSign(
        selectedPatient.patient_demographic.patient_recordId,
        inputFields,
        admin.access_token
      );

      getAllVitalSigns()
      setInputFields({
          date: '',
          blood_pressure: '',
          pulse_rate: '',
          respiration_rate: '',
          body_temperature: '',
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      setIsLoading(false);
    }
  };

  const getAllVitalSigns = async () => {
    try {
      const {
        data: {
          data
        }
      } = await vitalService.getAllVitalSign(
        selectedPatient.patient_demographic.patient_recordId,
        admin.access_token
      );
      if (typeof data !== 'string' && data?.length > 0) {
        dispatch(setPatientVitalSigns(data.reverse()));
        setEmptyState(null);
      } else {
        dispatch(setPatientVitalSigns([]));
        setEmptyState('No vital signs saved yet');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllVitalSigns();
  }, []);

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
          {vitalSigns?.length > 0 &&
            vitalSigns.map((item: any, index: any) => (
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
                      <p className={styles.detail_title}>DATE</p>
                      <p className={styles.detail_statement}>
                        {moment(item?.date).format('Do MMMM YYYY')}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>BLOOD PRESSURE</p>
                      <p className={styles.detail_statement}>
                        {item?.blood_pressure}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>PULSE RATE</p>
                      <p className={styles.detail_statement}>
                        {item?.pulse_rate}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                      </div>
                      
                    <div className={styles.detail}>
                      <p className={styles.detail_title}>RESPIRATION RATE</p>
                      <p className={styles.detail_statement}>
                        {item?.respiration_rate}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>BODY TEMPERATURE</p>
                      <p className={styles.detail_statement}>
                        {item?.body_temperature}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <>
            {isLoading && (
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
        <p>Add Vitals Signs</p>
      </Button>

      <Modal
        id={styles.modal_container}
        centered
        show={addHistory}
        onHide={handleClose}
      >
        <div className={styles.label_container}>
          <p>Add Vitals Signs</p>

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
                  <label htmlFor='date'>Date</label>
                  <Input
                    styles='input_primary'
                    onChange={handleOnChange}
                    value={inputFields.date}
                    name='date'
                    id='date'
                    placeholder='Enter date'
                    type={'date'}
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='Blood pressure'>Blood pressure</label>
                  <textarea
                    onChange={handleOnChange}
                    value={inputFields.blood_pressure}
                    name='blood_pressure'
                    id='Blood pressure'
                    placeholder='Blood pressure'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='pulse_rate'>Pulse rate</label>
                  <Input
                    styles='input_primary'
                    onChange={handleOnChange}
                    value={inputFields.pulse_rate}
                    name='pulse_rate'
                    id='pulse_rate'
                    placeholder='Enter pulse rate'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='respiration_rate'>Respiration rate</label>
                  <Input
                    styles='input_primary'
                    onChange={handleOnChange}
                    value={inputFields.respiration_rate}
                    name='respiration_rate'
                    id='respiration_rate'
                    placeholder='Respiration rate'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='body_temperature'>Body temperature</label>

                  <Input
                    type='text'
                    styles='input_primary'
                    onChange={handleOnChange}
                    value={inputFields.body_temperature}
                    name='body_temperature'
                    id='body_temperature'
                    placeholder='Body temperature'
                  />
                </div>
            

            <Button
              onClick={handleSave}
              disabled={
                [inputFields?.blood_pressure || inputFields?.body_temperature ||
                  inputFields?.date || inputFields?.pulse_rate || inputFields?.respiration_rate
                ].some((x) => x === '') || isLoading
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
