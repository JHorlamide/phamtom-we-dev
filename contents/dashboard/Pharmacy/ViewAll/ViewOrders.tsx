import { useState } from 'react';
import Image from 'next/image';
import { Button, Input } from '../../../../components/dashboard';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ViewOrders = ({ styles, setShowAddNewProductModal }: any) => {
  const [orderStatus, setOrderStatus] = useState('Pending');
  const { selectedOrder, orders } = useSelector((state: any) => state.pharmacyReducer);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [tempNumber, setTempNumber] = useState('');
  const [courier, setCourier] = useState('');
  const [chooseCourier, setChooseCourier] = useState(false);
  const [editTrackingNumber, setEditTrackingNumber] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleCloseModal = () => {
    setChooseCourier(false);
  };

  return (
    <>
      <div className={styles.items_container}>
        <div className={styles.left_items}>
          {/* orders */}
          <ul className={styles.all_orders_}>
            {
              orders?.map((item: any, index:any)=> (
                <li className={styles.selected_order} key={index}>
                  <div className={styles.order_img}>
                    <Image
                      src={'/assets/dashboard/pharmacy/product.svg'}
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
                    <button className={styles.pending}>
                      {item?.order_items?.[0]?.order_status === "PENDING" ? "pending" :  
                        item?.order_items?.[0]?.order_status === "APPROVED" ? "approved" :
                        ""
                      }
                    </button>
                  </div>
                </li>
              ))
            }
            
          </ul>
        </div>

        {/* order details */}
        <div className={styles.right_items}>
          {!complete && (
            <>
              {' '}
              <div className={styles.marked_status}>
                {selectedOrder?.order_status === "PENDING" && (
                  <p className={styles.pending}>
                    This order has been marked as pending
                  </p>
                )}

                {orderStatus === 'ON_IT_WAY' && (
                  <p className={styles.packaged}>
                    This order has been marked as packaged
                  </p>
                )}

                {orderStatus === 'Shipped' && (
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
                {courier && (
                  <>
                    <hr />

                    <div>
                      <h6>Courier service</h6>
                      <p className={styles.label}>{courier}</p>
                    </div>

                    <hr />
                    {/* status ===  */}
                    <div className={styles.tracking_number}>
                      {trackingNumber && !editTrackingNumber ? (
                        <>
                          <h6>Tracking number</h6>

                          <div className={styles.input_tracking}>
                            <p className={styles.label}>{trackingNumber}</p>

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
                                value={tempNumber}
                                onChange={(e) => setTempNumber(e.target.value)}
                              />
                            </div>
                            <Button
                              onClick={() => {
                                setTrackingNumber(tempNumber);
                                setEditTrackingNumber(false);
                              }}
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
                {orderStatus === 'Pending' && (
                  <>
                    <p>
                      * Make sure you have confirmed the before approving an
                      order
                    </p>
                    <div>
                      <Button
                        onClick={() => setOrderStatus('Packaged')}
                        className='btn_primary'
                      >
                        Approve order
                      </Button>
                    </div>
                  </>
                )}

                {orderStatus === 'Packaged' && !courier && (
                  <div>
                    <Button
                      onClick={() => setChooseCourier(true)}
                      className='btn_primary'
                    >
                      Choose a courier service
                    </Button>
                  </div>
                )}

                {trackingNumber && orderStatus !== 'Completed' && (
                  <div>
                    <Button
                      onClick={() => {
                        setOrderStatus('Completed');
                        setComplete(true);
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

          {complete && (
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
          <div className={styles.courier}>
            <input
              type='radio'
              name='courier'
              id='jumia'
              onChange={() => setCourier('Jumia')}
            />
            <label htmlFor='jumia'>Jumia</label>
          </div>
          <div className={styles.courier}>
            <input
              type='radio'
              name='courier'
              id='GIG Logistics'
              onChange={() => setCourier('GIG Logistics')}
            />
            <label htmlFor='GIG Logistics'>GIG Logistics</label>
          </div>
          <div className={styles.courier}>
            <input
              type='radio'
              name='courier'
              id='UPS'
              onChange={() => setCourier('UPS')}
            />
            <label htmlFor='UPS'>UPS</label>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewOrders;
