import { useState, useRef } from 'react';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';
import { Button, Input } from '../../../components/dashboard';
import { staffService } from '../../../services/restService';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import SelectInput from '../../../components/dashboard/SelectInput';
import { useDispatch } from 'react-redux';
import { setStaffs } from '../../../redux/actions/staffs';
// import Webcam from "react-webcam";

type IAddNewStaffProps = {
  showAddNewStaffModal: boolean;
  onHide: () => void;
  styles: any;
  admin: any;
  // handleGetAllStaffs: () => void;
};

const AddNewStaff = ({
  showAddNewStaffModal,
  onHide,
  styles,
  admin,
  // handleGetAllStaffs
}: IAddNewStaffProps) => {
  const inputFile: any = useRef(null);
  // const webcamRef: any = useRef(null);
  // const [imgSrc, setImgSrc] = useState(null);
  // const [showWebcam, setShowWebcam] = useState(false);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [inputField, setInputField] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    dob: '',
    role: ''
  });

  const onInputChange = (e: any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleAddStaff = async (e: any) => {
    e.preventDefault();

    try {
      await staffService.addStaff(
        inputField,
        admin.access_token
      )
      .then((response) => response.data)
      .then(res => {
        if(res.status === "Success"){
          toast.success(res.message)
          setTimeout(() => {
            push("/dashboard/staffs")
            location.reload();
          }, 500);
        }
      })
      handleGetAllStaffs();
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

   const handleGetAllStaffs = async () => {
    try {
      await staffService.getAllStaffs(admin.access_token)
      .then(response => response.data)
      .then((res) => {
        console.log(res)
        if(res.status === "Success"){
          dispatch(setStaffs(res.data.reverse()));
        }
      })
     
      
    } catch (error) {
      console.log(error);
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
  //   showAddNewStaffModal
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
        show={showAddNewStaffModal}
        onHide={onHide}
      >
        <div className={styles.label_container}>
          <p>Add new staff</p>

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
                  type={'date'}
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
                options={["DOCTOR", "PHARMACIST", "NURSE", "LAB_ATTENDANT", "OTHERS"]}
                selectChange={(item: any)=>handleSelectChange("role", item)}
              />
            </div>

            <Button
              disabled={[inputField.first_name, inputField.last_name, inputField.phone_number, 
                inputField.dob, inputField.role].some((x) => x === '')}
              className={'btn_primary'}
              style={{ marginTop: '16px' }}
              onClick={handleAddStaff}
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

export default AddNewStaff;
