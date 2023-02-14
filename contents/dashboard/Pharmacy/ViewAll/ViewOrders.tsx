import { useState } from 'react';
import Image from 'next/image';
import { Button, Input } from '../../../../components/dashboard';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { orderService } from '../../../../services/restService';
import { toast } from 'react-toastify';
import { setOrders, setSelectedOrder } from '../../../../redux/actions/pharmacy';

const ViewOrders = ({ styles }: any) => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { selectedOrder, orders, logistics } = useSelector((state: any) => state.pharmacyReducer);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [courier, setCourier] = useState({
    logistics_name: "",
    logistics_url: ""
  });
  const [chooseCourier, setChooseCourier] = useState(false);
  const [editTrackingNumber, setEditTrackingNumber] = useState(false);
  const [activeIndex, setActiveIndex]: any = useState(0);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setChooseCourier(false);
    setCourier({
      logistics_name: "",
      logistics_url: ""
    })
  };


  const updateOrderStatus = async (status: string) => {
    let payload = {
      "orderStatus": status
    }
    try {
      await orderService.updateOrders(
        selectedOrder?._id,
        payload,
        admin.access_token
      )
      .then((response) => response.data)
      .then(res => {
        console.log(res)
        if(res.status === "Success"){
          toast.success(res.message)
          dispatch(setSelectedOrder(res?.data))
          getAllPendingOrders()
          setChooseCourier(false);
        }
      })
    } catch (error) {
      console.log(error);
    } 
  };

  const addCourierService = async () => {
    try {
      await orderService.addCourierService(
        selectedOrder?._id,
        courier,
        admin.access_token
      )
      .then((response) => response.data)
      .then(res => {
        console.log(res)
        if(res.status === "Success"){
          toast.success(res.message)
          dispatch(setSelectedOrder(res?.data))
          getAllPendingOrders()
          handleCloseModal()
        }
      })
    } catch (error) {
      console.log(error);
    } 
  };

  const addTrackingNumber = async (trackingNumber: string) => {

    let payload = {
      tracking_number: trackingNumber
    }
    try {
      await orderService.addTrackingNumber(
        selectedOrder?._id,
        payload,
        admin.access_token
      )
      .then((response) => response.data)
      .then(res => {
        console.log(res)
        if(res.status === "Success"){
          toast.success(res.message)
          dispatch(setSelectedOrder(res?.data))
          getAllPendingOrders()
        }
      })
    } catch (error) {
      console.log(error);
    } 
  };

  const getAllPendingOrders = async () => {
    try {
     await orderService.getAllPendingOrders(admin.access_token)
     .then((response)=> response.data)
     .then((res) => {
       if(res.status === "Success"){
        dispatch(setOrders(res.data.reverse()));
       }
     })
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={styles.items_container}>
        <div className={styles.left_items}>
          {/* orders */}
          <ul className={styles.all_orders_}>
            {
              orders?.map((item: any, index:any)=> (
                item?.order_items?.length > 0 ? 
                  item?.order_items?.map((value: any, idx: any) => (
                    <li 
                      className={activeIndex === value?._id  ? styles.selected_orderActive : styles.selected_order} 
                      key={idx}
                      onClick={() => {
                        setActiveIndex(value?._id )
                        // handleOpenMedicalInfo();
                        dispatch(setSelectedOrder(value));
                      }}
                    >
                      <div className={styles.order_img}>
                        <Image
                          src={
                            value?.product_image?.imageUrl ?
                            value?.product_image?.imageUrl :
                             '/assets/dashboard/pharmacy/product.svg'
                          }
                          alt='product'
                          width={'100px'}
                          height='80px'
                          layout='fixed'
                        />
    
                        <div>
                          <p className={styles.name}>{value?.product_name}</p>
                          <p className={styles.qty}>QTY: {value?.product_price}</p>
                          <p className={styles.item_price}>{value?.product_price}</p>
                        </div>
                      </div>
    
                      <div className={styles.order_status}>
                        <button 
                          className={ 
                              value?.order_status === "PENDING" ? styles.pending :
                              value?.order_status === "APPROVED" ? styles.approved :
                              value?.order_status === "COMPLETED" ? styles.completed :
                              ""
                            }
                        >
                          {value?.order_status === "PENDING" ? "pending" :  
                            value?.order_status === "APPROVED" ? "approved" :
                            value?.order_status === "COMPLETED" ? "completed" :
                            ""
                          }
                        </button>
                      </div>
                    </li>
                    ) ) : (
                <li 
                  className={activeIndex === item?.order_items?.[0]?._id ? styles.selected_orderActive : styles.selected_order} 
                  key={index}
                  onClick={() => {
                    setActiveIndex()
                    // handleOpenMedicalInfo();
                    dispatch(setSelectedOrder(item?.order_items?.[0]));
                  }}
                >
                  <div className={styles.order_img}>
                    <Image
                      src={ 
                        item?.order_items?.[0]?.product_image?.imageUrl ? 
                        item?.order_items?.[0]?.product_image?.imageUrl :
                        '/assets/dashboard/pharmacy/product.svg'
                      }
                      alt='product'
                      width={'100px'}
                      height='80px'
                      layout='fixed'
                    />

                    <div>
                      <p className={styles.name}>{item?.order_items?.[0]?.product_name}</p>
                      <p className={styles.qty}>QTY: {item?.order_items?.[0]?.product_price}</p>
                      <p className={styles.item_price}>{item?.order_items?.[0]?.product_price}</p>
                    </div>
                  </div>

                  <div className={styles.order_status}>
                    <button 
                      className={ 
                          item?.order_items?.[0]?.order_status === "PENDING" ? styles.pending :
                          item?.order_items?.[0]?.order_status === "APPROVED"  && 
                            !selectedOrder?.courier_service ? styles.approved :
                          item?.order_items?.[0]?.order_status === "COMPLETED" ? styles.completed :
                          ""
                        }
                    >
                      {item?.order_items?.[0]?.order_status === "PENDING" ? "pending" :  
                        item?.order_items?.[0]?.order_status === "APPROVED" &&
                        !selectedOrder?.courier_service ? "approved" :
                        item?.order_items?.[0]?.order_status === "COMPLETED" ? "completed" :
                        ""
                      }
                    </button>
                  </div>
                </li>
              )))
            }
            
          </ul>
        </div>

        {/* order details */}
        <div className={styles.right_items}>
          {selectedOrder?.order_status !== 'COMPLETED' && (
            <>
              {' '}
              <div className={styles.marked_status}>
                {selectedOrder?.order_status === "PENDING" && (
                  <p className={styles.pending}>
                    This order has been marked as pending
                  </p>
                )}

                {selectedOrder?.order_status === 'APPROVED' 
                  && !selectedOrder?.courier_service && (
                  <p className={styles.packaged}>
                    This order has been marked as packaged
                  </p>
                )}

                {selectedOrder?.courier_service && (
                  <p className={styles.shipped}>
                    This order has been marked as on it way
                  </p>
                )}
              </div>
              {/* details */}
              <div className={styles.details_container}>
                <h5>Buyer's info:</h5>
                <hr />

                  <div className={styles.detail}>
                    <p className={styles.label}>Name</p>
                    <p className={styles.value}>{selectedOrder?.buyer_info?.name}</p>
                  </div>
                  <div className={styles.detail}>
                    <p className={styles.label}>Phone</p>
                    <p className={styles.value}>{selectedOrder?.buyer_info?.phone_number}</p>
                  </div>
               
                <hr />

                <div className=''>
                  <h6>Delivery address:</h6>
                  <p className={styles.label}>
                    {selectedOrder?.buyer_info?.address}
                  </p>
                </div>
                <hr />
                <div>
                  <h6>Payment Method</h6>
                  <p className={styles.label}>Bank Transfer (PayStack)</p>
                </div>
                {selectedOrder?.courier_service && (
                  <>
                    <hr />

                    <div>
                      <h6>Courier service</h6>
                      <p className={styles.label}>{selectedOrder?.courier_service?.logistics_name}</p>
                    </div>

                    <hr />
                    {/* status ===  */}
                    <div className={styles.tracking_number}>
                      {selectedOrder?.tracking_number ? (
                        <>
                          <h6>Tracking number</h6>

                          <div className={styles.input_tracking}>
                            <p className={styles.label}>{selectedOrder?.tracking_number}</p>

                            <div
                              className={styles.edit_trackingNumber}
                              onClick={() => setEditTrackingNumber(true)}
                            >
                              <Image
                                src={'/assets/dashboard/edit.svg'}
                                width='15px'
                                height={'15px'}
                                layout={'fixed'}
                              />

                              <p>Edit</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h6>Tracking number</h6>

                          <div className={styles.input_tracking}>
                            <div className={styles.input}>
                              <Input
                                styles='input_primary'
                                placeholder='Input tracking number'
                                type={'text'}
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                              />
                            </div>
                            <Button
                              onClick={ ()=> addTrackingNumber(trackingNumber)
                                // setEditTrackingNumber(false);
                              }
                              className='btn_primary'
                            >
                              Submit
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
              {/* approve order */}
              <div className={styles.approve}>
                {selectedOrder?.order_status === 'PENDING' && (
                  <>
                    <p>
                      * Make sure you have confirmed the before approving an
                      order
                    </p>
                    <div>
                      <Button
                        onClick={() => updateOrderStatus('APPROVED')}
                        className='btn_primary'
                      >
                        Approve order
                      </Button>
                    </div>
                  </>
                )}

                {selectedOrder?.order_status === 'APPROVED' &&
                  !selectedOrder?.courier_service && (
                  <div>
                    <Button
                      onClick={() => setChooseCourier(true)}
                      className='btn_primary'
                    >
                      Choose a courier service
                    </Button>
                  </div>
                )}

                { selectedOrder?.tracking_number  && selectedOrder?.order_status !== "COMPLETED" && (
                  <div>
                    <Button
                      onClick={() => {
                        updateOrderStatus('COMPLETED');
                      }}
                      className='btn_primary'
                    >
                      Mark order as complete
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}

          {selectedOrder?.order_status === "COMPLETED" && (
            <div className={styles.completed}>
              <Image
                src={'/assets/dashboard/success.svg'}
                width='50.72px'
                height='53.33px'
                layout='fixed'
              />

              <div>
                <h4>Order completed</h4>
                <p>Order has been marked as completed</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        centered
        show={chooseCourier}
        onHide={handleCloseModal}
        id={styles.CHOOSE_COURIER}
      >
        <div className={styles.top_item}>
          <p>Choose shipping services</p>

          <Image
            src={'/assets/dashboard/close_btn.svg'}
            width={'14px'}
            height={'14px'}
            layout='fixed'
            onClick={handleCloseModal}
          />
        </div>

        <hr />

        <div className={styles.services}>
          {
            logistics?.map((item: any, index: any)=> (
              <div className={styles.courier} key={index}>
                <input
                  type='radio'
                  name='courier'
                  id='jumia'
                  onChange={() => setCourier({
                    logistics_name: item?.logistics_name,
                    logistics_url: item?.logistics_url
                  })}
                />
                <label htmlFor='jumia'>{item?.logistics_name}</label>
            </div>
            ))
          }
          <Button
              // disabled={courier === {}}
              disabled={[courier?.logistics_name, courier?.logistics_url].some((x) => x === "")}
              className={'btn_primary'}
              onClick={addCourierService}
            >
              Select
            </Button>
        </div>
      </Modal>
    </>
  );
};

export default ViewOrders;
