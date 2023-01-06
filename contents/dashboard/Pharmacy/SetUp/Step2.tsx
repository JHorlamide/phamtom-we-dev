import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Input, Button } from '../../../../components/dashboard';
import TypeSelect from '../../../../components/dashboard/Typeselect';
import { bankAccountChecker, getBanks } from '../../../../services/restService';

const Step2 = ({ styles, setCurrentStep, onInputChange, inputField, setInputField }: any) => {
  const [bank, setBank] = useState('');
  const [ngBanks, setNgBanks] = useState([]);

  useEffect(()=>{        
    getBanks()
    .then(resp=>{
        setNgBanks(resp.data);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const checkBank = (e: any) => {
  e.preventDefault()
  let bankCode: any = ngBanks.find((o: any) => o.name === bank);

  if(!inputField?.account_number){
    toast.error('Please enter account number')
  }
  if(!bank){
    toast.error("Please select bank")
  }
  if(inputField?.account_number && bankCode?.code){
    bankAccountChecker(inputField?.account_number, bankCode?.code)
    .then((response: any)=> {
      if(response.status === 200){
        setInputField({
          ...inputField,
          account_name: response.data.account_name,
          bank_code: bankCode?.code
        })
      }
      console.log(response);
    })
  }
  
}


  return (
    <form className={styles.padd}>
      <div className={styles.setup_form_header}>
        <h4>Set up your payment method</h4>
      </div>
      <label>How will you like to receive payment</label>

      <div className={styles.form_input_container}>
        <div>
          <label htmlFor='Bank'>Select bank</label>
          {/* <Input
            type={'text'}
            styles='input_primary'
            list='Bank'
            placeholder='Select / type your bank'
            id='Bank'
            // onChange={(e) => setBank(e.target.value)}
            name='bank_name'
            onChange={onInputChange}
            value={inputField?.bank_name}
          /> */}

           <TypeSelect 
              placeholder={inputField?.bank_name === "" ? "Select Bank" : inputField?.bank_name }
              options={ngBanks}
              arrayType={"countryObject"}
              filled={true}
              selectChange={
                (item: any)=> {
                  setBank(item);
                  setInputField({
                    ...inputField,
                    bank_name: item
                  })
                }
              }
            />

          {/* <datalist id='Bank'>
            {ngBanks?.map(
              (bank: IBank, index: number) => (
                <option key={index} value={bank?.name}>
                  {bank?.name}
                </option>
              )
            )}
          </datalist> */}
        </div>
        <div>
          <label htmlFor='Account number'>Account number</label>
          <Input
            type={'number'}
            styles='input_primary'
            placeholder='Account number'
            id='Account number'
            name='account_number'
            onChange={onInputChange}
            value={inputField?.account_number}
          />
        </div>
        {
          !inputField?.account_name ?
          <div className={styles.continue}>
            <Button
              onClick={checkBank}
              className='btn_primary w-full'
            >
              Confirm Bank
            </Button>
          </div>
          :
          <div>
            <label htmlFor='Account name'>Account name</label>
            <Input
              type={'text'}
              styles='input_primary'
              placeholder='Account name'
              id='Account name'
              name='account_name'
              onChange={onInputChange}
              value={inputField?.account_name}
            />
          </div>
        }
      </div>

      {
        inputField?.account_name &&
        <div className={styles.controls}>
          <div className={styles.continue}>
            <Button
              onClick={() => setCurrentStep('Step1')}
              className='secondary'
            >
              Go back
            </Button>
          </div>
          <div className={styles.continue}>
            <Button
              onClick={() => setCurrentStep('Step3')}
              className='btn_primary'
            >
              Continue
            </Button>
          </div>
        </div>
      }
      
    </form>
  );
};

export default Step2;
