import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';
import { Button, Input } from '../../../components/dashboard';
import { patientsService } from '../../../services/restService';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import SelectInput from '../../../components/dashboard/SelectInput';
// import Webcam from "react-webcam";

type IEditStaffProps = {
  showEditStaffModal: boolean;
  onHide: () => void;
  styles: any;
  admin: any;
  handleGetAllPatients: () => void;
  selectedPatient: any
};

const EditStaff = ({
  showEditStaffModal,
  onHide,
  styles,
  admin,
  handleGetAllPatients,
  selectedPatient
}: IEditStaffProps) => {
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
    phone_number: '',
    dob: '',
    role: ''
  });

  useEffect(() => {
    setInputField({
      first_name: selectedPatient?.patient_demographic?.first_name ? selectedPatient?.patient_demographic?.first_name : '',
      last_name: selectedPatient?.patient_demographic?.last_name ? selectedPatient?.patient_demographic?.last_name : '',
      email: selectedPatient?.patient_demographic?.email ? selectedPatient?.patient_demographic?.email : '',
      phone_number: selectedPatient?.phone_number ? selectedPatient?.phone_number : '',
      role: selectedPatient?.patient_demographic?.role ? selectedPatient?.patient_demographic?.role : '',
      dob: selectedPatient?.patient_demographic?.dob ? selectedPatient?.patient_demographic?.dob : '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatient])
  

  const onInputChange = (e: any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleEditStaff = async (e: any) => {
    e.preventDefault();

    try {
      await patientsService.editPatient(
        inputField,
        selectedPatient._id,
        admin.access_token
      )
      // .then((response) => response.data)
      // .then(res => {
       
      // })
      handleGetAllPatients();
    } catch (error) {
      console.log(error);
    } finally {
      setInputField({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        dob: '',
        role: ''
      });
      onHide();
    }
  };

  const handleSelectChange = (name: any, value: any) => {
    setInputField({
        ...inputField,
        [name]: value
    })
  }


  // console.log(imgSrc)
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
console.log(selectedPatient)
  return (
    <div className={styles.modal_container}>
      <Modal
        id={styles.modal_container}
        centered
        show={showEditStaffModal}
        onHide={onHide}
      >
        <div className={styles.label_container}>
          <p>Edit staff</p>

          <Image
            src={'/assets/dashboard/close_btn_white.svg'}
            width={'14px'}
            height={'14px'}
            onClick={onHide}
          />
        </div>

        <div className={styles.form_container}>
          <h5>Staff Demographics</h5>

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
                value={inputField.first_name}
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
                value={inputField.last_name}
              />
            </div>

            <div>
              <label htmlFor='email_address'>Email address</label>
              <Input
                type={'email'}
                styles='input_primary'
                placeholder='thematthewola@gmail.com'
                id='email_address'
                name='email'
                onChange={onInputChange}
                value={inputField.email}
              />
            </div>

            <div>
                <label htmlFor='dob'>Date of birth</label>
                <Input
                  type={'number'}
                  styles='input_primary'
                  placeholder='54'
                  id='dob'
                  name='dob'
                  onChange={onInputChange}
                  value={inputField.dob}
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
                value={inputField.phone_number}
              />
            </div>

            <div>
              <label htmlFor='role'>Role</label>
              {/* <Input
                type={'text'}
                styles='input_primary'
                placeholder='Role'
                id='Role'
                name='role'
                onChange={onInputChange}
                value={inputField.role}
              /> */}
              <SelectInput
                placeholder="Role"
                options={["Doctor", "Pharmacist", "Nurse", "Lab attendant", "Others"]}
                selectChange={(item: any)=>handleSelectChange("role", item)}
              />
            </div>

            <Button
              disabled={[inputField.first_name, inputField.last_name, inputField.phone_number].some((x) => x === '')}
              className={'btn_primary'}
              style={{ marginTop: '16px' }}
              onClick={handleEditStaff}
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

export default EditStaff;
