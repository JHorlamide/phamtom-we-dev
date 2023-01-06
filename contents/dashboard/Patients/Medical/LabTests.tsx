import { useState, useEffect, useRef } from 'react';
import { Button, Input } from '../../../../components/dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { setPatientLabTests } from '../../../../redux/actions/patients';
import { labService } from '../../../../services/restService';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import { MoonLoader } from 'react-spinners';
// import produce from 'immer';

const LabTests = ({
  medicalHistory,
  setSelectedRecord,
  styles,
  Image
}: any) => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { selectedPatient, labTests } = useSelector(
    (state: any) => state.patientsReducer
  );
  const [activeIndex, setActiveIndex]: any = useState(0);
  const dispatch = useDispatch();

  const Ref: any = useRef();

  const onButtonClick = () => {
    Ref.current.click();
  };
  // const [isFetching, setIsFetching] = useState(false);
  const [emptyState, setEmptyState]: any = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addHistory, setAddHistory] = useState(false);
  const [inputFields, setInputFields] = useState(
    {
      test_name: '',
      test_date: '',
      test_result: '',
      upload_doc: 'dsfdsf'
    }
  );

  // const [tempInputFields, setTempInputFields]: any = useState([]);

  // const newField = [
  //   {
  //     test_name: '',
  //     test_date: '',
  //     test_result: '',
  //     upload_doc: 'fdgfdg'
  //   }
  // ];

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
      const data = await labService.addLabTest(
        selectedPatient.patient_demographic.patient_recordId,
        inputFields,
        admin.access_token
      );
      getAllLabTests()
      setInputFields({
          test_name: '',
          test_date: '',
          test_result: '',
          upload_doc: ''
        }
      );
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
          data
        }
      } = await labService.getAllLabTest(
        selectedPatient.patient_demographic.patient_recordId,
        admin.access_token
      );
      if (typeof data !== 'string' && data?.length > 0) {
        dispatch(setPatientLabTests(data.reverse()));
        setEmptyState(null);
      } else {
        dispatch(setPatientLabTests([]));
        setEmptyState('No saved laboratory test yet');
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
            width={'18px'}
            height={'12px'}
            className='cursor-pointer'
            onClick={() => setSelectedRecord(null)}
          />
          <p>{medicalHistory?.label}</p>
        </div>

        <div className={styles.medical_history_}>
          {labTests?.length > 0 &&
            labTests?.map((item: any, index: any) => (
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
                      <p className={styles.detail_title}>TEST NAME</p>
                      <p className={styles.detail_statement}>
                        {item?.test_name}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>DATE OF TEST</p>
                      <p className={styles.detail_statement}>
                        {moment(item?.createdAt).format('Do MMMM YYYY')}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>TEST RESULT</p>
                      <p className={styles.detail_statement}>
                        {item?.test_result}
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
        <p>Add Lab record</p>
      </Button>

      <Modal
        id={styles.modal_container}
        centered
        show={addHistory}
        onHide={handleClose}
      >
        <div className={styles.label_container}>
          <p>Add Laboratory Record</p>

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
            {/* {inputFields.map((inputField: any, index: any) => (
              <div key={index} className={styles.form_row}> */}
                <div className={styles.text_area_container}>
                  <label htmlFor='test_name'>Test name</label>
                  <Input
                    styles='input_primary'
                    onChange={handleOnChange}
                    value={inputFields.test_name}
                    name='test_name'
                    id='test_name'
                    placeholder='Enter medication name'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='test_date'>Date of test</label>
                  <Input
                    styles='input_primary'
                    onChange={handleOnChange}
                    value={inputFields.test_date}
                    name='test_date'
                    id='test_date'
                    type='date'
                    placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                  />
                </div>

                <div className={styles.text_area_container}>
                  <label htmlFor='test_result'>Results</label>
                  <textarea
                    onChange={handleOnChange}
                    value={inputFields.test_result}
                    name='test_result'
                    id='test_result'
                    // placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                  />
                </div>

                <div
                  style={{ marginTop: '8px' }}
                  className={styles.text_area_container}
                >
                  <div className={styles.upload_doc}>
                    <input type='file' ref={Ref} style={{ display: 'none' }} />

                    <div onClick={onButtonClick}>
                      <Image
                        src={'/assets/dashboard/doc.svg'}
                        width={'16px'}
                        height={'20px'}
                      />
                      <p>Upload a document</p>
                    </div>
                  </div>
                </div>
              {/* </div>
            ))} */}

            {/* <div className={styles.add_another}>
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
            </div> */}

            <Button
              onClick={handleSave}
              disabled={
                [inputFields?.test_date && inputFields?.test_name && inputFields?.test_result ].some((x) => x === '' ||
                  isLoading) 
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

export default LabTests;
