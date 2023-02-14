import React from 'react';
import PayStack from '../../services/paystack';
import { formatter } from '../../utils';

const BilledYearly = ({ Button, Image, admin }: any) => {
  const monthlyPlan = [
    {
      name: 'Basic plan',
      price: "Free",
      benefits: ['Up to 100 patients'],
      onTop: '',

      button: <p className='current_plan'>Current plan</p>
    },
    {
      name: 'Bronze plan',
      price: 6250,
      benefits: ['Up to 200 patients', '2 staff accounts'],
      onTop: '',

      button: <Button className='btn_primary'>Buy Plan</Button>
    },
    {
      name: 'Silver plan',
      price: 12500,
      benefits: ['Up to 500 patients', '10 staff accounts'],
      onTop: '',

      button: <Button className='btn_primary'>Buy Plan</Button>
    },
    {
      name: 'Golden plan',
      price: 25000,
      benefits: [
        'Unlimited patients',
        'Unlimited staff accounts',
        'Advanced analytics',
        'Physician order entry',
        'Operations checklist',
        'Billing',
        'Outpatient management '
      ],
      onTop: '',

      button: <Button className='btn_primary'>Buy Plan</Button>
    },
    {
      name: 'Custom',
      price: 150000,
      benefits: [
        'Inpatient/Outpatient management ',
        'Scheduling',
        'Digital hospital',
        'Multiple branch management'
      ],
      onTop: <p className='on_top'>Golden plan features +</p>,

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
                  <span> /yr</span>
                </p>
              }
            </div>
            <hr />

            <div className='benefits_container'>
              <div>{plan.onTop}</div>
              {plan.benefits.map((benefit: any, index: any) => (
                <div key={index} className='benefits_'>
                  <div>
                    <Image
                      src='/assets/home/checked.svg'
                      height={20}
                      width={20}
                    />
                  </div>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <PayStack 
            amount={plan?.price === "Free" ? 0 : plan?.price} 
            subscriptionType={
              plan?.name === "Basic plan" ? "BASIC" :
              plan?.name === "Bronze plan" ? "BRONZE_QUARTERLY_PLAN" :
              plan?.name === "Silver plan" ? "SILVER_QUARTERLY_PLAN" :
              plan?.name === "Golden plan" ? "GOLDEN_QUARTERLY_PLAN" :
              plan?.name === "Custom" ? "CUSTOM_QUARTERLY_PLAN" :
              null
            } 
            currentSubscription={admin?.subscription_permission_flag === ("1" || "FREE") ? "BASIC" : admin?.subscription_permission_flag}
          />
        </li>
      ))}
    </ul>
  );
};

export default BilledYearly;
