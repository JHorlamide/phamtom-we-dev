import { useState, useEffect } from 'react';
import { Button } from '../../../../components/dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { setPatientSoap } from '../../../../redux/actions/patients';
import { soapService } from '../../../../services/restService';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import { MoonLoader } from 'react-spinners';

const Soap = ({ medicalHistory, setSelectedRecord, styles, Image }: any) => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { selectedPatient, soap } = useSelector(
    (state: any) => state.patientsReducer
  );
  const [activeIndex, setActiveIndex]: any = useState(0);
  const dispatch = useDispatch();

  const [emptyState, setEmptyState]: any = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [addHistory, setAddHistory] = useState(false);
  const [inputFields, setInputFields] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: ''
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

    let payload = Object.keys(inputFields).filter(key => inputFields[key as keyof typeof inputFields])
      .reduce((acc: any, key) => {
        acc[key as keyof typeof acc] = inputFields[key as keyof typeof inputFields];
        return acc;
      }, {});

    try {
      await soapService.addSOAP(
        selectedPatient._id,
        payload,
        admin.access_token
      );
      setInputFields({
        subjective: '',
        objective: '',
        assessment: '',
        plan: ''
      });
      getAllSoap();
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      setIsAdding(false);
    }
  };

  useEffect(() => {
    getAllSoap();
  }, [selectedPatient]);
  const getAllSoap = async () => {
    setIsFetching(true);
    setEmptyState(null);
    try {
      const {
        data: {
          // eslint-disable-next-line camelcase
          data
        }
      } = await soapService.getAllSOAP(
        selectedPatient._id,
        admin.access_token
      );

      // eslint-disable-next-line camelcase
      if (data && typeof data !== 'string' && data?.length > 0) {
        // eslint-disable-next-line camelcase
        console.log(data)
        dispatch(setPatientSoap(data.reverse()));
      } else {
        dispatch(setPatientSoap([]));
        setEmptyState('No saved SOAP record yet');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
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
          {soap.length > 0 &&
            soap.map((item: any, index: any) => (
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
                  <p>{moment(item?.createdAt).format('Do MMM., YYYY')}</p>
                  <Image
                    src='/assets/dashboard/chevronRight.svg'
                    width={'18px'}
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
                      <p className={styles.detail_title}>SUBJECTIVE</p>
                      <p className={styles.detail_statement}>
                        {item?.subjective}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>

                    <div className={styles.detail}>
                      <p className={styles.detail_title}>OBJECTIVE</p>
                      <p className={styles.detail_statement}>
                        {item?.objective}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>
                    <div className={styles.detail}>
                      <p className={styles.detail_title}>ASSESSMENT</p>
                      <p className={styles.detail_statement}>
                        {item?.assessment}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>
                    <div className={styles.detail}>
                      <p className={styles.detail_title}>PLAN</p>
                      <p className={styles.detail_statement}>{item?.plan}</p>
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
        <p>Add SOAP</p>
      </Button>

      <Modal
        id={styles.modal_container}
        centered
        show={addHistory}
        onHide={handleClose}
      >
        <div className={styles.label_container}>
          <p>Add SOAP</p>

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
              <label htmlFor='Subjective'>Subjective</label>
              <textarea
                onChange={handleOnChange}
                value={inputFields.subjective}
                name='subjective'
                id='Subjective'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>

            <div className={styles.text_area_container}>
              <label htmlFor='Objective'>Objective</label>
              <textarea
                onChange={handleOnChange}
                value={inputFields.objective}
                name='objective'
                id='Objective'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>
            <div className={styles.text_area_container}>
              <label htmlFor='Assessment'>Assessment</label>
              <textarea
                onChange={handleOnChange}
                value={inputFields.assessment}
                name='assessment'
                id='Assessment'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>
            <div className={styles.text_area_container}>
              <label htmlFor='Plan'>Plan</label>
              <textarea
                onChange={handleOnChange}
                value={inputFields.plan}
                name='plan'
                id='Plan'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={
                [inputFields?.assessment || inputFields?.objective || 
                  inputFields?.plan || inputFields?.subjective].some((x) => x === '') || isAdding
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

export default Soap;
