import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../../components/dashboard';
import { fileUploadService } from '../../../../services/restService';
import { useSelector } from 'react-redux';

const Step3 = ({ styles, setCurrentStep, inputField, setInputField, handleAddPharmacy }: any) => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const Ref: any = useRef();
  const [uploaded, setUploaded] = useState(null);
  const [fileName, setFileName] = useState("");


  const onButtonClick = () => {
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
              valid_document: res?.data?._id
            })
            setFileName(e.target.files[0]?.name)
            setUploaded(fileValue)
            console.log(uploaded)
          }
        })
    }catch (error) {
      console.log(error);
    } 
    
  }

  return (
    <form >
      <div className={styles.setup_form_header}>
        <h4>Are you eligible to operate an online pharmacy in your country?</h4>
      </div>
      <label>If YES, upload suporting document</label>

      <div className={styles.form_input_container}>
        <div className={styles.upload_doc}>
          <input 
            type='file' 
            accept="application/pdf"
            ref={Ref} 
            style={{ display: 'none' }} 
            name='valid_document'
            // onChange={onInputChange}
            onChange={handleFileUpload} 
            
            // value={inputField?.valid_document}
          />

          <div onClick={onButtonClick}>
            <Image
              src={'/assets/dashboard/doc.svg'}
              width={'16px'}
              height={'20px'}
            />
            <p>{fileName ? fileName : 'Upload a document'}</p>
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.continue}>
          <Button
            onClick={() => setCurrentStep('Step2')}
            className='secondary'
          >
            Go back
          </Button>
        </div>
        <div className={styles.continue}>
          <Button
            onClick={handleAddPharmacy}
            className='btn_primary w-full'
          >
            Submit
          </Button>
        </div>
      </div>

    </form>
  );
};

export default Step3;