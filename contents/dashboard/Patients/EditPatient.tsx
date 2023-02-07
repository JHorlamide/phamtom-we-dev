import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';
import { Button, Input } from '../../../components/dashboard';
import { patientsService } from '../../../services/restService';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
// import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSelectedPatient } from '../../../redux/actions/patients';
// import Webcam from "react-webcam";

type IEditPatientProps = {
  showEditPatientModal: boolean;
  onHide: () => void;
  styles: any;
  admin: any;
  handleGetAllPatients: () => void;
  selectedPatient: any
};

const EditPatient = ({
  showEditPatientModal,
  onHide,
  styles,
  admin,
  handleGetAllPatients,
  selectedPatient
}: IEditPatientProps) => {
  const inputFile: any = useRef(null);
  // const webcamRef: any = useRef(null);
  // const [imgSrc, setImgSrc] = useState(null);
  // const [showWebcam, setShowWebcam] = useState(false);
  // const { selectedPatient  } = useSelector(
  //   (state: any) => state.patientsReducer
  // );
  const dispatch = useDispatch();
  // const { push } = useRouter();
  const [inputField, setInputField] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: "",
    home_address: '',
    age: '',
    // genotype: '',
    weight_unit: '',
    height_unit: '',
    blood_group: '',
    occupation: ''
  });

  useEffect(() => {
    setInputField({
      first_name: selectedPatient?.patient_demographic?.first_name ? selectedPatient?.patient_demographic?.first_name : '',
      last_name: selectedPatient?.patient_demographic?.last_name ? selectedPatient?.patient_demographic?.last_name : '',
      email: selectedPatient?.patient_demographic?.email ? selectedPatient?.patient_demographic?.email : '',
      phone_number: selectedPatient?.phone_number ? selectedPatient?.phone_number : '',
      home_address: selectedPatient?.patient_demographic?.home_address ? selectedPatient?.patient_demographic?.home_address : '',
      age: selectedPatient?.patient_demographic?.age ? selectedPatient?.patient_demographic?.age : '',
      weight_unit: selectedPatient?.patient_demographic?.weight_unit ? selectedPatient?.patient_demographic?.weight_unit : '',
      height_unit: selectedPatient?.patient_demographic?.height_unit ? selectedPatient?.patient_demographic?.height_unit : '',
      blood_group: selectedPatient?.patient_demographic?.blood_group ? selectedPatient?.patient_demographic?.blood_group : '',
      occupation: selectedPatient?.patient_demographic?.occupation ? selectedPatient?.patient_demographic?.occupation : '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatient])
  

  const onInputChange = (e: any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleEditPatient = async (e: any) => {
    e.preventDefault();

    try {
      await patientsService.editPatient(
        inputField,
        selectedPatient.id,
        admin.access_token
      )
      .then((response) => response.data)
      .then(res => {
       if(res.status === "Success"){
         toast.success(res.message)
         dispatch(setSelectedPatient(res.data))
       }
      })
      handleGetAllPatients();
    } catch (error) {
      console.log(error);
    } finally {
      setInputField({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        home_address: '',
        age: '',
        // genotype: '',
        weight_unit: '',
        height_unit: '',
        blood_group: '',
        occupation: ''
      });
      onHide();
    }
  };

  // const capture = useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setImgSrc(imageSrc);
  //   setShowWebcam(false)
  //   showAddNewPatientModal
  // }, [webcamRef, setImgSrc]);

  // const videoConstraints = {
  //   width: 1280,
  //   height: 720,
  //   facingMode: "user"
  // };
  
  return (
    <div className={styles.modal_container}>
      <Modal
        id={styles.modal_container}
        centered
        show={showEditPatientModal}
        onHide={onHide}
      >
        <div className={styles.label_container}>
          <p>Edit patient</p>

          <Image
            src={'/assets/dashboard/close_btn_white.svg'}
            width={'14px'}
            height={'14px'}
            onClick={onHide}
          />
        </div>

        <div className={styles.form_container}>
          <h5>Patient Demographics</h5>

          <div className={styles.patient_profile}>
            <Image
              src={'/assets/dashboard/avatar.svg'}
              width={'64'}
              height={'64'}
            />

            <div>
              <input
                type='file'
                id='file'
                ref={inputFile}
                style={{ display: 'none' }}
              />
              <button onClick={onButtonClick} className={styles.browse_image}>
                {/* <p onClick={()=> {setShowWebcam(true); onHide()}} className={styles.take_pic}>Take a picture</p> */}
                <p className={styles.take_pic}>Take a picture</p>
                <p>or Browse from device</p>
              </button>
            </div>
          </div>

          <form>
            <div>
              <label htmlFor='firstname'>First name</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='Matthew'
                id='firstname'
                name='first_name'
                onChange={onInputChange}
                disabled
                defaultValue={ selectedPatient?.patient_demographic?.first_name ? selectedPatient?.patient_demographic?.first_name : inputField.first_name }
              />
            </div>

            <div>
              <label htmlFor='Lastname'>Last name</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='Olukoju'
                id='Lastname'
                name='last_name'
                onChange={onInputChange}
                disabled
                defaultValue={selectedPatient?.patient_demographic?.last_name ? selectedPatient?.patient_demographic?.last_name : inputField.last_name}
              />
            </div>

            <div>
              <label htmlFor='email_address'>Email address</label>
              <Input
                type={'email'}
                styles='input_primary'
                placeholder={'thematthewola@gmail.com'}
                id='email_address'
                name='email'
                onChange={onInputChange}
                defaultValue={selectedPatient?.patient_demographic?.email ? selectedPatient?.patient_demographic?.email : inputField.email}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor='email'>
                Phone number
              </label>
              <PhoneInput
                country={'ng'}
                containerClass='phone_input_container'
                placeholder='Phone number'
                onChange={(phone: any) => {
                  setInputField({ ...inputField, phone_number: phone });
                }}
                disabled
                value={selectedPatient?.phone_number ? selectedPatient?.phone_number :  inputField.phone_number}
              />
            </div>

            <div>
              <label htmlFor='Home'>Home address</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='5b Yeye Olofin street, Aldmiralty way Lekki'
                id='Home'
                name='home_address'
                onChange={onInputChange}
                defaultValue={selectedPatient?.patient_demographic?.home_address ? selectedPatient?.patient_demographic?.home_address : inputField.home_address}
              />
            </div>

            <div>
              <label htmlFor='Occupation'>Occupation</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='Doctor'
                id='Occupation'
                name='occupation'
                onChange={onInputChange}
                defaultValue={selectedPatient?.patient_demographic?.occupation ? selectedPatient?.patient_demographic?.occupation : inputField.occupation}
              />
            </div>

            <div className={styles.group}>
              <div>
                <label htmlFor='dob'>Age</label>
                <Input
                  type={'number'}
                  styles='input_primary'
                  placeholder='54'
                  id='dob'
                  name='age'
                  onChange={onInputChange}
                  defaultValue={selectedPatient?.patient_demographic?.age ? selectedPatient?.patient_demographic?.age : inputField.age}
                />
              </div>
              <div>
                <label htmlFor='blood_group'>Blood group</label>
                <Input
                  type={'text'}
                  styles='input_primary'
                  placeholder='O-'
                  id='blood_group'
                  name='blood_group'
                  onChange={onInputChange}
                  defaultValue={selectedPatient?.patient_demographic?.blood_group ? selectedPatient?.patient_demographic?.blood_group : inputField.blood_group}
                />
              </div>
            </div>

            <div className={styles.group}>
              <div>
                <label htmlFor='Height'>Height(ft)</label>
                <Input
                  type={'number'}
                  styles='input_primary'
                  placeholder='7.2'
                  id='Height'
                  name='height_unit'
                  onChange={onInputChange}
                  defaultValue={selectedPatient?.patient_demographic?.height_unit ? selectedPatient?.patient_demographic?.height_unit : inputField.height_unit}
                />
              </div>
              <div>
                <label htmlFor='Weight'>Weight(kg)</label>
                <Input
                  type={'number'}
                  styles='input_primary'
                  placeholder='129'
                  id='Weight'
                  name='weight_unit'
                  onChange={onInputChange}
                  defaultValue={selectedPatient?.patient_demographic?.weight_unit ? selectedPatient?.patient_demographic?.weight_unit : inputField.weight_unit }
                />
              </div>
            </div>

            <Button
              disabled={[inputField.first_name, inputField.last_name, inputField.phone_number].some((x) => x === '')}
              className={'btn_primary'}
              style={{ marginTop: '16px' }}
              onClick={handleEditPatient}
            >
              Save
            </Button>
          </form>
        </div>
      </Modal>
      

      {/* {
        showWebcam &&
        <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          height={720}
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>

      </>
      } */}
      
    </div>
  );
};

export default EditPatient;
