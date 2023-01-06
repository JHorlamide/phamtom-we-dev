import { useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../../components/dashboard';

const Step3 = ({ styles, setCurrentStep, inputField, setInputField, handleAddPharmacy }: any) => {
  const Ref: any = useRef();
  const [uploaded, setUploaded] = useState(null);
  const [fileName, setFileName] = useState("");


  const onButtonClick = () => {
    Ref.current.click();
  };

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
            onChange={(e: any)=>{
              setUploaded(e.target.files[0]);
              setFileName(e.target.files[0].name); 
              setInputField({ ...inputField, valid_document: e.target.files[0] });
              console.log((e.target.files))
            } 
          }
            
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