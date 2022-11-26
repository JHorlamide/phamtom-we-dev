import React from 'react';

const BilledQuarterly = ({ Button, Image }: any) => {
  const monthlyPlan = [
    {
      name: 'Basic plan',
      price: <p className='price__'>Free</p>,
      benefits: ['Up to 100 patients'],
      button: <p className='current_plan'>Current plan</p>
    },
    {
      name: 'Bronze plan',
      price: (
        <p className='price__'>
          $4<span> /3mo</span>
        </p>
      ),
      onTop: '',
      benefits: ['Up to 200 patients', '2 staff accounts'],
      button: <Button className='btn_primary'>Buy Plan</Button>
    },
    {
      name: 'Silver plan',
      price: (
        <p className='price__'>
          $6.5<span> /3mo</span>
        </p>
      ),
      onTop: '',
      benefits: ['Up to 500 patients', '10 staff accounts'],
      button: <Button className='btn_primary'>Buy Plan</Button>
    },
    {
      name: 'Golden plan',
      price: (
        <p className='price__'>
          $14<span>/3mo</span>
        </p>
      ),
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
      price: (
        <p className='price__'>
          $80<span> /3mo</span>
        </p>
      ),
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
            <div>{plan.price}</div>

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

          <div className='buy_now'>{plan.button}</div>
        </li>
      ))}
    </ul>
  );
};

export default BilledQuarterly;
