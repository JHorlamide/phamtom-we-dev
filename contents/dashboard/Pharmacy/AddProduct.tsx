import { useState, useRef } from 'react';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';
import { Button, Input, UploadImage } from '../../../components/dashboard';

interface IAddNewPatientProps {
  showAddNewPatientModal: boolean;
  onHide: () => void;
  styles: any;
}
const AddNewProducts = ({
  showAddNewPatientModal,
  onHide,
  styles
}: IAddNewPatientProps) => {
  const inputFile: any = useRef(null);
  const [imageUrl, setImageUrl] = useState('');

  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <div className={styles.modal_container}>
      <Modal
        id={styles.modal_container}
        centered
        show={showAddNewPatientModal}
        onHide={onHide}
      >
        <div className={styles.label_container}>
          <p>Add new product</p>

          <Image
            src={'/assets/dashboard/close_btn_white.svg'}
            width={'14px'}
            height={'14px'}
            onClick={onHide}
          />
        </div>

        <div className={styles.form_container}>
          <div className={styles.img_container}>
            <UploadImage
              objectFit={'contain'}
              imageUrl={imageUrl}
              handleUploadFile={onButtonClick}
              height='200px'
              inputEl={
                <input
                  type='file'
                  onChange={(e: any) => {
                    const file: any = e.target.files[0];
                    const fileReader: any = new FileReader();
                    fileReader.onloadend = () => {
                      setImageUrl(fileReader.result);
                    };
                    fileReader.readAsDataURL(file);
                  }}
                  ref={inputFile}
                />
              }
            />
          </div>

          <form>
            <div>
              <label htmlFor='firstname'>Product name</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='Paracetamol'
                id='Productname'
              />
            </div>

            <div>
              <label htmlFor='Lastname'>Product price</label>
              <Input
                type={'number'}
                min={0}
                styles='input_primary'
                placeholder='20,000.00'
                id='price'
              />
            </div>

            <div>
              <label htmlFor='email_address'>Product strength</label>
              <Input
                type={'email'}
                styles='input_primary'
                placeholder='50mg'
                id='strength'
              />
            </div>

            <div>
              <label htmlFor='Home'>Quantity</label>
              <Input
                type={'number'}
                min={0}
                styles='input_primary'
                placeholder='36'
                id='Quantity'
              />
            </div>

            <div>
              <label htmlFor='Occupation'>Occupation</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='Doctor'
                id='Occupation'
              />
            </div>

            <div className={styles.checkbox_container}>
              <input type={'checkbox'} name='Prescription' id='Prescription' />
              <label htmlFor='Prescription'>Prescription required</label>
            </div>

            <div className={styles.text_area_container}>
              <label htmlFor='Occupation'>About</label>
              <textarea
                name=''
                id=''
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>

            <div className={styles.text_area_container}>
              <label htmlFor='Occupation'>Usage direction</label>
              <textarea
                name=''
                id=''
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>
            <div className={styles.text_area_container}>
              <label htmlFor='Occupation'>Precaution</label>
              <textarea
                name=''
                id=''
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>
            <div className={styles.text_area_container}>
              <label htmlFor='Occupation'>Possible side effect</label>
              <textarea
                name=''
                id=''
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
              />
            </div>

            <Button
              disabled
              className={'btn_primary'}
              style={{ marginTop: '16px' }}
            >
              Save Product
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddNewProducts;
