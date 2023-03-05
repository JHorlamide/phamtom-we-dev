import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Button,
  // Checkbox,
  Input,
  DashboardLayout
} from '../../../components/dashboard';
import styles from '../../..//styles/dashboard/Payments.module.scss';
import { Modal } from 'react-bootstrap';
import { Tabs } from '../../../components/LandingPage';
import { BilledMonthly, BilledQuarterly, BilledYearly } from '../../../contents/pricing';
import { subscriptionService } from '../../../services/restService';
import { useDispatch, useSelector } from 'react-redux';
import { setSubscription } from '../../../redux/actions/payment';


const Payments = () => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { subscription } = useSelector((state: any) => state.paymentReducer);
  const dispatch = useDispatch();
 
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setEnterPin(false);
    setShow(false);
  };

  // const handleClose = (e: any) => {
  //   e.preventDefault();

  //   setEnterPin(false);
  //   setShow(false);
  // };

  // const handleShow = () => setShow(true);

  // const [viewCardDetails, setViewCardetails] = useState(false);
  const [enterPin, setEnterPin] = useState(false);
  const [activetab, setActivetab]: any = useState('Billed Monthly');

  const handleGetSubscriptionPlan = async () => {
    try {
      await subscriptionService.getSubscription(admin.access_token)
      .then((response) => response.data)
      .then((res)=> {
        if(res.status === "Success"){
          dispatch(setSubscription(res.data));
        }
      })
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubscriptionPlan = async (email: any, amount: any, subscriptionType: any,) => {

    let payload ={
      email,
      amount: amount === "Free" ? 0 : amount,
      subscriptionType
    }
    try {
      await subscriptionService.addSubscription(payload, admin.access_token)
      .then((response) => response.data)
      .then((res)=> {
        if(res.status === "Success"){
          window.location= res?.data?.checkOutUrl
        }
      })
      
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    handleGetSubscriptionPlan()
  }, []);

  // const handleOpenPayment = () => {
  //   const slider = document.getElementById('PAYMENTS_SLIDE') as HTMLElement;
  //   slider.classList.add('slide_right');
  // };

  // const handleClosePayment = () => {
  //   const slider = document.getElementById('PAYMENTS_SLIDE') as HTMLElement;
  //   slider.classList.remove('slide_right');
  // };

  // const handleViewCardDetails = () => {
  //   setViewCardetails(!viewCardDetails);
  // };

  // const allPlans = [
  //   {
  //     duration: 'Monthly',
  //     price: '$1.5 (NGN 10,000.00)'
  //   },
  //   {
  //     duration: 'Monthly',
  //     price: '$3.5 (NGN 10,000.00)'
  //   },
  //   {
  //     duration: 'Annually',
  //     price: '$12 (NGN 10,000.00)'
  //   }
  // ];

  // const benefits = [
  //   'Create unlimited patient records',
  //   'Download patient record',
  //   'Access to chat with your patient',
  //   'Add more staff members',
  //   'Up to 50 registerd patients'
  // ];

  const tabs = ['Billed Monthly', 'Billed Quarterly', 'Billed Yearly'];

  return (
    <DashboardLayout>
      <div className={styles.payment_container}>
        <div className={styles.left_items}>
          {/* <div className={styles.top_items} onClick={handleOpenPayment}>
            <h5>Payments</h5>
            <div>
              <Image
                src={'/assets/dashboard/ehr/arrow.svg'}
                width={'12.05px'}
                height={'15px'}
              />
            </div>
          </div> */}

          <div>
            <div className={styles.plan}>
              <p>Your current plan</p>
              <h6>Basic</h6>
              <p>Free</p>
            </div>
          </div>

          <div className='pricing_'>
            <main>
              <section style={{ marginBottom: '180px', position: "relative" }}>
                <Tabs
                  tabs={tabs}
                  activeTab={activetab}
                  setActivetab={setActivetab}
                />

                <div className='plans_conntainer' style={{padding: "0"}}>
                  {activetab === 'Billed Monthly' && (
                    <>
                      <BilledMonthly 
                        Image={Image} Button={Button} 
                        admin={admin} 
                        subscription={subscription} 
                        handleAddSubscriptionPlan={handleAddSubscriptionPlan} 
                      />
                    </>
                  )}
                  {activetab === 'Billed Quarterly' && (
                    <>
                      <BilledQuarterly 
                        Image={Image} 
                        Button={Button} 
                        admin={admin} 
                        subscription={subscription} 
                        handleAddSubscriptionPlan={handleAddSubscriptionPlan} 
                      />
                    </>
                  )}
                  {activetab === 'Billed Yearly' && (
                    <>
                      <BilledYearly 
                        Image={Image} 
                        Button={Button} 
                        admin={admin} 
                        subscription={subscription} 
                        handleAddSubscriptionPlan={handleAddSubscriptionPlan} 
                      />
                    </>
                  )}
                </div>
              </section>
            </main>
          </div>

          {/* <div className={styles.all_plans}>
            {allPlans.map((item, index) => (
              <div key={index} className={styles.plan_container}>
                <div>
                  <h6>{item.duration}</h6>
                  <p>{item.price}</p>
                </div>
                <div>
                  <button>Choose</button>
                </div>
              </div>
            ))}
          </div> */}

          {/* <div className={styles.benefit_container}>
            <h5>Benefits</h5>

            <div>
              {benefits.map((item, index) => (
                <div key={index} className={styles.benefits}>
                  <Image
                    src={'/assets/dashboard/correct.svg'}
                    width={'17.60px'}
                    height={'14.41px'}
                  />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>

        
        {/* <div className={styles.right_items}>
          <div id='PAYMENTS_SLIDE' className={styles.slider_container}>
            {!viewCardDetails
              // eslint-disable-next-line multiline-ternary
              ? (
              <div className={styles.items_container}>
                <div className={styles.top_items}>
                  <Image
                    src={'/assets/dashboard/close_btn.svg'}
                    width={'14px'}
                    height={'14px'}
                    layout='fixed'
                    onClick={handleClosePayment}
                    className='cursor-pointer'
                  />
                  <p>Payment</p>
                </div> */}
                {/* cards */}
                {/* <div onClick={handleViewCardDetails}>
                  <div onClick={handleViewCardDetails}>
                    <Image
                      src={'/assets/dashboard/card.svg'}
                      height={'164px'}
                      width={'330px'}
                      layout='responsive'
                      className='cursor-pointer'
                    />
                  </div>
                </div>

                <div className={styles.add_new_Card}>
                  <Button onClick={handleShow} className='btn_primary w-full'>
                    Add new card
                  </Button>
                </div>
              </div>
                ) : (
              <div className={styles.items_container}>
                <div className={styles.top_items}>
                  <Image
                    src={'/assets/dashboard/arrow_left.svg'}
                    width={'18px'}
                    height={'12px'}
                    layout='fixed'
                    onClick={handleViewCardDetails}
                    className='cursor-pointer'
                  />

                  <p>Card Details</p>
                </div> */}

                {/* cards */}
                {/* <div>
                  <Image
                    src={'/assets/dashboard/card.svg'}
                    height={'164px'}
                    width={'330px'}
                    layout='responsive'
                  />
                </div>

                <div className={styles.set_default}>
                  <p>Set card as default</p>

                  <Checkbox onChange={(e) => {}} />
                </div>

                <hr />

                <div>
                  <div className={styles.card_details}>
                    <div>
                      <p className={styles.title}>Bank: </p>
                      <p className={styles.value}>Firstbank PLC</p>
                    </div>

                    <hr />

                    <div>
                      <p className={styles.title}>Added on: </p>
                      <p className={styles.value}>Apr 23 2022</p>
                    </div>

                    <hr />

                    <div>
                      <p className={styles.title}>Days to Expiry: </p>
                      <p className={styles.value}>345days</p>
                    </div>

                    <hr />
                  </div>
                </div>

                <div className={styles.add_new_Card}>
                  <Button className={styles.delete_bank}>
                    {' '}
                    <p>Delete bank</p>{' '}
                    <Image
                      src={'/assets/dashboard/delete.svg'}
                      width='14px'
                      height={'18px'}
                    />
                  </Button>
                </div>
              </div>
                )}
          </div>
        </div> */}
      </div>

      <Modal id='primary_modal' show={show} onHide={handleClose} centered>
        <div className='label_container'>
          <p>Add new debit card</p>

          <Image
            src={'/assets/dashboard/close_btn_white.svg'}
            width={'14px'}
            height={'14px'}
            onClick={handleClose}
          />
        </div>

        <form>
          {!enterPin
            ? (
            <>
              <div>
                <label htmlFor='card_number'>Card number</label>
                <Input
                  id='card_number'
                  styles='input_primary'
                  placeholder={'0000 0000 0000 0000'}
                  type={'text'}
                  name='currentPassword'
                />
              </div>
              <div>
                <label htmlFor='expiry_date'>Expiry date</label>
                <Input
                  id='expiry_date'
                  styles='input_primary'
                  placeholder={'MM/YY'}
                  type={'text'}
                  name='currentPassword'
                />
              </div>
              <div>
                <label htmlFor='cvv'>CVV</label>
                <Input
                  id='cvv'
                  styles='input_primary'
                  placeholder={'123'}
                  type={'text'}
                  name='currentPassword'
                />
              </div>

              <div style={{ marginTop: '20px' }}>
                <p className='details_'>
                  Your card details are secured and processed by our PCI-DSS
                  complaint payment partners.
                </p>
              </div>

              <div style={{ marginTop: '20px' }}>
                <Button
                  onClick={() => setEnterPin(true)}
                  className='btn_primary w-full'
                >
                  Save card
                </Button>
              </div>
            </>
              )
            : (
            <>
              <div className={styles.enter_pin_details}>
                <h3>Enter PIN</h3>
                <p>Enter your card PIN to confirm you own the debit card</p>
              </div>
              <div className={styles.pin_input}>
                <Input
                  id='card_number'
                  styles='input_primary'
                  placeholder={'0'}
                  type={'number'}
                  max='9'
                  min='0'
                  maxLength={1}
                  name='currentPassword'
                />
                <Input
                  id='card_number'
                  styles='input_primary'
                  placeholder={'0'}
                  type={'number'}
                  max='9'
                  min='0'
                  maxLength={1}
                  name='currentPassword'
                />
                <Input
                  id='card_number'
                  styles='input_primary'
                  placeholder={'0'}
                  type={'number'}
                  max='9'
                  min='0'
                  maxLength={1}
                  name='currentPassword'
                />
                <Input
                  id='card_number'
                  styles='input_primary'
                  placeholder={'0'}
                  type={'number'}
                  max='9'
                  min='0'
                  maxLength={1}
                  name='currentPassword'
                />
              </div>

              <div style={{ marginTop: '20px' }}>
                <Button onClick={handleClose} className='btn_primary w-full'>
                  Continue
                </Button>
              </div>
            </>
              )}
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Payments;
