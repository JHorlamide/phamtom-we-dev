import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
// import PayStack from '../../services/paystack'
import { formatter } from '../../utils';
import { getMonthlySubscriptionType } from '../../utils/getSubscriptionType';

const BilledMonthly = ({ Button, Image, admin, subscription, handleAddSubscriptionPlan, handleCancelSubscriptionPlan }: any) => {

  const { pathname, push } = useRouter();

  const doAction = (email: any, amount: any, subscriptionType: any) => {
    if(pathname === "/pricing"){
      toast.error("Please login to subscribe.")
      push("/auth/login")
    }else{
      handleAddSubscriptionPlan(email, amount, subscriptionType)
    }
  } 

  const monthlyPlan = [
    {
      name: 'Basic plan',
      price: "Free",
      onTop: '',

      benefits: ['Up to 100 patients'],
      button: <p className='current_plan'>Current plan</p>
    },
    {
      name: 'Bronze plan',
      price: 750,
      onTop: '',
      benefits: ['Up to 200 patients', '2 staff accounts'],
      button: <Button className='btn_primary'>Buy Plan</Button>
    },
    {
      name: 'Silver plan',
      price: 1250,
      onTop: '',

      benefits: ['Up to 500 patients', '10 staff accounts'],
      button: <Button className='btn_primary'>Buy Plan</Button>
    },
    {
      name: 'Golden plan',
      price: 2500,
      onTop: '',

      benefits: [
        'Unlimited patients',
        'Unlimited staff accounts',
        'Advanced analytics',
        'Physician order entry',
        'Operations checklist',
        'Billing',
        'Outpatient management '
      ],
      button: <Button className='btn_primary'>Buy Plan</Button>
    },
    {
      name: 'Custom',
      onTop: <p className='on_top'>Golden plan features +</p>,
      price: 15000,
      benefits: [
        'Inpatient/Outpatient management ',
        'Scheduling',
        'Digital hospital',
        'Multiple branch management'
      ],

      button: <Button className='btn_primary'>Buy Plan</Button>
    }
  ];
  return (
    <ul>
      {monthlyPlan.map((plan: any, index: any) => (
        <li key={index}>
          <div className='title_price'>
            <h4>{plan.name}</h4>
            <div>
              {
                plan?.price === "Free" ? 
                <p className='price__'>Free </p>
                :
                <p className='price__'>{formatter(plan.price)} 
                  <span> /mo</span>
                </p>
              }
             
            </div>
            <hr />

            <div 
              className='benefits_container'>
              <div>{plan.onTop}</div>
              {plan.benefits.map((benefit: any, index: any) => (
                <div key={index} className='benefits_'>
                  <div>
                    <Image
                      src='/assets/home/checked.svg'
                      height={20}
                      width={20}
                      Layout='fixed'
                    />
                  </div>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            {
              getMonthlySubscriptionType(plan?.name) === subscription?.subscriptionDetails?.subscriptionType ? 
              (
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                  <p>Current plan</p>
                  {
                    ["BASIC", "FREE", "Free"].includes(subscription?.subscriptionDetails?.subscriptionType) ? 
                    null :
                    <button className='secondary' style={{padding:"7px", marginTop: "5px"}} onClick={handleCancelSubscriptionPlan}>cancel subscription</button>
                  }
                </div>
              
              ):
              getMonthlySubscriptionType(plan?.name) ===  "FREE"  ?  
              null :
              <button className='btn_primary' 
                onClick={() => doAction(admin?.email, plan?.price, getMonthlySubscriptionType(plan?.name))}
              >
                Buy Now
              </button>
            }
          </div>
        
        </li>
      ))}
    </ul>
  );
};

export default BilledMonthly;
