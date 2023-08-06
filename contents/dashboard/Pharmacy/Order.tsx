import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSelectedOrder, setPharmacyState } from '../../../redux/actions/pharmacy';

const MyOrders = ({ Orders, styles, Image }: any) => {
  const { push } = useRouter()
  const dispatch = useDispatch();

  return (
    <div>
      <ul className={styles.orders_container}>
        {Orders?.map((item: any, index: any) => (
          item?.order_items?.length > 0 ? 
            item?.order_items?.map((value: any, idx: any) => (
              <li 
                key={idx} 
                className={styles.order}
              >
                <Image
                  src={
                    value?.product_image?.imageUrl ?
                    value?.product_image?.imageUrl :
                     '/assets/dashboard/pharmacy/product.svg'
                    }
                  alt='product'
                  width={'160px'}
                  height='117px'
                  layout='fixed'
                />
                <p className={styles.name}>{item?.value?.product_name}</p>
                <p>QTY: {value?.product_qty}</p>
                <p className={styles.item_price}>NGN {value?.product_price}</p>

                <div className={styles.status}>
                  <p
                    className={
                      value?.order_status === 'PENDING' ? styles.pending : 
                      value?.order_status === 'APPROVED' ? styles.packaged :
                      value?.order_status === 'COMPLETED' ? styles.completed :
                      value?.order_status === 'CANCELLED' ? styles.cancelled : ""
                    }
                  >
                    {
                      value?.order_status === "PENDING" ? 'pending' : 
                      value?.order_status === "APPROVED" ? 'approved' : 
                      value?.order_status === "COMPLETED" ? 'completed' : 
                      value?.order_status === "CANCELLED" ? 'cancelled' : ""
                    }
                  </p>
                </div>

                <div className={styles.order_details}>
                  <button 
                    onClick= {()=>{ 
                      dispatch(setPharmacyState('ORDERS'))
                      dispatch(setSelectedOrder(value))
                      push('/dashboard/pharmacy/products')
                      }
                    }
                  >
                    Order details
                  </button>
                </div>
              </li>
            ) ) : (
          <li 
            key={index} 
            className={styles.order}
          >
            <Image
              src={
                item?.order_items?.[0]?.product_image?.imageUrl ? 
                item?.order_items?.[0]?.product_image?.imageUrl :
                '/assets/dashboard/pharmacy/product.svg'
              }
              alt='product'
              width={'160px'}
              height='117px'
              layout='fixed'
            />
            <p className={styles.name}>{item?.order_items?.[0]?.product_name}</p>
            <p>QTY: {item?.order_items?.[0]?.product_qty}</p>
            <p className={styles.item_price}>NGN {item?.order_items?.[0]?.product_price}</p>

            <div className={styles.status}>
              <p
                className={
                  item?.order_items?.[0]?.order_status === 'PENDING' ? styles.pending : 
                  item?.order_items?.[0]?.order_status === 'ON_IT_WAY' ? styles.onItsWay :
                  item?.order_items?.[0]?.order_status === 'COMPLETED' ? styles.success :
                  item?.order_items?.[0]?.order_status === 'CANCELLED' ? styles.cancelled : ""
                }
              >
                {
                  item?.order_items?.[0]?.order_status === "PENDING" ? 'pending' : 
                  item?.order_items?.[0]?.order_status === "ON_IT_WAY" ? 'on its way' : 
                  item?.order_items?.[0]?.order_status === "COMPLETED" ? 'completed' : 
                  item?.order_items?.[0]?.order_status === "CANCELLED" ? 'cancelled' : ""
                }
              </p>
            </div>

            <div className={styles.order_details}>
              <button 
                onClick= {()=>{ 
                  dispatch(setPharmacyState('ORDERS'))
                  dispatch(setSelectedOrder(item?.order_items?.[0]))
                  push('/dashboard/pharmacy/products')
                  }
                }
              >
                Order details
              </button>
            </div>
          </li>
        )))}
      </ul>
    </div>
  );
};

export default MyOrders;
