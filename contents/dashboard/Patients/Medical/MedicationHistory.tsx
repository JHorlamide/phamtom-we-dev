import { useState, useEffect } from 'react';
import { Button, Input } from '../../../../components/dashboard';
import { setPatientMedicationHistory } from '../../../../redux/actions/patients';
import { useSelector, useDispatch } from 'react-redux';
import { medicationService } from '../../../../services/restService';
import { Modal } from 'react-bootstrap';
import { MoonLoader } from 'react-spinners';
// import produce from 'immer';
import moment from 'moment';

const MedicationHistory = ({
  medicalHistory,
  setSelectedRecord,
  styles,
  Image
}: any) => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { selectedPatient, patientMedicationHistory  } = useSelector(
    (state: any) => state.patientsReducer
  );

  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex]: any = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [addHistory, setAddHistory] = useState(false);
  const [inputFields, setInputFields] = useState({
      medication_name: '',
      dosing_information: '',
      medication_strength: '',
      frequency: '',
      route_of_administration: '',
      duration_of_use: '',
      refill_information: ''
    });
  // const [tempInputFields, setTempInputFields]: any = useState([]);
  const [emptyState, setEmptyState]: any = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  // const newField = [
  //   {
  //     medication_name: '',
  //     dosing_information: '',
  //     medication_strength: '',
  //     frequency: '',
  //     route_of_administration: '',
  //     duration_of_use: '',
  //     refill_information: ''
  //   }
  // ];

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
    setIsLoading(true);

    try {
       await medicationService.addMedicationHistory(
        selectedPatient.patient_demographic.patient_recordId,
        inputFields,
        admin.access_token
      )
      .then((response) => console.log(response) )
      // getAllMedicationHistory()
      setInputFields(
        {
          // full_name: '',
          refill_information: '',
          medication_name: '',
          dosing_information: '',
          medication_strength: '',
          frequency: '',
          route_of_administration: '',
          duration_of_use: ''
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      setIsLoading(false);
    }
  };


  const getAllMedicationHistory = async () => {
    setIsFetching(true);
    setEmptyState(null);
    try {
      const {
        data: {
          // eslint-disable-next-line camelcase
          data
        }
      } = await medicationService.getAllMedicationHistory(
        selectedPatient.patient_demographic.patient_recordId,
        admin.access_token
      );
      if (
        // eslint-disable-next-line camelcase
        data &&
        // eslint-disable-next-line camelcase
        typeof data !== 'string' && data?.length > 0
      ) {
        console.log(data)
        // eslint-disable-next-line camelcase
        dispatch(setPatientMedicationHistory(data.reverse()));
      } else {
        dispatch(setPatientMedicationHistory([]));
        setEmptyState('No saved medication history yet');
      };
    } catch (error) {
      console.log(error);
    }finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getAllMedicationHistory();
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
          {patientMedicationHistory?.length > 0 &&
            patientMedicationHistory.map((item: any, index: any) => (
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
                      <p className={styles.detail_title}>MEDICATION NAME</p>
                      <p className={styles.detail_statement}>
                        {item?.medication_name}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>DOSING INFORMATION</p>
                      <p className={styles.detail_statement}>
                        {item?.dosing_information}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>MEDICAL STRENGTH</p>
                      <p className={styles.detail_statement}>
                        {item?.medication_strength}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                      </div>
                      
                    <div className={styles.detail}>
                      <p className={styles.detail_title}>FREQUENCY</p>
                      <p className={styles.detail_statement}>
                        {item?.frequency}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>ROUTE OF ADMINISTRATION</p>
                      <p className={styles.detail_statement}>
                        {item?.route_of_administration}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>DURATION OF USE</p>
                      <p className={styles.detail_statement}>
                        {item?.duration_of_use}
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
        <p>Add Medication</p>
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
            {/* {tempInputFields &&
              tempInputFields.map((input: any, index: any) => (
                <div key={index} className={styles.saved_item}>
                  <p>{input.medication_name}</p>
                </div>
              ))} */}
            {/* {inputFields.map((inputField: any, index: any) => ( */}
              {/* <div key={index} className={styles.form_row}> */}
                <div className={styles.text_area_container}>
                  <label htmlFor='medication_name'>Medication name</label>
                  <Input
                    styles='input_primary'
                    onChange={handleOnChange}
                    value={inputFields.medication_name}
                    name='medication_name'
                    id='medication_name'
                    placeholder='Enter medication name'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='dosing_information'>Dosage information</label>
                  <textarea
                    onChange={handleOnChange}
                    value={inputFields.dosing_information}
                    name='dosing_information'
                    id='dosing_information'
                    placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='medication_strength'>Medical strength</label>
                  <Input
                    styles='input_primary'
                    onChange={handleOnChange}
                    value={inputFields.medication_strength}
                    name='medication_strength'
                    id='medication_strength'
                    placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                  />
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div className={styles.text_area_container}>
                    <label htmlFor='frequency'>Frequency</label>
                    <Input
                      styles='input_primary'
                      onChange={handleOnChange}
                      value={inputFields.frequency}
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
                      onChange={handleOnChange}
                      value={inputFields.route_of_administration}
                      name='route_of_administration'
                      id='route_of_administration'
                      placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                    />
                  </div>

                </div>

                
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div className={styles.text_area_container}>
                    <label htmlFor='duration_of_use'>Duration of use</label>
                    <div className={styles.duration_of_use} >
                      <Input
                        // type='number'
                        styles='input_primary'
                       
                        onChange={handleOnChange}
                        value={inputFields.duration_of_use}
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
                      onChange={handleOnChange}
                      value={inputFields.refill_information}
                      name='refill_information'
                      id='refill_information'
                      placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                    />
                  </div>
              </div>
            {/* // ))} */}

            <Button
              onClick={handleSave}
              disabled={
                [inputFields?.medication_name, inputFields?.medication_strength].some((x) => x === '') ||
                  isLoading 
                //   &&
                // tempInputFields.length < 1
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
