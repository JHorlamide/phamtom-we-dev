import { useState, useRef } from 'react';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';
import { Button, Input } from '../../../components/dashboard';
import { fileUploadService, patientsService } from '../../../services/restService';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
// import Webcam from "react-webcam";

type IAddNewPatientProps = {
  showAddNewPatientModal: boolean;
  onHide: () => void;
  styles: any;
  admin: any;
  handleGetAllPatients: () => void;
};

const AddNewPatient = ({
  showAddNewPatientModal,
  onHide,
  styles,
  admin,
  handleGetAllPatients
}: IAddNewPatientProps) => {
  const inputFile: any = useRef(null);
  // const webcamRef: any = useRef(null);
  // const [imgSrc, setImgSrc] = useState(null);
  // const [showWebcam, setShowWebcam] = useState(false);
  // const [imageId, setImageId] = useState('');
  const [imageUpload, setImageUpload] : any = useState('');
 
  const { push } = useRouter();
  const [inputField, setInputField] = useState({
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
    occupation: '',
    image: ''
  });
  console.log(inputField)
  const onInputChange = (e: any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleFileUpload = async(e: any) => {
    let value = new FormData();
    let fileValue = e.target.files[0]
    value.append('file', fileValue);
    
    try{
      await fileUploadService.fileUpload(
        value,
        admin.access_token
        )
        .then((response) => response.data)
        .then((res)=> {
          if(res.status === 'Success'){
            setInputField({
              ...inputField,
              image: res?.data?._id
            })
            setImageUpload(fileValue)
            // setImageId(res?.data?._id)
          }
        })
    }catch (error) {
      console.log(error);
    } 
    
  }

  const handleAddPatient = async (e: any) => {
    e.preventDefault();

    try {
      await patientsService.addPatient(
        inputField,
        admin.access_token
      )
      .then((response) => response.data)
      .then(res => {
        if(res.status === "Success"){
          toast.success(res.message)
          setTimeout(() => {
            push('/dashboard/patients');
            location.reload();
          }, 1000);
          
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
        occupation: '',
        image: ''
      });
      setImageUpload("")
      onHide();
    }
  };

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
console.log(imageUpload)
  return (
    <div className={styles.modal_container}>
      <Modal
        id={styles.modal_container}
        centered
        show={showAddNewPatientModal}
        onHide={onHide}
      >
        <div className={styles.label_container}>
          <p>Add new patient</p>

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
              src={ imageUpload !== ""
              ? URL.createObjectURL(imageUpload)
              : '/assets/dashboard/avatar.svg'}
              width={'64'}
              height={'64'}
              className={styles.patient_profile_image}
            />

            <div>
              <input
                type='file'
                id='image'
                ref={inputFile}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
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
              <label htmlFor='Home'>Home address</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='5b Yeye Olofin street, Aldmiralty way Lekki'
                id='Home'
                name='home_address'
                onChange={onInputChange}
                value={inputField.home_address}
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
                value={inputField.occupation}
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
                  value={inputField.age}
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
                  value={inputField.blood_group}
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
                  onChange={(e: any) => {
                    // let height: any = e.target.value + 'm';

                    setInputField({
                      ...inputField,
                      height_unit: e.target.value
                    });
                  }}
                  value={inputField.height_unit}
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
                  onChange={(e: any) => {
                    // let weight: any = e.target.value + 'lb';
                    setInputField({
                      ...inputField,
                      weight_unit: e.target.value
                    });
                  }}
                  value={inputField.weight_unit}
                />
              </div>
            </div>

            <Button
              disabled={[inputField.first_name, inputField.last_name, inputField.phone_number].some((x) => x === '')}
              className={'btn_primary'}
              style={{ marginTop: '16px' }}
              onClick={handleAddPatient}
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

export default AddNewPatient;
