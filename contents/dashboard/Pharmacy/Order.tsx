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
          <li 
            key={index} 
            className={styles.order}
          >
            <Image
              src={'/assets/dashboard/pharmacy/product.svg'}
              alt='product'
              width={'160px'}
              height='117px'
              layout='fixed'
            />
            <p className={styles.name}>{item?.order_items?.[0]?.product_name}</p>
            <p>QTY: {item?.order_items?.[0]?.product_qty}</p>
            <p className={styles.item_price}>NGN {item?.order_items?.[0]?.product_price}</p>

            {/* There are the available order status:  {
              PENDING: 'PENDING',
              ON_IT_WAY: 'ON IT WAY',
              COMPLETED: 'COMPLETED',
              CANCELLED: "CANCELLED"
            } */}
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
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
