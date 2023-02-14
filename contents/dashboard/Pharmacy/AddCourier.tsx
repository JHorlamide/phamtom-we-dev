
import { useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Input, UploadImage } from '../../../components/dashboard';
import { fileUploadService, shippingService } from '../../../services/restService';

const AddCourier = ({
  handleCloseAddCourier,
  showAddCourier,
  styles,
  Image,
  // onHide,
  handleGetAllLogistics
}: any) => {
  const Ref: any = useRef();
  const { admin } = useSelector((state: any) => state.adminReducer);
  const [imageUpload, setImageUpload] : any = useState('');
  const [inputField, setInputField] = useState({
    logistics_name: '',
    logistics_url: '',
    logistics_image: '',
  });

  const onInputChange = (e: any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleUpload = () => {
    Ref.current.click();
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
              logistics_image: res?.data?._id
            })
            setImageUpload(fileValue)
          }
        })
    }catch (error) {
      console.log(error);
    } 
  }

  const handleAddLogistics = async (e: any) => {
    e.preventDefault();

    try {
      await shippingService.addLogistics(
        inputField,
        admin.access_token
      )
      .then((response) => response.data)
      .then(res => {
        if(res.status === "Success"){
          toast.success(res.message)
        }
      })
      handleGetAllLogistics();
    } catch (error) {
      console.log(error);
    } finally {
      setInputField({
        logistics_name: '',
        logistics_url: '',
        logistics_image: '',
      });
      setImageUpload("")
      handleCloseAddCourier();
    }
  };

// console.log(inputField)
  return (
    <Modal
      id={styles.addCourier_container}
      show={showAddCourier}
      onHide={handleCloseAddCourier}
      centered
    >
      <div className={styles.label_container}>
        <p>Add new shipping service</p>

        <Image
          src={'/assets/dashboard/close_btn_white.svg'}
          width={'14px'}
          height={'14px'}
          onClick={handleCloseAddCourier}
        />
      </div>

      <div className={styles.form_container}>
        <UploadImage
          // imageUrl={imageUrl}
          imageUrl= { imageUpload !== "" ? URL.createObjectURL(imageUpload) : ""}
          handleUploadFile={handleUpload}
          inputEl={
            <input
              type='file'
              // onChange={getImgUrl}
              onChange={handleFileUpload}
              id='file'
              accept='image/*'
              ref={Ref}
            />
          }
        />

        <form>
          <div>
            <label htmlFor='logistics_name'>Logistics name</label>
            <Input
              type={'text'}
              styles='input_primary'
              placeholder='Jumia Logistics'
              id='Logistics'
              name="logistics_name"
              onChange={onInputChange}
            />
          </div>

          <div>
            <label htmlFor='logistics_url'>Logistics address</label>
            <Input
              type={'text'}
              styles='input_primary'
              placeholder='https://www.trackingurl.com/'
              id='Logistics'
              name="logistics_url"
              onChange={onInputChange}
            />
          </div>

          <Button
             disabled={[inputField?.logistics_image || inputField?.logistics_name || 
              inputField?.logistics_url].some((x) => x === '')}
            className={'btn_primary'}
            style={{ marginTop: '16px' }}
            onClick={handleAddLogistics}
          >
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddCourier;
