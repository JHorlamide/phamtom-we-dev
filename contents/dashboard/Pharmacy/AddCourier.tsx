import { useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Input, UploadImage } from '../../../components/dashboard';

const AddCourier = ({
  handleCloseAddCourier,
  showAddCourier,
  styles,
  Image
}: any) => {
  const Ref: any = useRef();

  const [imageUrl, setImageUr] = useState('');

  const handleUpload = () => {
    Ref.current.click();
  };

  const getImgUrl = () => {
    const file: any = document.getElementById('file') as HTMLInputElement;
    const fileReader: any = new FileReader();
    fileReader.onloadend = () => {
      setImageUr(fileReader.result);
    };
    fileReader.readAsDataURL(file.files[0]);
 
  };

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
          imageUrl={imageUrl}
          handleUploadFile={handleUpload}
          inputEl={
            <input
              type='file'
              onChange={getImgUrl}
              id='file'
              accept='image/*'
              ref={Ref}
            />
          }
        />

        <form>
          <div>
            <label htmlFor='firstname'>Logistics name</label>
            <Input
              type={'text'}
              styles='input_primary'
              placeholder='Jumia Logistics'
              id='Logistics'
            />
          </div>

          <div>
            <label htmlFor='Lastname'>Logistics number</label>
            <Input
              type={'number'}
              styles='input_primary'
              placeholder='0801 - 000 - 0000'
              id='number'
            />
          </div>

          <Button
            disabled
            className={'btn_primary'}
            style={{ marginTop: '16px' }}
          >
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddCourier;
