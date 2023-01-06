import { useEffect, useState } from 'react';
import Image from 'next/image';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { useRouter } from 'next/router';
import { pharmacyService } from '../../../../services/restService';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setPharmacy } from '../../../../redux/actions/pharmacy';

const SetUpPharmacy = ({ styles }: any) => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { pharmacy } = useSelector((state: any) => state.pharmacyReducer);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState('Step1');
  const [inputField, setInputField] = useState({
    name_of_pharmacy: '',
    name_of_superintendent_pharmacy: '',
    pharmacy_email: '',
    pharmacy_physical_address: '',
    pharmacy_phone: '',
    account_name: '',
    account_number: '',
    bank_name: '',
    bank_code: '',
    valid_document: 'https://drive.google.com/file/d/1r2IRC5BZ_INBHvPzwk6P4NGXZscr9G60/view?usp=sharing'
  });
  const { push } = useRouter();
  const onInputChange = (e: any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

const handleAddPharmacy = async (e: any) => {
  e.preventDefault();

  try {
    await pharmacyService.setupPharmacy(
      inputField,
      admin.access_token
    )
    .then((response) => response.data)
    .then(res => {
      if(res.status === "Success"){
        toast.success(res.message)
        dispatch(setPharmacy(res.data.pharmacy));
        setCurrentStep("Step4")
      }
    })
   
  } catch (error) {
    console.log(error);
  } 
};

useEffect(() => {
  getPharmacy();
}, []);

useEffect(() => {
  if(pharmacy?.account_status === "PENDING"){
    setCurrentStep('Step4')
  }
  if(pharmacy?.account_status === "REJECTED"){
    setCurrentStep('Step1')
  }
}, []);
const getPharmacy = async () => {
  try {
    const {data : {data}} = await pharmacyService.getPharmacy(
      admin._id,
      admin.access_token
    );
    dispatch(setPharmacy(data));
  } catch (error) {
    console.log(error);
  }
};

// CORS issue
useEffect(() => {
  getPharmacy();
}, []);

  return (
    <>
      <div className={styles.setup_container}>
        <div className={styles.details}>
          <div style={{cursor:'pointer'}}>
            <Image
              onClick={()=>push('/dashboard/EHR')}
              src={'/assets/dashboard/arrow_left.svg'}
              height={'12px'}
              width={'18px'}
            />  
          </div>    

          <div className={styles.details_container}>
            <Image
              src={'/assets/dashboard/ehr/medic.svg'}
              height={'194px'}
              width={'144px'}
              layout='fixed'
            />

            <div>
              <h4>Setup your Online Pharmacy</h4>
            </div>

            <ol>
              <li>Sell your product to your patients/customers online</li>
              <li>Set your own price</li>
              <li>Deliver to them easily</li>
            </ol>
          </div>
        </div>

        <div className={styles.setup_form_container}>
          <div className={styles.form}>
            {currentStep === 'Step1' && (
              <Step1 
                styles={styles} 
                setCurrentStep={setCurrentStep} 
                onInputChange={onInputChange} 
                inputField={inputField}
                setInputField={setInputField} 
              />
            )}

            {currentStep === 'Step2' && (
              <Step2 
                styles={styles} 
                setCurrentStep={setCurrentStep} 
                onInputChange={onInputChange} 
                inputField={inputField}
                setInputField={setInputField} 
              />
            )}

            {currentStep === 'Step3' && (
              <Step3 
                styles={styles} 
                setCurrentStep={setCurrentStep} 
                onInputChange={onInputChange} 
                inputField={inputField}
                setInputField={setInputField} 
                handleAddPharmacy={handleAddPharmacy}
              />
            )}

            {currentStep === 'Step4' && (
              <Step4 
                styles={styles} 
                setCurrentStep={setCurrentStep} 
                onInputChange={onInputChange} 
                inputField={inputField}
                setInputField={setInputField} 
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetUpPharmacy;
