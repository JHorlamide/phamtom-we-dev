import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import {subscriptionService} from "./restService"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
  
function PayStack({amount, subscriptionType, currentSubscription } ) {
  const { admin } = useSelector((state) => state.adminReducer);
  const config = {
    reference: (new Date()).getTime().toString(),
    email: `${admin?.email}`,
    amount: amount*100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY
  };

  const onSuccess = (reference) => {
    // let payload = JSON.stringify(reference);
    let payload = {
      email,
      subscription_type: subscriptionType
    }
    subscriptionService.addSubscription(payload)
      .then((response) => response.data)
      .then((res) => {
        if (res.success === true) {
            toast.success(`Payment successful!!!`);
            loadBalance();
        } else {
            toast.error("Payment was not confirmed, please try again!!!");
        }
      })
      .catch((err) => {
        if(err.response){
          toast.error(err.response.data.message);
        } else{
          toast.error("Your request can't be processed at this time, please try again later!");
        }
    });
  };

  const onClose = () => {
  }

  
  const initializePayment = usePaystackPayment(config);

  const sendInitialize = () => {
    initializePayment(onSuccess, onClose)
  }

  const PaystackHook = () => {
      return (
        <div>
          {
            currentSubscription === subscriptionType ? "Current plan" :
            <button className='btn_primary' 
              onClick={() => {
                sendInitialize()
              }}
            >
              Buy Now
            </button>
          }
            
        </div>
      );
  };

  return (
    <div>
      <PaystackHook />
    </div>
  );
}
  
export default PayStack;